<template>
    <div class='cmt-container'>
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多吐槽120字）" maxlength=120 v-model='msg'></textarea>
        <mt-button type='primary' size='large' @click='postComment'>发表评论</mt-button>
        <div class="cmt-list" v-for='(item,index) in comments' :key='index'>
            <div class="cmt-item">
                <div class="cmt-title">
                    第{{index+1}}楼&nbsp;&nbsp;用户：{{item.name}}&nbsp;&nbsp;发表时间：{{item.time | dateFormat}}
                </div>
                <div class='cmt-body'>
                    {{item.content=='' ? "此用户很懒，啥也没说" : item.content }}
                </div>
            </div>
        </div>
        <mt-button type='danger' size='large' plain @click='getMore'>加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
 export default {
     data(){
         return {
             comments:[],
             pageIndex:1,
             msg:''
         }
     },
     created(){
         this.getComments()
     },
     props:['id'],
     methods:{
         getComments(){
             this.$http.get('../../data/comment.json').then(result=>{
                 if(result.status==200){
                     this.comments = this.comments.concat(result.body)
                 }else{
                     Toast('获取评论失败')
                 }
             })
         },
         getMore(){
             this.pageIndex++;
             this.getComments()
         },
         postComment(){
             if(this.msg.trim().length==0){
                return  Toast('评论内容不能为空')
             }
             /* this.$http.post('api/postcomment/'+$route.params.id,{content:this.msg.trim()}).then(result=>{

             }) */
             var msg = {name:'匿名用户',time:Date.now(),content:this.msg.trim(),id:Date.now()};
             this.comments.unshift(msg);
             this.msg = '';
         }
     }
 }
</script>
<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size:18px
        }
        textarea{
            font-size:14px;
            height:85px;
            margin:0
        }
        .cmt-list{
            margin: 5px 0;
            .cmt-item{
                font-size:13px;
                .cmt-title{
                    background-color: #ccc;
                    line-height: 30px;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em
                }
            }
        }
    }
</style>
