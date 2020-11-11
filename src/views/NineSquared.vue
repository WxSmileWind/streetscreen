<template>
    <div class="totaldiv">
        <div class="title"  >
            <div class="center">
                <img src="../assets/imgs/centerbackground.png" width="50" height="50"/>
                <span>宁波市社会治理工作中心大屏 </span>
            </div>
        </div>

        <div style="clear: both;" ></div>

        <div> 
            <!-- 页码切换 -->
            <el-carousel  trigger="click" height="100vh" :autoplay="false">
                <el-carousel-item  v-for="(item,index) in eventimgitemsfor" :key="index" >
                    <el-card v-for="(items,index) in item.itemlist"
                             :key="index"
                             :body-style="cardstyle"
                             style="cursor: pointer;"
                             @click.native="bigscreenClick(items.link)">
                           <img :src="imgsrcBefore + items.imageSrc">
                        <div style="padding: 9px;">
                                <span>{{items.name}}</span>
                            <div class="bottom clearfix">
                                <time class="time">{{items.des}}</time>
                            </div>
                        </div>
                    </el-card>
                </el-carousel-item>
            </el-carousel>
    </div>


    </div>
</template>

<script>
    //接口调用文件
    import index from '@/api/index';
    //接口配置文件
    import {Api} from '@/api/api';
    import {Message} from "element-ui";

    export default {
        name: "NineSquared",
        data(){
            return {
                currentDate: new Date(),

                screenWidth: document.body.clientWidth,
                screenHeight: document.body.clientHeight,
                imgsrcBefore:'http://10.68.129.154:8112',
                bigScreenList: [
                    /*{
                        name: '可视化大屏',
                        des: '可视化大屏提供中心部分工作重点内容一览表',
                        imageSrc:require('../assets/imgs/BigScreenImages/keshi.png'),
                        link: 'http://10.68.129.154:8119/BigScreen/Home/Index?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    },
                    {
                        name: '疫情大屏',
                        des: '疫情大屏可以查看疫情相关内容',
                        imageSrc:require('../assets/imgs/BigScreenImages/yiqing.png'),
                        link: 'http://10.68.129.154:8119/BigScreen/Home/Contact?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    },
                    /!*{
                        name: '两小排摸',
                        des: '',
                        imageSrc:require('../assets/imgs/BigScreenImages/yiqing.png'),
                        link: 'http://10.68.129.154:8119/BigScreen/Home/Contact?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    },
                    *!/

                    {
                        name: '矛盾纠纷大屏',
                        des: '矛盾纠纷大屏可以查看矛盾纠纷统计分析内容',
                        imageSrc:require('../assets/imgs/BigScreenImages/maodunjiufen.png'),
                        link: 'http://10.68.129.154:8119/BigScreen/Home/About?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    },
                    {
                        name: '典型事件大屏',
                        des: '查看典型事件的预览及分析内容',
                        imageSrc:require('../assets/imgs/BigScreenImages/keshi.png'),
                        link: 'http://10.68.129.154:8119/BigScreen/Home/Index?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    },
                    {
                        name: 'E宁波',
                        des: '',
                        imageSrc:require('../assets/imgs/BigScreenImages/ENB.png'),
                        link: 'http://10.19.181.153/grid/login'
                    },
                    {
                        name: '管理决策',
                        des: '查看典型事件的预览及分析内容',
                        imageSrc:require('../assets/imgs/BigScreenImages/GLJC.png'),
                        link: 'http://10.19.181.153/gljc/index.html?orgUid=001'
                    },
                    {
                        name: 'VR培训',
                        des: '查看典型事件的预览及分析内容',
                        imageSrc:require('../assets/imgs/BigScreenImages/VR.png'),
                        link: 'http://10.68.132.99/pxxt/#/index'
                    },
                    {
                        name: '实时动态',
                        des: '查看典型事件的预览及分析内容',
                        imageSrc:require('../assets/imgs/BigScreenImages/SSJC.png'),
                        link: 'http://10.68.129.138/yunwei/dp/indexmap_static.html'
                    }*/
                ],
                eventimgitemsfor:[],//用于分页
                bdata:[1,2,3,4,5,6],
                isshow:true,
                cardstyle: {padding: '0px', float: 'left', width: '23vw', margin: '0px'},
            }
        },
        async created() {
           this.binddata();
        },
        mounted() {
            const that = this;
            window.onresize = () => {
                window.screenWidth = document.body.clientWidth;
                window.screenHeight = document.body.clientHeight;
                that.screenWidth = window.screenWidth;
                that.screenHeight= window.screenHeight;

            }
            if(!this.isshow){

            }
        },
        watch:{
            /*根据视窗宽度自动调整页面大小*/
            // eslint-disable-next-line no-unused-vars
            screenWidth(val,newval){
                //重新加载页面
               // this.$router.go(0);
            },
            /*根据视窗高度自动调整页面大小*/
            // eslint-disable-next-line no-unused-vars
            screenHeight(val,newval){
                //重新加载页面
               // this.$router.go(0);
            }
        },
        methods:{
            //大屏点击事件
            bigscreenClick(link){
                //window.location.href = link;
                //window.location.href = link;
                window.open(link,"_blank");
                //location.href='#/NineSquaredChild/'+encodeURIComponent(link);
                //location.href='#/NineSquaredChild/'+encodeURIComponent(link);
            }
            ,
            pageSizeChange(){
                console.log("1");
            },
            pageCurrentChange(){
                console.log("1");
            },
            async binddata(){
                let {data:eventslist} = await index.fetchData_get(Api.sc_list,null
                    //{}null
                    );
                this.bigScreenList = eventslist;
                //分页数据变量
                this.eventimgitemsfor=[];
                //判断是否分页
                if(this.bigScreenList.length >0 && this.bigScreenList.length <=12)
                {
                    let itemlist=[];
                    this.bigScreenList.forEach(item=>{
                        itemlist.push({
                            name:item.name,
                            imageSrc:item.imageSrc,
                            link:item.link,
                        });
                    });
                    this.eventimgitemsfor.push({
                        itemlist:itemlist
                    });
                    this.isshow = false;
                }else{//超过一页
                    let pcount=parseInt(this.bigScreenList.length/12);
                    console.log("++++++++++++pcount：",pcount);
                    if(this.bigScreenList.length%12!==0)
                    {
                        pcount=pcount+1;
                    }
                    for(let i=0;i<pcount;i++)
                    {
                        let itemlist=[];
                        let startindex=i*12;
                        let endindex=i*12+11;
                        this.bigScreenList.slice(startindex,endindex+1).forEach(
                            item=>{
                                itemlist.push({
                                    name:item.name,
                                    imageSrc:item.imageSrc,
                                    link:item.link,
                                });
                            }
                        )
                        this.eventimgitemsfor.push({
                            itemlist:itemlist
                        });
                    }
                }
                // let {msg:eventslist}
                //Message.info('接口返回内容：'+eventslist);
                console.log("++++++++++++eventslist:",eventslist);
            }
        }
    }
