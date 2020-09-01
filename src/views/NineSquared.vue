<template>
    <div class="totaldiv">
        <div class="title">
            <img src="../assets/imgs/centerbackground.png" width="50" height="50" />
            <span>宁波市社会治理工作中心大屏</span>
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

        <el-row>
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
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "NineSquared",
        data(){
            return {
                currentDate: new Date(),
                screenWidth: document.body.clientWidth,
                screenHeight:document.body.clientHeight,
                bigScreenList:[
                    {
                        name:'可视化大屏',
                        des:'可视化大屏提供中心部分工作重点内容一览表',
                        link:'http://10.68.129.154:8119/BigScreen/Home/Index?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    },
                    {
                        name:'疫情大屏',
                        des:'疫情大屏可以查看疫情相关内容',
                        link:'http://10.68.129.154:8119/BigScreen/Home/Contact?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    },
                    {
                        name:'矛盾纠纷大屏',
                        des:'矛盾纠纷大屏可以查看矛盾纠纷统计分析内容',
                        link:'http://10.68.129.154:8119/BigScreen/Home/About?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    },
                    {
                        name:'典型事件大屏',
                        des:'查看典型事件的预览及分析内容',
                        link:'http://10.68.129.154:8119/BigScreen/Home/Index?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    },
                    {
                        name:'典型事件大屏',
                        des:'查看典型事件的预览及分析内容',
                        link:'http://10.68.129.154:8119/BigScreen/Home/Index?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    },
                    {
                        name:'典型事件大屏',
                        des:'查看典型事件的预览及分析内容',
                        link:'http://10.68.129.154:8119/BigScreen/Home/Index?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    },
                    {
                        name:'典型事件大屏',
                        des:'查看典型事件的预览及分析内容',
                        link:'http://10.68.129.154:8119/BigScreen/Home/Index?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    },
                    {
                        name:'典型事件大屏',
                        des:'查看典型事件的预览及分析内容',
                        link:'http://10.68.129.154:8119/BigScreen/Home/Index?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    },
                    {
                        name:'典型事件大屏',
                        des:'查看典型事件的预览及分析内容',
                        link:'http://10.68.129.154:8119/BigScreen/Home/Index?area=1905f614-ea89-44fc-9f7c-76b4602aea67'
                    }
                ]
                // 分页插件
                ,pageform: {
                    total: 200, // 总条目数
                    pages: 5,  // 总页数
                    pageNum: 1, // 当前的页码
                    pageSizes: [5,10,15,20,30,40,50], // select选项设置：条/页
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
                this.$router.go(0);
            },
            /*根据视窗高度自动调整页面大小*/
            // eslint-disable-next-line no-unused-vars
            screenHeight(val,newval){
                //重新加载页面
                this.$router.go(0);
            }
        },
        methods:{
            //大屏点击事件
            bigscreenClick(link){
                window.location.href = link;
            }
            ,
            pageSizeChange(){
                console.log("1");
            },
            pageCurrentChange(){
                console.log("1");
            }
        }
    }
</script>

<style lang="scss" scoped>
    .totaldiv{
        overflow: hidden;
    }
    .totaldiv .title{
        margin:0.8vh;
    }
    .totaldiv .title img{
        position: relative;
        top: 17px;
    }
    .totaldiv .title span{
        font-size: 29px;
    }
.totaldiv ul li{
    width:28vw;
    height: 28vh;
    background: #fff;
    color:#000;
    float:left;
    margin: 1vh 2vw 1vh 2vw;
    cursor: pointer;
}
.totaldiv ul li:hover{
    background: #cc3399;
    color:#fff;
}
    .totaldiv ul li span{
        font-size: 19px;
    }

    .totaldiv el-col{
        width:28vw;
        height: 28vh;
        margin: 1vh 2vw 1vh 2vw;
        cursor: pointer;
    }
    .textAlign{
        text-align: center;
    }
    .el-card:hover{
        //margin-top: -5px;
        background-color: #cecece;
    }



    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
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
        margin-bottom: 5px;
    }
</style>