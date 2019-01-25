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

import Vuex from 'vuex';
Vue.use(Vuex);
var car = window.JSON.parse(localStorage.getItem('car') || '[]');
var store = new Vuex.Store({
    state:{
        car:car
    },
    mutations:{
        addToCar(state,goodsinfo){
            var flag = false;
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count+=parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })
            if(!flag){
                state.car.push(goodsinfo)
            }
            console.log('addShopCar', goodsinfo)
            localStorage.setItem('car',window.JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            });
            localStorage.setItem('car',window.JSON.stringify(state.car));
        },
        removeFromCar(state,id){
            state.car.some((item,i) => {
                if (item.id == id) {
                    state.car.splice(i,1);
                    return true;
                }
            });
            localStorage.setItem('car', window.JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected;
                    return true;
                }
            });
            localStorage.setItem('car', window.JSON.stringify(state.car));
        }
    },
    getters:{
        getAllCount(state){
            var c=0;
            state.car.forEach(item=>{
                c+=item.count
            })
            return c;
        },
        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item=>{
                o[parseInt(item.id)] = item.count;
            });
            return o;
        },
        getGoodsSelected(state){
            var o = {};
            state.car.forEach(item => {
                o[parseInt(item.id)] = item.selected;
            });
            return o;
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,
                amount:0
            };
            state.car.forEach(item => {
                if(item.selected){
                    o.count+=item.count;
                    o.amount+=item.price*item.count;
                }
            });
            return o;
        }
    }
});

var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router,
    store
})
