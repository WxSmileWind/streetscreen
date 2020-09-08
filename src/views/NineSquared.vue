<template>
    <div class="totaldiv">
        <!--
        <div class="title">
            <div class="center">
                <img src="../assets/imgs/centerbackground.png" width="50" height="50"/>
                <span>宁波市社会治理工作中心大屏</span>
            </div>
        </div>
        -->
        <div class="title"  >
            <!--<img src="../assets/imgs/BigScreenImages/jcdsj_logo.gif" style="width: 100vw;margin: auto;
            vertical-align: middle;display: block;height: auto"/>
            -->
            <div class="center">
                <img src="../assets/imgs/centerbackground.png" width="50" height="50"/>
                <span>宁波市社会治理工作中心大屏</span>
            </div>
        </div>

        <div style="clear: both;" >

        </div>
        <!--<ul>
            <li v-for="(item,index) in bigScreenList" :key="index" @click="bigscreenClick(item.link)">
                <span>{{item.name}}</span>
            </li>
        </ul>
        -->
        <!--大屏列表
        <div class="centerContent" justify="center" >
            <el-col :span="6" v-for="(item,index) in bigScreenList" :key="index" :offset="1"   >
                <el-card :body-style="{ padding: '0px'}" shadow="hover" style="margin: 4px 6px;"  @click="bigscreenClick(item.link)">
                    <div style="padding: 6px;height: 100%;width: 100%;">
                        <div>
                            <div><b size="5" class="textAlign">{{item.name}}</b></div>
                        </div>
                        <div style="position: relative;top: 30px;">
                            <img src="../assets/imgs/centerbackground.png" class="image"/>
                            <div style="text-align: left;"><i class="el-icon-time"></i>{{item.des}}</div>
                        </div>
                        <div style="position: relative;top: 45px;">
                            &nbsp;&nbsp;<i class="el-icon-view"></i><span>{{item.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <el-button type="text"><b size="4">查看</b></el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </div>
        -->

        <!--   <el-row>
                <el-col :span="6"  v-for="(item,index) in bigScreenList" :key="index"  :offset="1" >
                 <el-card :body-style="{ padding: '0px' }" style="cursor: pointer;" @click.native="bigscreenClick(item.link)">
                  <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zaGFkb3cuZWxlbWVjZG4uY29tL2FwcC9lbGVtZW50L2hhbWJ1cmdlci45Y2Y3YjA5MS01NWU5LTExZTktYTk3Ni03ZjRkMGIwN2VlZjYucG5n">
                  <div style="padding: 14px;">
                   <span>{{item.name}}</span>
                   <div class="bottom clearfix">
                    <time class="time">{{item.des}}</time>
                   </div>
                  </div>
                 </el-card>
                </el-col>
           </el-row>-->
         <div> 
        <el-card v-for="(item,index) in bigScreenList"
                 :key="index"
                 :body-style="cardstyle"
                 style="cursor: pointer;"
                 @click.native="bigscreenClick(item.link)">
               <img :src="imgsrcBefore + item.imageSrc">
            <div style="padding: 9px;">
                    <span>{{item.name}}</span>
                <div class="bottom clearfix">
                    <time class="time">{{item.des}}</time>
                </div>
            </div>
        </el-card>
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
                bdata:[1,2,3,4,5,6],
                cardstyle: {padding: '0px', float: 'left', width: '23vw', margin: '0px'},
                // 分页插件
                pageform: {
                    total: 200, // 总条目数
                    pages: 5,  // 总页数
                    pageNum: 1, // 当前的页码
                    pageSizes: [5, 10, 15, 20, 30, 40, 50], // select选项设置：条/页
                    pageSize: 5, // 每页显示条目个数
                    navigateFirstPage: 1, // 上一页
                    navigateLastPage: 3, // 下一页
                    lastPage: false, // 是最后一页？
                    firstPage: false, // 是第一页？
                    hasNextPage: true, // 有下一页？
                    hasPreviousPage: true // 有上一页？
                }
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

                location.href='#/NineSquaredChild/'+encodeURIComponent(link);
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
        background-color: #1e244c;
        color:#bcbed0 !important;
        border-color:#5f5454;
        //border-radius: 5vh;
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
        background-color: #424a84;
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