<template>
    <div class="main">
        <iframe style="width: 100%;height:100%;border:0px;" :src="url">

        </iframe>


        <div class="backToMenu"  title="返回菜单页" @click="backToMainMenu()">
            <img src="../assets/imgs/zhzh.png" width="45" height="45"/>
        </div>
    </div>

</template>

<script>
    export default {
        name: "NineSquaredChild",
        data(){
            return {
                url:'',
            }
        },
        // data(){
        //     return {
        //         x:'121.535',
        //         y:'29.873',
        //         dmap:{type:Object}
        //     }
        // },
        created() {
            this.url =decodeURIComponent(this.$route.params.url);
        },
        methods:{
            backToMainMenu()
            {
                location.href='#/NineSquared';
            }
        }
    }
</script>

<style  lang="scss" scoped>
.main{
    width:100%;
    height:100%;
    .backToMenu{
        position:absolute;
        bottom:15px;
        right:20px;
        cursor: pointer;
    }
}
</style>