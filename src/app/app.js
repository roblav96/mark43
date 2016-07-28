//

import {
	includes,
} from 'lodash'
import Lockr from 'lockr'
import axios from 'axios'
import {
	store_prog,
} from '../store'
import autocomplete from './autocomplete.vue'
import card from './card.vue'





module.exports = {

	components: {
		autocomplete,
		card,
	},

	transitions: {
		'swap-nav-left': {
			enterClass: 'fadeInLeft',
			leaveClass: 'fadeOutLeft',
		},
		'swap-nav-right': {
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

		showNav: function ( button ) {
			if ( button == 'card' ) {
				return includes( [ 'autocomplete', 'item' ], this.route )
			} else if ( button == 'autocomplete' ) {
				return this.route == 'card'
			} else if ( button == 'back' ) {
				return this.route == 'item'
			} else if ( button == 'logo' ) {
				return includes( [ 'autocomplete', 'card' ], this.route )
			}
		},

	},

	beforeDestroy: function () {
		this.$off( 'setRoute', this[ 'setRoute' ] ) // cleanup for garbage collection
	},

}






















//

