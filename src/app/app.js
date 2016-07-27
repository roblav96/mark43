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
	},

	data: function () {
		return {
			
		}
	},

	ready: function () {
		console.warn( 'app ready' )
	},

	methods: {
		
		

	},

}






















//

