//

import {
	store_setDB,
} from '../store'
import autocomplete from './autocomplete.vue'





module.exports = {

	components: {
		autocomplete,
	},

	vuex: {
		getters: {
			progging: state => state.progging,
		},
		actions: {
			setDB: store_setDB,
		},
	},

	data: function () {
		return {
			poison: 0,
			poisons: [ {
				name: 'Star Wars Characters',
				table: 'starwars',
			}, {
				name: 'Planets',
				table: 'planets',
			}, {
				name: 'Game Of Thrones Characters',
				table: 'thrones',
			}, {
				name: 'Beer Names',
				table: 'beer',
			}, {
				name: 'Pokemon',
				table: 'pokemon',
			} ],
		}
	},

	ready: function () {
		console.warn( 'home ready' )
		this.setPoison()
	},

	methods: {

		setPoison: function ( i = 0 ) {
			let table = this.poisons[ i ].table
			this.setDB( table ).then( () => {
				this.poison = i // only set poison if the table exists in database
			} ).catch( function ( err ) {
				console.error( err ) // if the table does not exist
			} )
		},

	},

}






















//

