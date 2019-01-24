<template>
    <div class='newsinfo-container'>
        <h1 class='title'>{{newsInfo.title}}</h1>
        <hr>
        <div class='content' v-html='newsInfo.content'></div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
    data(){
        return {
            newsInfo:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('../../data/newsinfo.json').then(result=>{
                if(result.status==200){
                    this.newsInfo = result.body;
                }else{
                    Toast('获取新闻详情')
                }
            })
        }
    },
}
</script>

<style lang="scss">
    .newsinfo-container{
        padding:0 4px;
        .title{
            font-size: 16px;
            text-align:center;
            margin: 15px 0;
            color:#226aff
        }
        .content{
            img{width: 100%}
        }
    }
</style>
