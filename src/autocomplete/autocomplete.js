//

import {
	isUndefined,
	isElement,
	map,
	delay,
	orderBy,
	clone,
	compact,
	isFinite,
	merge,
	isEmpty,
	uniqWith,
	includes,
	trim,
} from 'lodash'
import axios from 'axios'





module.exports = {

	transitions: {
		'flip-header': {
			enterClass: 'flipInX',
			leaveClass: 'animateNone',
		},
		'item-zoom': {
			enterClass: 'zoomIn',
			leaveClass: 'zoomOut',
		},
		'item-stagger': {
			enterClass: 'slideInDown',
			leaveClass: 'slideOutUp',
		},
		'fade-clear': {
			enterClass: 'fadeInLeft',
			leaveClass: 'fadeOutLeft',
		},
		'bounce-isEmpty': {
			enterClass: 'bounceIn',
			leaveClass: 'bounceOut',
		},
	},

	directives: {
		'autocomplete-item': {
			params: [ 'focusindex' ],
			bind: function () {
				let index = parseInt( this.params.focusindex )
				this.index = index
				this.el.index = index
			},
			update: function ( newv, oldv ) {
				if ( newv == this.index ) {
					this.el.focus()
				} else if ( oldv == this.index ) {
					this.el.blur()
				}
			},
			unbind: function () {
				this.el.index = null
			},
		},
	},

	data: function () {
		return {
			input: '',
			results: [],
			focused: 0,
			isEmpty: false,
			progging: {
				'autocomplete-progging': false,
				'autocomplete-success': false,
				'autocomplete-error': false,
			},
			item: {},
			viewing: false,
		}
	},

	computed: {
		'showResults': function () {
			return this.results.length != 0 && !this.viewing
		},
	},

	watch: {
		'input': function ( v, ov ) {
			if ( isEmpty( this.input ) ) {
				return this.clearResults()
			}
			this.getResults()
		},
	},

	ready: function () {
		console.warn( 'AUTOCOMPLETE READY' )
		document.getElementById( 'autocomplete' ).focus()
		delay( this.getResults, 500 ) // let the component change transition finish first
	},

	methods: {

		stopScroll: function ( evt ) {
			let keys = [ 9, 33, 34, 35, 36, 37, 38, 39, 40, 8, 27 ] // esc, backspace, tab, page, and arrow keys
			let key = evt.which
			if ( includes( keys, key ) ) {
				evt.preventDefault()

				let delta = 0
				if ( key == 9 ) {
					delta = ( evt.shiftKey ) ? -1 : 1
				} else if ( key == 38 ) {
					delta--
				} else if ( key == 40 ) {
					delta++
				}

				if ( delta != 0 ) {
					if ( this.focused == 0 && delta == -1 ) {
						document.getElementById( 'autocomplete' ).focus()
					}

					this.focused = Math.min( this.focused + delta, this.results.length - 1 ) // so you cant tab out of the box
				}

				if ( includes( [ 8, 27 ], key ) ) { // backspace/esc should skip back to input?? idk, it feels natural
					document.getElementById( 'autocomplete' ).focus()
				}

				return false

			} else if ( key == 13 ) { // enter key
				this.openItem()
			}

		},

		inputFocused: function () {
			this.viewing = false
			this.item = {}
		},

		inputKeydown: function ( evt ) {
			let key = evt.which
			if ( key == 8 ) { // backspace
				if ( isEmpty( this.results ) ) {
					this.isEmpty = false
				}
			} else if ( key == 40 ) { // down key
				let pos = evt.target.selectionStart
				if ( pos == this.input.length && !isEmpty( this.results ) ) {
					document.getElementsByClassName( 'autocomplete-item' )[ 0 ].focus()
					evt.preventDefault()
					return false
				}
			}
		},

		itemKeydown: function ( evt ) {
			let key = evt.which
			if ( includes( [ 27, 38, 8, 40, 13, 9 ], key ) ) { // esc, up, down, backspace, enter, tab
				this.clearItem()
				evt.preventDefault()
				return false
			}
		},

		clearInput: function () {
			this.results = []
			this.input = ''
			this.viewing = false
			this.item = {}
			this.$nextTick( function () {
				document.getElementById( 'autocomplete' ).focus()
			} )
		},

		clearItem: function () {
			this.viewing = false
			this.item = {}
			this.$nextTick( function () {
				let els = document.getElementsByClassName( 'autocomplete-item' )
				if ( isElement( els[ this.focused ] ) ) {
					els[ this.focused ].focus()
				} else {
					els[ 0 ].focus()
				}
			} )
		},

		openItem: function ( evt ) {
			let index = ( isUndefined( evt ) ) ? this.focused : evt.currentTarget.index
			let item = this.results[ index ]
			this.item = item
			this.input = item.name
			this.viewing = true
			this.$nextTick( function () { // allow the DOM to update because 'autocomplete_item' is not in the DOM due to results being shown
				document.getElementById( 'autocomplete_item' ).focus()
			} )
		},

		clearResults: function () {
			console.info( 'clearResults >' )
			this.results = []
			this.isEmpty = false
		},

		getResults: function () {
			if ( isEmpty( this.input ) ) {
				return this.clearResults()
			}

			this.setProg( 'start' )

			console.info( 'getResults >' )

			let input = trim( this.input.toLowerCase() )

			axios.get( 'https://api.pokemontcg.io/v1/cards', {
				params: {
					name: input,
					series: 'base|neo|EX',
				}
			} ).then( ( response ) => {

				let results = map( response.data.cards, function ( v, i ) {
					if ( isFinite( v.nationalPokedexNumber ) ) {
						v.highlightedname = v.name.replace( new RegExp( input, 'gi' ), '<span class="autocomplete-highlight">$&</span>' )
						return v
					}
				} )

				this.results = orderBy( compact( results ), 'name' )
				this.isEmpty = isEmpty( this.results )
				delay( this.setProg, 500, 'success' )

			} ).catch( ( err ) => {
				console.error( err )
				this.setProg( 'error' )
			} )

		},

		setProg: function ( action ) {
			let set = {
				'autocomplete-progging': false,
				'autocomplete-success': false,
				'autocomplete-error': false,
			}

			clearTimeout( this.timeout )
			this.timeout = delay( function ( progging, reset ) {
				if ( progging[ 'autocomplete-progging' ] == false ) {
					merge( progging, reset )
				}
			}, 1000, this.progging, clone( set ) )

			if ( action == 'start' ) {
				set[ 'autocomplete-progging' ] = true
			} else if ( action == 'success' ) {
				set[ 'autocomplete-success' ] = true
			} else if ( action == 'error' ) {
				set[ 'autocomplete-error' ] = true
			}

			merge( this.progging, set )

		},

		startVideo: function () {
			console.info( 'startVideo >' )

			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia
			if ( navigator.getUserMedia ) {

				let video = document.getElementById( 'video' )
				let card = document.getElementById( 'card' )
				let rect = card.getBoundingClientRect()

				video.style.top = ( rect.top + 35 ).toString() + 'px'
				video.style.left = ( rect.left + 15 ).toString() + 'px'
				video.style.display = 'initial'

				navigator.getUserMedia( {
					video: true
				}, function ( stream ) {
					video.src = window.URL.createObjectURL( stream )
				}, function ( err ) {
					console.error( err )
					alert( 'Webcam ERROR!\n\n' + JSON.stringify( err, true, 4 ) )
				} )

			} else {
				document.getElementById( 'stream' ).style.display = 'none'
				alert( 'Unavilable Webcam Support.\n\nUSE CHROME!!!' )
			}

		},

	},

}


















//

