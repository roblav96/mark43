//

import {
	isEmpty,
	trim,
} from 'lodash'
import axios from 'axios'





module.exports = {

	vuex: {
		getters: {

		},
	},

	data: function () {
		return {
			input: '',
			results: [],
		}
	},

	ready: function () {
		console.warn( 'autocomplete ready' )

		// setInterval( function () {
		// 	console.log( 'this.db >', this.db )
		// 	console.log( 'this.poison >', this.poison )
		// 	console.log( 'this.poisons >', this.poisons )
		// }.bind( this ), 1000 )

	},

	methods: {

		clearResults: function () {
			console.info( 'clearResults >' )
			this.results = []
		},

		getResults: function () {
			if ( isEmpty( this.input ) ) {
				return this.clearResults()
			}

			axios.get( 'https://api.pokemontcg.io/v1/cards', {
				params: {
					name: trim( this.input.toLowerCase() ),
					series: 'base|neo|ex',
				}
			} ).then( ( response ) => {
				this.results = response.data.cards
				console.log( 'this.results[0] >', JSON.stringify( this.results[ 0 ], true, 4 ) )
			} ).catch( function ( err ) {
				console.error( err )
			} )

		},

	},

}






















//

