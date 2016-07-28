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



/*==================================
=            0000000000            =
==================================*/
/**
 *
 * i sorta have line spacing OCD, sorry...
 *
 */
/*==================================
=            0000000000            =
==================================*/



export default {

	/**
	 *
	 * transition classes to be used on elements when they're hidden and shown
	 *
	 * uses Animate.css classes for simplicity
	 *
	 */
	transitions: {
		'flip-header': {
			enterClass: 'flipInX',
			leaveClass: 'animateNone',
		},
		'item-zoom': {
			enterClass: 'zoomIn',
			leaveClass: 'zoomOut',
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

	/**
	 *
	 * we use this directive to decide whether to focus or blur the
	 * resulting element in the dropdown results
	 *
	 * update() is called whenever this.focused gets changed
	 *
	 * we set this.focused to whichever index in the array of resulting items
	 * is currently selected
	 *
	 */
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

	/**
	 *
	 * data contains all of our reactive variables
	 *
	 * changing the value of these variables results in the
	 * modification of DOM elements in the templete weve provided
	 *
	 */
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
			videoing: false,
		}
	},

	/**
	 *
	 * computed properties are a convenient way to
	 * produce dynamic reactive variables
	 *
	 */
	computed: {
		'showResults': function () {
			return this.results.length != 0 && !this.viewing
		},
		'getFaceToggle': function () {
			return ( this.videoing ) ? 'Remove' : 'Insert'
		},
	},

	/**
	 *
	 * these variables are from our data object above
	 * and execute on any modification
	 *
	 */
	watch: {
		'input': function ( v, ov ) {
			if ( isEmpty( this.input ) ) {
				return this.clearResults()
			}
			this.getResults() // as the input binded to the <input> el changes, getResults is called
		},
	},

	ready: function () {
		console.warn( 'AUTOCOMPLETE READY' )
		document.getElementById( 'autocomplete' ).focus()
		delay( this.getResults, 500 ) // let the component change transition finish first
	},

	methods: {

		stopScroll: function ( evt ) { // gets called whenever a key is pressed and a result item is focused
			let keys = [ 9, 33, 34, 35, 36, 37, 38, 39, 40, 8, 27 ] // esc, backspace, tab, page, and arrow keys
			let key = evt.which
			if ( includes( keys, key ) ) {
				evt.preventDefault()

				/**
				 *
				 * here we are deciding in which direction the index shall be moved
				 *
				 */
				let delta = 0
				if ( key == 9 ) {
					delta = ( evt.shiftKey ) ? -1 : 1
				} else if ( key == 38 ) {
					delta--
				} else if ( key == 40 ) {
					delta++
				}

				if ( delta != 0 ) {
					if ( this.focused == 0 && delta == -1 ) { // if weve hit the beginning, focus the <input> el
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

		/*=================================
		=            THIS.ITEM            =
		=================================*/
		/**
		 *
		 * this.item containes the pokemon card from results in which to display when
		 * the user presses enter or clicks on it
		 *
		 */

		inputFocused: function () {
			this.stopVideo()
			this.viewing = false
			this.item = {} // clear the item; since its reactive in the data obj from above, itll trigger hiding the item <div>
		},

		inputKeydown: function ( evt ) { // gets called when a key is pressed with the <input> focused
			let key = evt.which
			if ( key == 8 ) { // backspace
				if ( isEmpty( this.results ) ) {
					this.isEmpty = false
				}
			} else if ( key == 40 ) { // down key
				let pos = evt.target.selectionStart
				if ( pos == this.input.length && !isEmpty( this.results ) ) {

					/**
					 *
					 * if cursor is at the end, focus the first available result
					 *
					 */
					let els = document.getElementsByClassName( 'autocomplete-item' )
					if ( isElement( els[ 0 ] ) ) {
						els[ 0 ].focus()
					}
					evt.preventDefault()
					return false
				}
			}
		},

		itemKeydown: function ( evt ) {

			/**
			 *
			 * when the chosen pokemon card item is focused and a key is pressed
			 *
			 */
			let key = evt.which
			if ( includes( [ 27, 38, 8, 40, 13, 9 ], key ) ) { // esc, up, down, backspace, enter, tab
				this.clearItem()
				evt.preventDefault()
				return false
			}
		},

		clearInput: function () {
			this.stopVideo()
			this.results = []
			this.input = ''
			this.viewing = false
			this.item = {}
			this.$nextTick( function () { // allow the DOM to update because 'autocomplete' is not in the DOM due to results being shown
				document.getElementById( 'autocomplete' ).focus()
			} )
		},

		clearItem: function () {
			this.stopVideo()
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
			this.results = []
			this.isEmpty = false
		},

		getResults: function () {
			if ( isEmpty( this.input ) ) {
				return this.clearResults()
			}

			this.setProg( 'start' )
			let input = trim( this.input.toLowerCase() )

			axios.get( 'https://api.pokemontcg.io/v1/cards', {
				params: {
					name: input,
					series: 'base|neo|EX', // we only want that good stuff
				}
			} ).then( ( response ) => {

				let results = map( response.data.cards, function ( v, i ) {
					if ( isFinite( v.nationalPokedexNumber ) ) {

						/**
						 *
						 * this is where I highlight the result names from <input>
						 *
						 */
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
			let set = { // the classes in main.css being used with @keyframes
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

		stopVideo: function () {
			if ( this.stream ) {
				let video = document.getElementById( 'video' )
				video.pause()
				video.src = ''
				this.stream.getTracks()[ 0 ].stop()
				video.style.display = 'none'
				this.stream = null
				this.videoing = false
			}
		},

		startVideo: function () {

			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia
			if ( navigator.getUserMedia ) {

				if ( this.stream ) {
					return this.stopVideo()
				}

				let video = document.getElementById( 'video' )
				let card = document.getElementById( 'card' )
				let rect = card.getBoundingClientRect()
				let w = card.offsetWidth
				let h = card.offsetHeight

				video.style.top = ( rect.top + ( h * 0.11 ) ).toString() + 'px'
				video.style.left = ( rect.left + ( w * 0.09 ) ).toString() + 'px'
				video.style[ 'max-width' ] = ( w - ( w * 0.18 ) ).toString() + 'px'
				video.style.display = 'initial'

				navigator.getUserMedia( {
					video: true
				}, ( stream ) => {
					this.stream = stream
					video.src = window.URL.createObjectURL( stream )
					this.videoing = true
				}, ( err ) => {
					console.error( err )
					this.stopVideo()
					this.videoing = false
					alert( 'Webcam ERROR!\n\n' + JSON.stringify( err, true, 4 ) )
				} )

			} else {
				document.getElementById( 'stream' ).style.display = 'none'
				this.videoing = false
				alert( 'Unavilable Webcam Support.\n\nUSE CHROME!!!' )
			}

		},

	},

}


















//

