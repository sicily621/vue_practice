import VueRouter from 'vue-router';
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
import NewsList from './components/news/NewsList.vue';
import NewsInfo from './components/news/NewsInfo.vue';
import PhotoList from './components/photos/PhotoList.vue';
import PhotoInfo from './components/photos/PhotoInfo.vue';
import GoodsList from './components/goods/GoodList.vue';
import GoodInfo from './components/goods/GoodInfo.vue';
import GoodDesc from './components/goods/GoodDesc.vue';
import GoodComment from './components/goods/GoodComment.vue';
var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {component:HomeContainer,path:'/home'},
        {component:MemberContainer,path:'/member'},
        {component:ShopcarContainer,path:'/shopcar'},
        {component:SearchContainer,path:'/search'},
        {component:NewsList,path:'/home/newslist'},
        {component:NewsInfo,path:'/home/newsinfo/:id'},
        {component:PhotoList,path:'/home/photolist'},
        {component:PhotoInfo,path:'/home/photoinfo/:id'},
        {component:GoodsList,path:'/home/goodslist'},
        {component:GoodInfo,path:'/home/goodinfo/:id',name:'goodsinfo'},
        {component:GoodDesc,path:'/home/goodsdesc/:id',name:'goodsdesc'},
        {component:GoodComment,path:'/hoome/goodscomment/:id',name:'goodscomment'}
    ],
    linkActiveClass:'mui-active'
})
export default router;