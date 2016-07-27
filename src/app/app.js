//

import {
	random
} from 'lodash'
import {
	store_setDB,
} from '../store'
import autocomplete from './autocomplete.vue'
import card from './card.vue'





module.exports = {

	components: {
		autocomplete,
		card,
	},

	vuex: {
		getters: {
			progging: state => state.progging,
		},
	},

	data: function () {
		return {
			route: 'autocomplete',
		}
	},

	ready: function () {
		console.warn( 'app ready' )
	},

	methods: {

		setRoute: function () {
			console.info( 'setRoute', random( 0, 1 ) )
			let arr = [ 'card', 'autocomplete' ]
			this.route = arr[ random( 0, 1 ) ]
		},

	},

}






















//