</script>
<style>

    .el-card__body img{
        height: 20vh !important;
        width: 23vw;

    }
    .el-card{
        background-color: #1e244c !important;
        color:#bcbed0 !important;
        border-color:#5f5454;
        //border-radius: 5vh;
    }
    .el-carousel__arrow {
        background-color: rgb(30, 36, 76) !important;
        color: #f9f9f9;
    }
</style>


<style lang="scss" scoped>
    .totaldiv{
        overflow: hidden;
        width:100vw;
        height:100vh;
        background-color: #09233e;

        .title{
            margin:0.8vh;
            position: relative;
            height: 5vh;
            background-image: url(../assets/imgs/BigScreenImages/jcdsj_logo.gif);
            width:100vw;
            .center{
                width:24vw;
                height:5vh;
                margin:0 auto;
                img{
                    display: block;
                    height:4vh;
                    margin-top: 0.5vh;
                    float:left;

                }
                span{
                    text-indent: 1vw;
                    font-size: 1.8rem;
                    font-weight: bold;
                    display: block;
                    line-height: 4vh;
                    height:4vh;
                    margin-top: 0.5vh;
                    float:left;
                    color:#fff;
                }
            }


        }
        ul li{
            width:28vw;
            height: 28vh;
            background: #fff;
            color:#000;
            float:left;
            margin: 1vh 2vw 1vh 2vw;
            cursor: pointer;
            span{
                font-size: 1.1rem;
            }
        }
        ul li:hover{
            background: #cc3399;
            color:#fff;
        }
        el-col{
            width:28vw;
            height: 28vh;
            margin: 1vh 2vw 1vh 2vw;
            cursor: pointer;
        }
    }

    .textAlign{
        text-align: center;
    }
    .el-card:hover{
        //margin-top: -5px;
        background-color: #424a84 !important;
    }



    .time {
        font-size: 1rem;
        color: #999;
    }

    .bottom {
        margin-top: 1vh;
        line-height: 1vh;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        height:3vh;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .el-card{

        float:left;
        width:23vw;
        height:26vh;
        margin: 1.4vw 0.9vw;
        border-radius: 5vh;

    }
</style>