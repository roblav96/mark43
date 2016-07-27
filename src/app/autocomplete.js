//

import {
	isUndefined,
	isEmpty,
	includes,
	trim,
} from 'lodash'
import axios from 'axios'





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
			console.log( 'index >', index )

			// 
			// console.warn( 'DO MAGICAL THINGS!!!', item )
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

			console.info( 'getResults >' )

			let input = trim( this.input.toLowerCase() )

			axios.get( 'https://api.pokemontcg.io/v1/cards', {
				params: {
					name: input,
					series: 'base|neo',
				}
			} ).then( ( response ) => {

				let results = response.data.cards
				let i, len = results.length
				for ( i = 0; i < len; i++ ) {
					results[ i ].highlightedname = results[ i ].name.replace( new RegExp( input, 'gi' ), '<span class="autocomplete-highlight">$&</span>' )
				}

				this.results = results
				this.isEmpty = isEmpty( this.results )

			} ).catch( function ( err ) {
				console.error( err )
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

	},

}

/**
	TODO:
	- on enter down while typing goto first tabindex
**/




















//

