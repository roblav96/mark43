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
		this.$on( 'setRoute', this[ 'setRoute' ] )
		console.warn( 'app ready' )
	},

	methods: {

		setRoute: function ( route ) {
			this.route = route
		},

	},

	beforeDestroy: function () {
		this.$off( 'setRoute', this[ 'setRoute' ] ) // cleanup for garbage collection
	},

}






















//

