//

import autocomplete from './autocomplete.vue'
import db from '../db'





module.exports = {

	components: {
		autocomplete,
	},

	data: function () {
		return {
			input: '',
			poison: 0,
			poisons: [ {
				name: 'Star Wars Characters',
				map: 'starwars',
			}, {
				name: 'Planets',
				map: 'planets',
			}, {
				name: 'Game Of Thrones Characters',
				map: 'thrones',
			}, {
				name: 'Beer Names',
				map: 'beer',
			}, {
				name: 'Pokemon',
				map: 'pokemon',
			} ],
			db: [],
			results: [],
		}
	},

	ready: function () {
		console.warn( 'home ready' )
		this.setPoison()
	},

	methods: {

		setPoison: function ( i = 0, count = 10000 ) {
			let map = this.poisons[ i ].map
			this.db.splice( 0, this.db.length )
			this.db = db[ map ]

			this.poison = i

		},

	},

}






















//

