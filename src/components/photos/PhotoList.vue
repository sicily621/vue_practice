<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id==0 ? 'mui-active':'']" v-for='item in cates' :key='item.id'>
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <ul class='photo-list'>
            <router-link tag='li' :to="'/home/photoinfo/'+item.id" v-for="item in list" :key='item.id'>
                <img v-lazy="item.img_url">
                <div class='info'>
                    <h1 class='info-title'>{{item.title}}</h1>
                    <div class='info-body'>{{item.abstract}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
    import mui from '../../lib/mui/js/mui.min.js';
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return{
                cates:[],
                list:[]
            }
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        created(){
            this.getAllCategory();
            this.getPhotoListByCateId()
        },
        methods:{
            getAllCategory(){
                this.$http.get('../../data/cates.json').then(result=>{
                    if(result.status==200){
                        this.cates = result.body
                    }else{
                        Toast('获取导航失败')
                    }
                })
            },
            getPhotoListByCateId(cateId){
                this.$http.get('../../data/photoCates.json').then(result=>{
                    if(result.status==200){
                        this.list = result.body;
                    }else{
                        Toast('获取图片失败')
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    *{
        touch-action:pan-y
    }
    .photo-list{
        padding: 10px;
        padding-bottom: 0;
        margin: 0;
        li{
            background-color: #ccc;
            list-style: none;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            img{
                width: 100%;
                vertical-align: middle
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info{
                position: absolute;
                color:white;
                bottom:0;
                text-align: left;
                background-color:rgba(0,0,0,0.4);
                max-height: 84px;
                width: 100%;
                .info-title{
                    font-size: 14px;
                    text-indent: 1em;
                }
                .info-body{
                    font-size: 13px;
                    text-indent: 0.5em;
                }
            }
        }
    }
    
</style>

