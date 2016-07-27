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
	progging: false,
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
















// {
// 	"cards": [ {
// 		"id": "base6-3",
// 		"name": "Charizard",
// 		"imageUrl": "https://s3.amazonaws.com/pokemontcg/base6/3.jpg",
// 		"subtype": "Stage 2",
// 		"supertype": "Pokémon",
// 		"ability": {
// 			"name": "Energy Burn",
// 			"text": "As often as you like during your turn (before your attack), you may turn all Energy attached to Charizard into R for the rest of the turn. This power can't be used if Charizard is Asleep, Confused, or Paralyzed."
// 		},
// 		"hp": "120",
// 		"retreatCost": [ "Colorless", "Colorless", "Colorless" ],
// 		"number": "3",
// 		"artist": "Mitsuhiro Arita",
// 		"rarity": "Rare",
// 		"series": "Base",
// 		"set": "Legendary Collection",
// 		"setCode": "base6",
// 		"types": [ "Fire" ],
// 		"attacks": [ {
// 			"cost": [ "Fire", "Fire", "Fire", "Fire" ],
// 			"name": "Fire Spin",
// 			"text": "Discard 2 Energy cards attached or this attack does nothing.",
// 			"damage": "100",
// 			"convertedEnergyCost": 4
// 		} ],
// 		"weaknesses": [ {
// 			"type": "Water",
// 			"value": "×2"
// 		} ],
// 		"resistances": [ {
// 			"type": "Fighting",
// 			"value": "-30"
// 		} ]
// 	} ]
// }



























































//

