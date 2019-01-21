import Vue from 'vue';
import app from './App.vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter);
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
import router from './router.js';
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router
})