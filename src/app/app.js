//

import {
	random
} from 'lodash'
import Lockr from 'lockr'
import axios from 'axios'
import {
	store_prog,
} from '../store'
import autocomplete from './autocomplete.vue'
import card from './card.vue'
import item from './item.vue'





module.exports = {

	components: {
		autocomplete,
		card,
		item,
	},

	transitions: {
		'swap-nav': {
			enterClass: 'fadeInRight',
			leaveClass: 'fadeOutRight',
		},
	},

	data: function () {
		return {
			route: Lockr.get( 'route' ) || 'autocomplete',
		}
	},

	ready: function () {
		this.$on( 'setRoute', this[ 'setRoute' ] )
		console.warn( 'app ready' )
	},

	methods: {

		setRoute: function ( route ) {
			Lockr.set( 'route', route )
			this.route = route
		},

	},

	beforeDestroy: function () {
		this.$off( 'setRoute', this[ 'setRoute' ] ) // cleanup for garbage collection
	},

}






















//

