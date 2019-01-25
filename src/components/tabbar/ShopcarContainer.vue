<template>
    <div class='shopcar-container'>
        <div class='goodslit'>
            <div class="mui-card" v-for='(item,i) in goodslist' :key='item.id'>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                       <mt-switch v-model='$store.getters.getGoodsSelected[item.id]' @change='selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])'></mt-switch>
                       <img :src='item.img_url'/>
                       <div class="info">
                           <h1>{{item.title}}</h1>
                           <p>
                               <span class='price'>￥{{item.sell_price}}</span>
                               <numbox :initCount='$store.getters.getGoodsCount[item.id]' :goodsId='item.id'></numbox>
                               <a href='#' @click.prevent = 'remove(item.id,i)'>删除</a>
                           </p>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mui-card">
            <div class="mui-card-content jiesuan">
                <div class="mui-card-content-inner">
                    <div class='left'>
                        <p>总计：不含运费</p>
                        <p>已勾选商品 <span class='red'>{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价<span class='red'>￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                </div>
                <mt-button type='danger'>去结算</mt-button>
            </div>
        </div>
        <p>
            {{$store.getters.getGoodsSelected}}
        </p>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_number.vue';
export default {
    data(){
        return{
            goodslist:[]
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            var idCar = [];
            this.$store.state.car.forEach(item=>idCar.push(parseInt(item.id)));
            var paramsId = idCar.join(',');
            if(idCar.length<=0) return;
            this.$http.get('../../data/goodslist.json').then(result=>{
                if(result.status==200){
                     result.body.forEach(item=>{
                        if(idCar.indexOf(parseInt(item.id))>-1){
                            this.goodslist.push(item)
                        }
                    })
                }
            })
        },
        remove(id,index){
            this.goodslist.splice(i,1);
            this.$store.commit('removeFromCar',id)
        },
        selectedChanged(id,value){
            this.$store.commit('updateGoodsSelected',{id,selected:value})
        }
    },
    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goodslit{
        .mui-card-content-inner{
            display: flex;
            align-items:center;
        }
        img{
            width:60px;
            height:60px
        }
        h1{font-size: 13px}
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{margin: 0}
            .price{
                color:red;
                font-weight: bold
            }
        }
    }
    .jiesuan{
        display:flex;
        justify-content: space-between;
        align-items:center;
        button{margin-right:10px }
        .red{color: red;font-weight: bold}
    }
}
</style>