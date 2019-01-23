<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for='item in newslist' :key='item.id'>
					<router-link :to="'/home/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class="mui-ellipsis">
                                <span>发表时间：{{item.time | dateFormat}}</span>
                                <span>点击:{{item.clickCount}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                newslist:[]
            }
        },
        created(){
            this.getNewsList()
        },
        methods:{
            getNewsList(){
                this.$http.get('../../data/newslist.json').then(result=>{
                    if(result.status === 200){
                        this.newslist = result.body;
                    }else{
                        Toast('获取新闻列表失败')
                    }
                }) 
            }
        }
    }
</script>
<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{
                font-size:14px
            }
            .mui-ellipsis{
                font-size: 12px;
                color: #226aff;
                display:flex;
                justify-content: space-between;
            }
        }
    }
</style>
