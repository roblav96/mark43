// 

import {
	delay,
	hasIn,
} from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import db from './db'

Vue.use( Vuex )





/*===============================
=            ACTIONS            =
===============================*/

export function store_setDB( {
	dispatch,
	state,
}, table ) {

	/**
	 *
	 * this is where we would fetch from the rest api if the 'table' exists in database
	 *
	 * kinda bad of an example; during initialization i would fetch a list of
	 * all existing databases then hand it over to the app component
	 *
	 */

	return new Promise( function ( resolve, reject ) {
		delay( resolve, 1000 )
	} ).then( function () {
		dispatch( 'SETDB', table ) // dispatch to UI components that the table exists
		return Promise.resolve()
	} ).catch( function ( err ) {
		console.error( err )
		return Promise.reject( err ) // reject again to trigger catch on the caller
	} )

}





/*=============================
=            STATE            =
=============================*/

const state = {
	progging: true,
	db: [],
}





/*=================================
=            MUTATIONS            =
=================================*/

const mutations = {

	'SETDB': function ( state, table ) {
		state.db = db[ table ]
	},

}





/*=============================
=            STORE            =
=============================*/

const store = new Vuex.Store( {
	state,
	mutations,
} )

export default store


















































































//

