<template>
    <div class='all1'>
        <div v-for="(item,idx) in links" :key="idx" class='box'>
            <a :href='item.url' target="_blank"> <div class='card bg-01'><img class="icon" :src="item.icon"/><span class='card-content'>{{item.name}}</span></div> </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "rightmenu",
        props:{
            links:{
                type:Array
            }
        },
    }
</script>

<style scoped>
    a:link, a:hover, a:visited, a:active {
        color: #fff;
        text-decoration: none
    }

    /* body {
         height: 100%;
         width: 100%;
         margin: 0;
         padding: 0;
         background: #f1f1f5
     }*/
    .icon {
        vertical-align: middle;
        display: inline-block;
        float: left;
        margin-top: 4px;
        margin-left: 4px;
        width:28px;
    }
    .all1 {
        position: fixed;
        top:7vh;
        right:0px;
        width: 0;
        overflow: visible;
        z-index: 9999;
    }

    .box {
        display: inline-block;
        float: left;
        clear: both
    }

    .card {
        position: relative;
        right: 39px;
        width:100px;
        height:37px;
        line-height: 37px;
        margin: 8px;
        x-box-shadow: 0 0 8px 0 rgba(0, 0, 0, .5);
        box-shadow: 8px 0 8px -8px rgba(0, 0, 0, .5);
        background: #fff;
        transition: all .3s ease-in-out .1s
    }

    .card:hover {
        position: relative;
        right: 100%;
        margin-right: 0px;
        box-shadow: 0 -8px 8px -8px rgba(0, 0, 0, .5), 0 8px 8px -8px rgba(0, 0, 0, .5);
        transition: all .3s ease-in-out
    }

    .card-content {
        color: #fff;
        font-family: droid sans, sans-serif;
        display: block;
        width: 99px;
        font-size: 16px;
        font-weight: 700;
        white-space: nowrap
    }

    .bg-01 {
        background: #539af6;
        border-bottom-left-radius: 3px;
        border-top-left-radius: 3px;
    }

    .bg-02 {
        background: #539af6;
        border-bottom-left-radius: 3px;
        border-top-left-radius: 3px;
    }

    .bg-03 {
        background: #539af6;
        border-bottom-left-radius: 3px;
        border-top-left-radius: 3px;
    }

    .bg-04 {
        background: #539af6;
        border-bottom-left-radius: 3px;
        border-top-left-radius: 3px;
    }

    .bg-05 {
        background: #539af6;
        border-bottom-left-radius: 3px;
        border-top-left-radius: 3px;
    }

    .bg-06 {
        background: #539af6
    }
</style>