// 

import Vue from 'vue'
import store from './store'
import app from './app/app.vue'





new Vue( {

	el: 'body',

	components: {
		app,
	},

	store,

} )





/*=======================================
=            PRETTY ICONS <3            =
=======================================*/

const $platform = ( navigator.userAgent.indexOf( 'Mac' ) != -1 || navigator.userAgent.indexOf( 'iPhone' ) != -1 || navigator.userAgent.indexOf( 'iPad' ) != -1 ) ? 'iOS' : 'Android'

let sheet
if ( $platform == 'iOS' ) {
	sheet = 'css/app.ios.css'
	document.body.classList.add( 'platform-ios' )
} else {
	sheet = 'css/app.md.css'
	document.body.classList.add( 'platform-android' )
}

let el = document.createElement( 'link' )
el.href = sheet
el.rel = 'stylesheet'
document.head.appendChild( el )































































































//

