import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { sync } from 'vuex-router-sync';

import fontawesome from "@fortawesome/fontawesome";
import brands from "@fortawesome/fontawesome-free-brands";
import light from "@fortawesome/fontawesome-pro-light";
import regular from "@fortawesome/fontawesome-pro-regular";
import solid from "@fortawesome/fontawesome-pro-solid";

import WebFont from 'webfontloader';

import TestsPlugin from './plugins/TestsPlugin';

WebFont.load({
   google: {
      families: ['Raleway:100,300,500,700,900']
   }
});

fontawesome.library.add(light, regular, solid, brands);

Vue.config.productionTip = false

sync(store, router);

Vue.use(TestsPlugin);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
