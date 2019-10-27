import Vue from 'vue';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';

var VueCookies = require('vue-cookies')
var BootstrapVue = require('bootstrap-vue')
Vue.use(BootstrapVue)
Vue.use(VueCookies)

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();



new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});