<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for='item in lunbotuList' :key='item.img'>
                <img :src='item.img' :class='{full:isfull}'/>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props:['lunbotuList','isfull']
}
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        text-align: center;
        .mint-swipe-item{
            img{
                height: 100%;
            }
        }
    }
    .full{
        width:100%
    }
</style>

