<template>
    <div class='goodsinfo-container'>
        <transition @before-enter='beforeEnter' @enter='enter' @afterEnter='afterEnter'>
            <div class='ball' v-show='ballFlag' ref='ball'></div>
        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList=lunbotu :isfull=false></swiper>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{goodInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class='price'>
                        市场价：<del>￥{{goodInfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class='now_price'>￥{{goodInfo.sell_price}}</span>
                    </p>
                    <p>
                        购买数量：<number @getcount = "getSelectedCount" :max = 'goodInfo.stock_quantity'></number>
                    </p>
                    <p>
                        <mt-button type='primary' size='small'>立即购买</mt-button>
                        <mt-button type='danger' size='small' @click='addShopCar'>加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodInfo.goods_no}}</p>
                    <p>库存情况：{{goodInfo.stock_quantity}}件</p>
                    <p>商家时间：{{goodInfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type='primary' size='large' plain @click='goDesc(id)'>图文介绍</mt-button>
                <mt-button type='danger' size='large' plain @click='goComment(id)'>商品详情</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    import swiper from '../subcomponents/swiper.vue';
    import number from '../subcomponents/Goodsinfo_number.vue';
    export default {
        data(){
            return{
                id:this.$route.params.id,
                lunbotu:{},
                goodInfo:{},
                ballFlag:false,
                selectedCount:1
            }
        },
        created(){
            this.getLunbotu()
            this.getGoodsInfo()
        },
        methods:{
            getLunbotu(){
                this.$http.get('../../data/swiper.json').then(result=>{
                    if(result.status==200){
                        result.body.forEach((item)=>{
                            item.img = item.msrc
                        })
                        this.lunbotu=result.body
                    }else{
                        Toast('获取轮播图失败')
                    }
                })
            },
            getGoodsInfo(){
                this.$http.get('../../data/goodslist.json').then(result=>{
                    if(result.status==200){
                        this.goodInfo = result.body[0]
                    }else{
                        Toast('获取商品信息失败')
                    }
                })
            },
            goDesc(id){
                this.$router.push({name:'goodsdesc',params:{id}})
            },
            goComment(id){
                this.$router.push({name:'goodscomment',params:{id}})
            },
            addShopCar(){
                this.ballFlag = !this.ballFlag;
            },
            beforeEnter(el){
                el.style.transform = 'translate(0,0)';
            },
            enter(el,done){
                const ballPosition = this.$refs.ball.getBoundingClientRect()
                const badgePosition = document.getElementById('badge').getBoundingClientRect();
                const xDist = badgePosition.left-ballPosition.left;
                const yDist = badgePosition.top-ballPosition.top;
                el.offsetWidth;
                el.style.transform = `translate(${xDist}px,${yDist}px)`;
                el.style.transition = 'all .5s cubic-bezier(.4,-0.03,1,.68)';
                done()
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag;
            },
            getSelectedCount(count){
                console.log(count)
                this.selectedCount = count;
            }
        },
        components:{
            swiper,
            number
        }
    }
</script>
<style lang="scss" scoped>
    .goodsinfo-container{
        background-color: #eee;
        overflow: hidden;
        .now_price{
            color:red;
            font-size:16px;
            font-weight:bold;
        }
        .mui-card-footer{
            display: block;
            button{
                margin: 15px 0;
            }
        }
        .ball{
            width:15px;
            height:15px;
            border-radius: 50%;
            background-color:red;
            position: absolute;
            z-index: 99;
            top:390px;
            left:146px
        }
    }
</style>
