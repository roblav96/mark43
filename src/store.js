// 

import {
	delay,
	hasIn,
} from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex )





/*===============================
=            ACTIONS            =
===============================*/

export function store_setItem( {
	dispatch,
	state,
}, item ) {
	dispatch( 'SETITEM', item )
}



/*=============================
=            STATE            =
=============================*/

const state = {

	item: {},

}





/*=================================
=            MUTATIONS            =
=================================*/

const mutations = {

	'SETITEM': function ( state, item ) {
		state.item = item
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

