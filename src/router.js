import VueRouter from 'vue-router';
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {component:HomeContainer,path:'/home'},
        {component:MemberContainer,path:'/member'},
        {component:ShopcarContainer,path:'/shopcar'},
        {component:SearchContainer,path:'/search'},
    ],
    linkActiveClass:'mui-active'
})
export default router;