import Vue from 'vue';
import app from './App.vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter);

import router from './router.js';
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

/* import { Header,Swipe, SwipeItem ,Button,Lazyload} from 'mint-ui';
Vue.use(Lazyload);
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button); */

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css';
Vue.use(MintUI)

import moment from 'moment';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.filter('dateFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm:ss'){
    return moment(dateStr).format(pattern)
})
import VuePreview from 'vue-preview';
Vue.use(VuePreview)
var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router
})
