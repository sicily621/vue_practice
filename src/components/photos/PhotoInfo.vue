<template>
    <div class='photoinfo-container'>
        <h3>{{photoinfo.title}}</h3>
        <p class='subtitle'>
            <span>发表时间：{{photoinfo.add_time |dateFormat}}</span>
            <span>点击：{{photoinfo.click}}次数</span>
        </p>
        <hr>
        <vue-preview :slides="list" @close="handleClose"></vue-preview>
        <div class='content' v-html='photoinfo.content'></div>
        <cmt-box :id=id></cmt-box>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    import comment from '../subcomponents/comment.vue';
    export default {
        data(){
            return{
                id:this.$route.params.id,
                photoinfo:{},
                list:[]
            }
        },
        created(){
            this.getPhotoInfo();
            this.getThumbs()
        },
        methods:{
            getPhotoInfo(){
                this.$http.get('../../data/photoInfo.json').then(result=>{
                    if(result.status==200){
                        this.photoinfo = result.body;
                    }else{
                        Toast('获取图片信息失败')
                    }
                })
            },
            getThumbs(){
                this.$http.get('../../data/swiper.json').then(result=>{
                    if(result.status==200){
                        result.body.forEach(item=>{
                            item.src=item.img;
                            item.alt = 'picture1';
                            item.title = '图片';
                            item.w = 600;
                            item.h = 400;
                        })
                        this.list = result.body
                    }
                })
            },
            handleClose () {
                console.log('close event')
            }
        },
        components:{
            'cmt-box':comment
        }
    }
</script>
<style lang="scss" scoped>
.photoinfo-container{
    padding:3px;
    h3{
        color:#26a2ff;
        font-size:15px;
        text-align:center;
        margin:15px 0;
    }
    .subtitle{
        display:flex;
        justify-content:space-between;
        font-size:13px;
    }
    .content{
        font-size:13px;
        line-height: 30px
    }
}
</style>
