//

import {
	isUndefined,
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
import {
	store_setItem,
} from '../store'




module.exports = {

	transitions: {
		'flip-header': {
			enterClass: 'flipInX',
			leaveClass: 'flipOutX',
		},
		'fade-results': {
			enterClass: 'fadeIn',
			leaveClass: 'fadeOut',
		},
		'item-stagger': {
			enterClass: 'flipInX',
			leaveClass: 'flipOutX',
		},
		'bounce-isEmpty': {
			enterClass: 'bounceIn',
			leaveClass: 'bounceOut',
		},
	},

	vuex: {
		getters: {

		},
		actions: {
			store_setItem,
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
		}
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
		console.warn( 'autocomplete ready' )
	},

	methods: {

		openItem: function ( evt ) {
			let index = ( isUndefined( evt ) ) ? this.focused : evt.currentTarget.index
			let item = this.results[ index ]

			/**
			 *
			 * we clone the item using JSON.parse( JSON.stringify( item ) ) to detach it
			 * from this components reactive prototype/class properties/methods & DOM elements
			 * allowing it to be GARBAGE COLLECTED when this component is destroyed
			 *
			 */
			this.store_setItem( JSON.parse( JSON.stringify( item ) ) )
			this.$dispatch( 'setRoute', 'item' )

		},

		stopScroll: function ( evt ) {
			let keys = [ 9, 33, 34, 35, 36, 37, 38, 39, 40 ] // tab, page, and arrow keys
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

				return false

			} else if ( key == 13 ) { // enter key
				this.openItem()
			}

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

		inputKeydown: function ( evt ) {
			let key = evt.which
			if ( key == 8 ) { // backspace
				if ( isEmpty( this.results ) ) {
					this.isEmpty = false
				}
			}
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

	},

}

/**
	TODO:
	- on enter down while typing goto first tabindex
**/




















//

