//

import {
	store_setDB,
} from '../store'
import store from '../store'





module.exports = {

	vuex: {
		getters: {
			db: state => state.db,
		},
	},

	props: [
		'placeholder',
	],

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

	events: {
		'clearIt': function () {

		},
	},

	methods: {



	},

}






















//

