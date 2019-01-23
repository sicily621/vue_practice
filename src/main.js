import Vue from 'vue';
import app from './App.vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter);

import router from './router.js';
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

import { Header,Swipe, SwipeItem ,Button} from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
import moment from 'moment';
import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.filter('dateFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm:ss'){
    return moment(dateStr).format(pattern)
})
var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router
})
