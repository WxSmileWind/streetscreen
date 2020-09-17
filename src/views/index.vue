<template>
    <div class="main">
        <!--左-->
        <div class="left">
            <!--待办事件+通知公告-->
            <div class="l_tip">
                <span class="l_span">
                        <i class="el-icon-date"></i>
                        待办事件
                </span>
                <span class="l_spannum" @click="showdbsj">
                        {{dbsj}}
                </span>
                <span class="l_span">
                        <i class="el-icon-chat-dot-round"></i>
                        通知公告
                </span>
                <span class="l_spannum" @click="showtzgg">
                         {{tzgg}}
                </span>
            </div>
            <!--辖区概况-->
            <div class="l_xqgk">
                <div class="title">
                    <img src="../assets/imgs/icon.png" class="icon"/>&nbsp;
                    <span class="icon_title" style="">辖区概况</span>
                </div>
                <!--人口/房屋/企业 菜单-->
                <div class="xqgk_menu">
                    <div title="人口" :class="xqgk_menutab===0?'xqgk_tab tab_on':'xqgk_tab'"
                         @mouseover="showxqgk($event,0)">
                        人口
                    </div>
                    <div title="房屋" :class="xqgk_menutab===1?'xqgk_tab tab_on':'xqgk_tab'"
                         @mouseover="showxqgk($event,1)">
                        房屋
                    </div>
                    <div title="企业" :class="xqgk_menutab===2?'xqgk_tab tab_on':'xqgk_tab'"
                         @mouseover="showxqgk($event,2)">
                        企业
                    </div>
                </div>
                <!--人口/房屋/企业 统计-->
                <div class="xqgk_content">
                    <div class="full" v-show="xqgk_menutab===0?true:false" id="xqgk_content_rk">
                        人口
                    </div>
                    <div class="full" v-show="xqgk_menutab===1?true:false" id="xqgk_content_fw">
                        房屋
                    </div>
                    <div class="full" v-show="xqgk_menutab===2?true:false" id="xqgk_content_qy">
                        企业
                    </div>
                </div>
                <!--执行/非执行网格比例 菜单-->
                <div class="xqgk_menu">
                    <div title="网格" class="xqgk_tab tab_on">
                        网格
                    </div>
                </div>
                <!--执行/非执行网格比例 统计-->
                <div class="xqgk_wg_content">
                    <div class="full">
                        <span style="display:inline-block;color:#93bdf6;">执行网格:</span><span
                            style="display:inline-block;color:#ffff00;">{{wg.zxwg}}</span>
                    </div>
                    <div class="full">
                        <span style="display:inline-block;color:#93bdf6;">非执行网格:</span><span
                            style="display:inline-block;color:#ffff00;">{{wg.fzxwg}}</span>
                    </div>
                    <div class="full">
                        <span style="display:inline-block;color:#93bdf6;">网格员数量:</span><span
                            style="display:inline-block;color:#ffff00;">{{wg.wgsum}}</span>
                    </div>
                </div>
                <!--男女网格员显示比例-->
                <div class="xqgk_nv">
                    <div class="n" :style='{width:wgyNWidth}'>
                    </div>
                    <div class="v" :style='{width:wgyVWidth}'>
                    </div>
                    <div class="n_bar">
                        <img src="../assets/imgs/blue_icon.png"
                             style="height:2vh; margin-top:1%;display: inline-block;float:left"/> <span
                            style="display: inline-block;float:left;">男（网格员）{{wgyN}}-{{wgyNWidth}}</span>
                    </div>
                    <div class="v_bar">
                        <img src="../assets/imgs/red_icon.png"
                             style="height:2vh; margin-top:1%;display: inline-block;float:right"/> <span
                            style="display: inline-block;float:right;">女（网格员）{{wgyV}}-{{wgyVWidth}}</span>
                    </div>
                </div>
            </div>
            <!--日常考核-->
            <div class="l_rckh">
                <div class="title">
                    <img src="../assets/imgs/icon.png" class="icon"/>&nbsp;
                    <span class="icon_title" style="">日常考核</span>
                </div>
                <div class="content" id="street_kaohe">
                </div>
                <div class="content" id="depart_kaohe">
                </div>
            </div>
        </div>
        <!--中-->
        <div class="center">
            <!--logo区域-->
            <div class="c_logo">
                     <span class="title">
                         海晏综合指挥平台({{orgname}})
                     </span>
            </div>
            <!--通知1-->
            <div class="c_nos">
                <div class="c_nos_left">
                    通知：
                </div>
                <div class="c_nos_right" style="text-align:left;">
                    <van-notice-bar left-icon="volume-o" :scrollable="false">
                        <van-swipe
                                vertical
                                class="notice-swipe"
                                :autoplay="3000"
                                :show-indicators="false"
                        >
                            <van-swipe-item style="height:3.6vh;line-height: 3.6vh;" v-for="(item,idx) in marqueeList"
                                            :key="idx"><a :title="item.title">{{item.title}}</a></van-swipe-item>
                        </van-swipe>
                    </van-notice-bar>
                </div>
            </div>
            <!--头部各个数值统计-->
            <div class="c_panner">
                <div @click="MarkerOntiandt('1')" class="c_panner_item" @mouseover="MoveOnCards($event)" @mouseout="MoveOutCards($event)">
                     <span class="c_panner_item_value">{{c_top_item_yjsj}}</span>
                     <span class="c_panner_item_name">一级事件</span>
                </div>
                <div @click="MarkerOntiandt('2')" class="c_panner_item" @mouseover="MoveOnCards($event)" @mouseout="MoveOutCards($event)">
                    <span class="c_panner_item_value yellow">{{c_top_item_ejsj}}</span>
                    <span class="c_panner_item_name yellow">二级事件</span>
                </div>
                <div class="c_panner_item" @mouseover="MoveOnCards($event)" @mouseout="MoveOutCards($event)">
                    <span class="c_panner_item_value blue">{{c_top_item_sjsj}}</span>
                    <span class="c_panner_item_name blue">三级事件</span>
                </div>
                <div class="c_panner_item" @mouseover="MoveOnCards($event)" @mouseout="MoveOutCards($event)">
                    <span class="c_panner_item_value green">{{c_top_item_wgzxl}}</span>
                    <span class="c_panner_item_name green">网格在线率</span>
                </div>
                <div class="c_panner_item" @mouseover="MoveOnCards($event)" @mouseout="MoveOutCards($event)">
                    <span class="c_panner_item_value white">{{c_top_item_sjgbl}}</span>
                    <span class="c_panner_item_name white">事件关闭率</span>
                </div>
                <div class="c_panner_item" @mouseover="MoveOnCards($event)" @mouseout="MoveOutCards($event)">
                    <span class="c_panner_item_value red">{{c_top_item_mfwgl}}</span>
                    <span class="c_panner_item_name red">满分网格率</span>
                </div>
            </div>
            <!--地图区域-->
            <div class="c_map">
                <!--地图组件-->
                <Tiandt ref="tiandt"/>
            </div>
            <!--底部各个数值统计-->
            <div class="c_bottom">
                <div class="c_bottom_item">
                        <img src="../assets/imgs/img_wgbs.png" class="c_bottom_item_img" />
                        <span class="c_bottom_item_name">未关闭数</span>
                        <span class="c_bottom_item_value">{{wgbs}}</span>
                </div>
                <div class="c_bottom_item">
                    <img src="../assets/imgs/img_yqs.png" class="c_bottom_item_img" />
                    <span class="c_bottom_item_name">逾期数</span>
                    <span class="c_bottom_item_value">{{yqs}}</span>
                </div>
                <div class="c_bottom_item">
                    <img src="../assets/imgs/img_ths.png" class="c_bottom_item_img" />
                    <span class="c_bottom_item_name">退回数</span>
                    <span class="c_bottom_item_value">{{ths}}</span>
                </div>
                <div class="c_bottom_item">
                    <img src="../assets/imgs/img_wzss.png" class="c_bottom_item_img" />
                    <span class="c_bottom_item_name">未在线数</span>
                    <span class="c_bottom_item_value">{{wzss}}</span>
                </div>
                <div class="c_bottom_item">
                    <img src="../assets/imgs/img_wqzs.png" class="c_bottom_item_img" />
                    <span class="c_bottom_item_name">未签注数</span>
                    <span class="c_bottom_item_value">{{wqzs}}</span>
                </div>
                <div class="c_bottom_item">
                    <img src="../assets/imgs/img_lqsjs.png" class="c_bottom_item_img" />
                    <span class="c_bottom_item_name">临期事件数</span>
                    <span class="c_bottom_item_value">{{lqsjs}}</span>
                </div>
                <div class="c_bottom_item">
                    <img src="../assets/imgs/img_zfwwcs.png" class="c_bottom_item_img" />
                    <span class="c_bottom_item_name" style="font-size:0.8rem;line-height: 2vh; ">月度走访任务未完成数</span>
                    <span class="c_bottom_item_value">{{ydzfwwcs}}</span>
                </div>
            </div>
        </div>
        <!--右-->
        <div class="right">
            <!--时间日期-->
            <div class="r_date">
                <img src="../assets/imgs/date_left_top.png" class="left_top"/>
                <img src="../assets/imgs/date_left_bottom.png" class="left_bottom"/>
                <img src="../assets/imgs/date_right_top.png" class="right_top"/>
                <img src="../assets/imgs/date_right_bottom.png" class="right_bottom"/>
                <div class="r_date_content">
                    <img class="logo" src="../assets/imgs/cal.png" style="height: 3vh;vertical-align: middle;"/>
                    <span style="text-indent: 20px;display: inline-block;font-weight:bolder;">{{nowdate}}</span>
                </div>
            </div>
            <!--今日事件-->
            <div class="r_jrsj">
                <div class="title">
                    <img src="../assets/imgs/icon.png" class="icon"/>&nbsp;
                    <span class="icon_title" style="">今日事件</span>
                </div>
                <div class="content">
                    <el-carousel height="27vh" arrow="always" indicator-position="none">
                        <el-carousel-item v-for="(item,index) in eventslist" :key="index" >
                             <div style="width:100%;height:27vh;float:left;position: relative; border-radius: 10px;cursor:pointer;">
                                 <el-image
                                         @click="showeventinfo(item.id)"
                                         style="width: 100%; height:27vh; border-radius: 10px; display: block;"
                                         :src="item.src"
                                 ></el-image>
                                 <div  style="cursor:pointer; position: absolute;height:30px;width:100%;background-color: black;bottom:0px;line-height: 30px;color:white; opacity: 0.8;">
                                     {{item.title}}
                                 </div>
                                 <div style="position:absolute;height:30px;width:160px;top:0px;left:0px;background-color: black;opacity: 0.8; line-height:30px; color:white;">
                                     {{item.date}}
                                 </div>
                             </div>
                            <!--<img src="../assets/imgs/img_1.jpg" style="width:100%;height:100%;"/>
                            <h3 style="display: block;height:30px;line-height:30px; position:absolute; background-color:black;color:white;">{{ item }}</h3>-->
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <!--问题聚焦-->
            <div class="r_wtjj">
                <div class="title">
                    <img src="../assets/imgs/icon.png" class="icon"/>&nbsp;
                    <span class="icon_title" style="">问题聚焦</span>
                </div>
                <div class="content" id="wtjj">

                </div>
            </div>
            <!--应用入口-->
            <div class="r_yyrk">
                <div class="title">
                    <img src="../assets/imgs/icon.png" class="icon"/>&nbsp;
                    <span class="icon_title" style="">应用入口</span>
                </div>
                <div class="content">
                    <div class="item">
                        <img src="../assets/imgs/zhzh.png"/>
                        <span class="txt">综合指挥</span>
                    </div>
                    <div class="item">
                        <img src="../assets/imgs/yjzh.png"/>
                        <span class="txt">应急指挥</span>
                    </div>
                    <div class="item">
                        <img src="../assets/imgs/slgc.png"/>
                        <span class="txt">雪亮工程</span>
                    </div>
                    <div class="item">
                        <img src="../assets/imgs/jwrh.png"/>
                        <span class="txt">警网融合</span>
                    </div>
                </div>
            </div>
        </div>
        <!--待办事件列表  弹出框-->
        <el-dialog  element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    title="待办事件"
                    :visible.sync="dbsjshow"
                    :modal="true"
                    :modal-append-to-body='false'
                    width="1000px" >
            <div style="height:700px;font-size:1.2rem;">
                <el-table
                        @row-click="dbsjrouter"
                        :data="dbsjlist"
                        height="700"
                        style="width: 100%">
                    <el-table-column
                            fixed="left"
                            prop="createtime"
                            label="上报时间"
                            width="160"
                    > </el-table-column>
                    <el-table-column
                            prop="c_number"
                            label="事件编号"
                            width="160"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="事件描述"
                            width="300"
                           >
                    </el-table-column>
                    <el-table-column
                            prop="orgname"
                            label="所属组织"
                            width="160"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="eventLevel"
                            label="事件级别"
                            width="100"
                          >
                    </el-table-column>
                    <el-table-column
                            prop="typename"
                            label="事件类型"
                            width="100"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                            width="100"
                            >
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            prop=""
                            data-id="id"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handledbsj(scope.$index, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!--待阅读通知公告 弹出框-->
        <el-dialog  element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    title="待阅读通知公告"
                    :visible.sync="tzggshow"
                    :modal="true"
                    :modal-append-to-body='false'
                    width="1000px" >
            <div style="height:700px;font-size:1.2rem;">
                <el-table
                        :data="tzgglist"
                        height="700"
                        style="width: 100%">
                    <el-table-column
                            fixed="left"
                            prop="createtime"
                            label="发布时间"
                            width="160"
                    > </el-table-column>
                    <el-table-column
                            prop="typename"
                            label="类型"
                            width="160"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="标题"
                            width="400"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="createdepart"
                            label="发布部门/发布人"
                            width="160"
                    >
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handletzgg(scope.$index, scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!--待办事件+通知公告详情 弹出框-->
        <el-dialog  element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :title="infotitle"
                    :visible.sync="infoshow"
                    :modal="true"
                    :modal-append-to-body='false'
                    width="1000px" >
            <iframe width="100%" height="700px" :src="infourl">
            </iframe>
        </el-dialog>
        <!--事件详情 弹出框-->
        <el-dialog  element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    title="事件详情"
                    :visible.sync="eventinfoshow"
                    :modal="true"
                    :modal-append-to-body='false'
                    width="1366px" >
            <iframe width="100%" height="600px" :src="eventinfourl">
            </iframe>
        </el-dialog>
        <!--视频 弹出框-->
        <el-dialog  element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    title="监控"
                    :visible.sync="videoshow"
                    :modal="true"
                    :modal-append-to-body='false'
                    width="800px" >
            <iframe width="100%" height="600px" :src="videourl">
            </iframe>
        </el-dialog>
    </div>
</template>
<script>
    import Tiandt from "../components/tiandt";
    //接口调用文件
    import index from '@/api/index';
    //接口配置文件
    import {Api} from '@/api/api';
    export default {
        name: "index",
        //引入子组件
        components: {
            Tiandt,
        },
        data(){
            return {
                datalist:{},
                screenWidth: document.body.clientWidth,
                screenHeight:document.body.clientHeight,
                dbsj: 15,//待办事件数
                dbsjlist:[
                    {
                        "id":"8a9335c87458af4e017475a7f4080f7a",
                        "c_number":"XTW202009100301",
                        "content":"“四无村”排查:今天早上网格长在小店门口进行矛盾纠纷排查，经排查未发现有矛盾纠纷。",
                        "orgname":"晓塘乡青山头村下陈",
                        "eventLevel":"一级事件",
                        "typename":"矛盾纠纷",
                        "status":"网格上报",
                        "createtime":"2020-09-10 09:36:14",
                    },
                    {
                        "id":"8a9335c77458bb0c017475a7b26c244c",
                        "c_number":"GQW202009100305",
                        "content":"今年是第七次全国人口普查",
                        "orgname":"高桥镇新庄村新庄自然村",
                        "eventLevel":"二级事件",
                        "typename":"其他",
                        "status":"网格上报",
                        "createtime":"2020-09-10 09:35:58",
                    },
                    {
                        "id":"8a9335c77458bb0c017475a7a0da243a",
                        "c_number":"XQW202009100204",
                        "content":"爱心企业走进向阳社区第五网格清水绿园“送清凉”慰问",
                        "orgname":"新碶街道向阳社区第五网格",
                        "eventLevel":"一级事件",
                        "typename":"党群工作",
                        "status":"网格上报",
                        "createtime":"2020-09-10 09:35:54",
                    },
                    {
                        "id":"xxxxxxxddd",
                        "c_number":"XBW202008091002",
                        "content":"事件描述",
                        "orgname":"所属组织",
                        "eventLevel":"1级事件",
                        "typename":"矛盾纠纷",
                        "status":"网格上报",
                        "createtime":"2020-08-09",
                    }
                ],//待办事件列表
                dbsjshow:false,//待办事件弹出是否
                tzgg: 10,//通知公告数
                tzgglist:[
                    {
                        "id":"8a9334cc74669781017471d1a067013d",
                        "typename":"日常公告-工作通知",
                        "title":"关于进一步完善全省“基层治理四平台” 系统组织及用户信息的通知",
                        "createdepart":"root",
                        "createtime":"2020-09-09 15:43:17",
                    },
                    {
                        "id":"8a9334cc74669781017471d1a067013d",
                        "typename":"日常公告-工作通知",
                        "title":"关于进一步完善全省“基层治理四平台” 系统组织及用户信息的通知",
                        "createdepart":"root",
                        "createtime":"2020-09-09 15:43:17",
                    },
                    {
                        "id":"8a9334cc74669781017471d1a067013d",
                        "typename":"日常公告-工作通知",
                        "title":"关于进一步完善全省“基层治理四平台” 系统组织及用户信息的通知",
                        "createdepart":"root",
                        "createtime":"2020-09-09 15:43:17",
                    }
                ],//通知公告列表
                tzggshow:false,//通知公告弹出是否
                infoshow:false,//待办事件+通知公告详情弹出是否
                infourl:"",//待办事件+通知公告详情url
                infotitle:"",//待办事件+通知公告弹出框标题
                xqgk_menutab: 0,//辖区概况menutab
                wgyN: 0,//男网格员数
                wgyV: 0,//女网格员数
                wgyNWidth:'0%',
                wgyVWidth:'0%',
                wg:{
                    zxwg:12,
                    fzxwg:12,
                    wgsum:24
                }, //执行网格/非执行网格数
                nowdate:'',//右上角日期显示
                chartsrk:null, //辖区概况下的人口统计
                chartfw:null, //辖区概况下的房屋统计
                chartqy:null, //辖区概况下的企业统计
                chartzjkh:null,//日常考核下的镇街考核统计
                chartznbmkh:null,//日常考核下的职能部门考核统计
                chartwtjj:null,//问题聚焦统计
                marqueeList: [
                    {
                        title: '1-关于规范基层市场监管组织用户管理的通知',
                        id: '1',
                        date: '2020-09-11 16:34:03'
                    },
                    {
                        title: '2-关于进一步完善全省“基层治理四平台” 系统组织及用户信息的通知',
                        id: '2',
                        date: '2020-09-09 15:43:17'
                    },
                    {
                        title: '3-浙基治办（2020）6号关于建立“基层治理四平台 ”功能迭代、任务下发和工作沟通等机制的通知',
                        id: '3',
                        date: '2020-09-09 15:34:25'
                    },

                ], //紧急通知
                c_top_item:'c_panner_item',//中间头部数值区域按钮未选中class
                c_top_item_yjsj:'3',//一级事件数
                c_top_item_ejsj:'29',//二级事件数
                c_top_item_sjsj:'14',//三级事件数
                c_top_item_wgzxl:'97%',//网格在线率
                c_top_item_sjgbl:'21%',//事件关闭率
                c_top_item_mfwgl:'97%',//满分网格率
                orgname:'海曙区',//组织名称,默认：招宝山街道
                orgid:'001001',  //组织id,默认：招宝山街道组织uid
                eventslist:[
                    {id:"8a9335c7709bfd980170c88c15b22161",createtime:"2020-09-15 14:54:00",title:"事件描述内容一",src:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2525576107,3579471363&fm=15&gp=0.jpg"},
                    {id:"8a9335c7709bfd980170c88c15b22161",createtime:"2020-09-15 14:54:00",title:"事件描述内容二",src:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2116973228,1421477263&fm=26&gp=0.jpg"},
                    {id:"8a9335c7709bfd980170c88c15b22161",createtime:"2020-09-15 14:54:00",title:"事件描述内容三",src:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=899052674,2044240737&fm=26&gp=0.jpg"},
                ], //今日事件list
                eventinfoshow:false,
                eventinfourl:"",
                videoshow:false,
                videourl:"",
                wtjjlist:[],
                wgbs:0,
                yqs:0,
                ths:0,
                wzss:0,
                wqzs:0,
                lqsjs:0,
                ydzfwwcs:0
            }
        },
        computed: {
            changewgynums() {
                const { wgyN, wgyV } = this
                return {
                    wgyN,
                    wgyV
                }
            },
        },
        watch:{
            changewgynums:{
                // eslint-disable-next-line no-unused-vars
                handler(newValue, oldValue) {
                    let total=newValue.wgyN+newValue.wgyV;
                    this.wgyNWidth=((newValue.wgyN/total)*100).toFixed(2)+"%";
                    this.wgyVWidth=((newValue.wgyV/total)*100).toFixed(2)+"%";
                },
                deep: true
            },
            /*根据视窗宽度自动调整图表*/
            // eslint-disable-next-line no-unused-vars
            screenWidth(val,newval){
                  //人口统计重绘
                  this.chartsrk.resize();
                  //房屋统计重绘
                  this.chartfw.resize();
                  //企业统计重绘
                  this.chartqy.resize();
                  //镇街考核统计重绘
                  this.chartzjkh.resize();
                  //职能部门统计重绘
                  this.chartznbmkh.resize();
                  //问题聚焦统计重绘
                  this.chartwtjj.resize();
            },
            /*根据视窗高度自动调整图表*/
            // eslint-disable-next-line no-unused-vars
            screenHeight(val,newval){
                //人口统计重绘
                this.chartsrk.resize();
                //房屋统计重绘
                this.chartfw.resize();
                //企业统计重绘
                this.chartqy.resize();
                //镇街考核统计重绘
                this.chartzjkh.resize();
                //职能部门统计重绘
                this.chartznbmkh.resize();
            }
        },
        async created() {
            //动态获取当前时间
            setInterval(this.getNow, 1000);
            // let {data:data1} = await index.fetchData_post(Api.test,{
            //     AreaId:'001'
            //     }
            // );
            // this.datalist=data1;


            //JSON.parse()
           //  console.log("++++++++++++data1:",JSON.stringify(data1));
           // console.log("++++++++++++datalist:",this.datalist);
           // console.log("++++++++++++datalist.areaCode:",this.datalist.areaCode);
           // this.bigScreenList = eventslist;
        },
        mounted() {
            //将vue方法转换为js原生方法
            let _this = this;
            //将vue申明的方法复制给原生js方法，用于onclick方式原生调用
            //cleareventinfo方法用于子iframe，事件详情页调用父方法来关闭当前事件详情弹窗
            window.cleareventinfo = _this.cleareventinfo;
            console.log("+++++++++++++window.cleareventinfo:",window.cleareventinfo);


            window.showvideo = _this.showvideo;
            console.log("+++++++++++++window.showvideo:",window.showvideo);
            this.getNow();

            //绑定待办事件
            this.binddbsj();


            //绑定人口
            this.bindrk();
            //绑定房屋
            this.bindfw();
            //绑定企业
            this.bindqy();
            //绑定网格
            this.bindwg();

            //绑定镇街考核
            this.bindStreetkh();
            //绑定职能部门考核
            this.bindDepartkh();
            //绑定头部6项关键指标
            this.bindgjzb();
            //绑定底部日常提醒
            this.bindrctx();
            //绑定今日事件
            this.bindjrsj();


            //绑定问题聚焦
            this.bindwtjj();
            //视窗size改变后重新赋值长宽
            const that = this;
            window.onresize = () => {
                window.screenWidth = document.body.clientWidth;
                window.screenHeight = document.body.clientHeight;
                that.screenWidth = window.screenWidth;
                that.screenHeight= window.screenHeight;

            };
            //初始化画镇街行政区划
            this.$refs.tiandt.initmap(this.orgid,this.orgname);
        },
        methods:{
            getNow(){
                let date = new Date()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let week=date.getDay()
                if (month < 10) {
                    month = '0' + month
                }
                if (day < 10) {
                    day = '0' + day
                }
                let hh = date.getHours()
                let mm = date.getMinutes()
                let ss = date.getSeconds()
                if (hh < 10) {
                    hh = '0' + hh
                }
                if (mm < 10) {
                    mm = '0' + mm
                }
                if (ss < 10) {
                    ss = '0' + ss
                }
                let weekName="";
                switch (week) {
                    case 0:
                        weekName="星期日";
                        break;
                    case 1:
                        weekName="星期一";
                        break;
                    case 2:
                        weekName="星期二";
                        break;
                    case 3:
                        weekName="星期三";
                        break;
                    case 4:
                        weekName="星期四";
                        break;
                    case 5:
                        weekName="星期五";
                        break;
                    case 6:
                        weekName="星期六";
                        break;
                    default:
                        break;
                }
                this.nowdate=date.getFullYear() + '-' + month + '-' + day+ ' ' + hh+ ':' + mm+ ':' + ss+' '+weekName
            },
            //辖区概况切换
            showxqgk(e,i){
               // e.currentTarget.classList.add('tab_on');
                this.xqgk_menutab=i;
            },
            //绑定通知公告
            async bindtzgg(){
                this.tzgg=0;
                this.tzgglist=[];
                //  //调用通知公告接口
                //  let {data:tzggdata} = await index.fetchData_get(Api.dpzj.dydtz,
                //      {"orgcode":this.orgid});
                //
                //  // eslint-disable-next-line no-console
                //  console.log("+++++获取到的人口数据：",rkdata)
                //  let datalist=tzggdata;
                //  this.tzgg=datalist.length;
                //  this.tzgglist=datalist;
            },
            //绑定待办事件
            async binddbsj(){
                this.dbsj=0;
                this.dbsjlist=[];
                //  //调用待办事件接口
                //  let {data:dbsjdata} = await index.fetchData_get(Api.dpzj.dbsj,
                //      {"orgcode":this.orgid});
                //
                //  // eslint-disable-next-line no-console
                //  console.log("+++++获取到的人口数据：",rkdata)
                //  let datalist=dbsjdata;
                //  this.dbsj=datalist.length;
                //  this.dbsjlist=datalist;
            },
            //绑定人口数据
            async bindrk() {
                let data1 = [
                    {value: 0, name: '境外人员'},
                    {value: 0, name: '外来人员'},
                    {value: 0, name: '户籍人口'}
                ];
                let data2 = [
                    {value: 0, name: '骨干对象'},
                    {value: 0, name: '服务对象'},
                    {value: 0, name: '管控对象'},
                ];

                 //人口数据
                 let {data:rkdata} = await index.fetchData_get(Api.dpzj.rk,
                     {"orgcode":this.orgid});

                 // eslint-disable-next-line no-console
                 console.log("+++++获取到的人口数据：",rkdata)
                 let datalist=rkdata;


                data1.forEach(item=>{
                   if(item.name=="境外人员"){
                       item.value=datalist[0].jwry;

                   }
                   else if(item.name=="外来人员"){
                       item.value=datalist[0].wlry;
                   }
                   else if(item.name=="户籍人口"){
                       item.value=datalist[0].hjrk;
                   }
                });

                data2.forEach(item=>{
                    if(item.name=="骨干对象"){
                        item.value=datalist[0].ggdx;
                    }
                    else if(item.name=="服务对象"){
                        item.value=datalist[0].fwdx;
                    }
                    else if(item.name=="管控对象"){
                        item.value=datalist[0].gkdx;
                    }
                });
                console.log("[人口]++++处理后的data1:",data1);

                this.$nextTick(() => {
                    //辖区概况-人口
                    let echarts = require('echarts');
                    // 基于准备好的dom，初始化echarts实例
                    this.chartsrk = echarts.init(document.getElementById('xqgk_content_rk'));
                    // 绘制图表
                    this.chartsrk.setOption(
                        {
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b}: {c} ({d}%)'
                            },
                            legend: [
                                {
                                    orient: 'vertical',
                                    x: 'left',
                                    y: 'center',
                                    textStyle: {
                                        color: '#fff',
                                    },
                                    tooltip: {
                                        show: true,
                                        formatter: function (param) {
                                            // eslint-disable-next-line no-console
                                            console.log('++++++++++tooltip:', param);
                                            return param.name;
                                        }
                                    },
                                    formatter: function (param) {
                                        return param;
                                    },
                                    data: ['境外人员', '外来人员', '户籍人口']
                                },
                                {
                                    orient: 'vertical',
                                    x: 'right',
                                    y: 'center',
                                    textStyle: {
                                        color: '#fff',
                                    },
                                    data: ['骨干对象', '服务对象', '管控对象']
                                }
                            ],
                            series: [
                                {

                                    name: '户籍划分',
                                    type: 'pie',
                                    selectedMode: 'single',
                                    radius: [0, '40%'],
                                    top: 10,
                                    left: 'center',
                                    label: {
                                        show: true,
                                        formatter: '{c}',
                                        position: 'inside'
                                    },
                                    data: data1
                                    /*data: [
                                        {value: 100, name: '境外人员'},
                                        {value: 379, name: '外来人员'},
                                        {value: 700, name: '户籍人口'}
                                    ]*/
                                },
                                {
                                    name: '对象管理',
                                    type: 'pie',
                                    selectedMode: 'single',
                                    radius: ['55%', '75%'],
                                    top: 10,
                                    left: 'center',
                                    label: {
                                        show: true,
                                        formatter: '{b}:{c}',
                                        position: 'outside'
                                    },
                                    data: data2
                                    /* data: [
                                         {value: 300, name: '骨干对象'},
                                         {value: 679, name: '服务对象'},
                                         {value: 200, name: '管控对象'},
                                     ]*/
                                }
                            ]
                        }
                    );
                });
            },
            //绑定房屋数据
            async bindfw() {

                let data1 = [0, 0, 0];


               //调用房屋
                data1=[];
                let {data:fwdata} = await index.fetchData_get(Api.dpzj.fw,
                         {"orgcode":this.orgid});
                let datalist=fwdata;



                data1.push(datalist[0].fw);
                data1.push(datalist[0].wf);
                data1.push(datalist[0].czf);

                console.log("[房屋]++++++++++data1:",data1);

                this.$nextTick(() => {
                    //辖区概况-人口
                    let echarts = require('echarts');
                    // 基于准备好的dom，初始化echarts实例
                    this.chartfw = echarts.init(document.getElementById('xqgk_content_fw'));
                    // 绘制图表
                    this.chartfw.setOption(
                        {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                data: ['房屋', '危房', '出租房']
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                top: '3%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'value',
                                nameTextStyle: {
                                    color: '#94d4f8',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#94d4f8',
                                        fontSize: 10,
                                    }
                                }
                            },
                            yAxis: {
                                type: 'category',
                                nameTextStyle: {
                                    color: '#94d4f8',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#94d4f8',
                                        fontSize: 14,
                                    }
                                },
                                data: ['房屋', '危房', '出租房']
                            },
                            series: {
                                name: '房屋统计',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    show: true,
                                    formatter: '{c}',
                                    color:'#ffffff',
                                    position: 'right'
                                },
                                data: data1
                            },
                        }
                    );
                });
            },
            //绑定企业数据
            async bindqy() {
                let data1 = [0, 0, 0];


               // 调用企业
                data1=[];
                let {data:qydata} = await index.fetchData_get(Api.dpzj.qy,
                              {"orgcode":this.orgid});
                let datalist=qydata;
                data1.push(datalist[0].sszt);
                data1.push(datalist[0].jgdw);
                data1.push(datalist[0].shzt);

                console.log("[企业]++++++++++data1:",data1);

                this.$nextTick(() => {
                    //辖区概况-人口
                    let echarts = require('echarts');
                    // 基于准备好的dom，初始化echarts实例
                    this.chartqy = echarts.init(document.getElementById('xqgk_content_qy'));
                    // 绘制图表
                    this.chartqy.setOption(
                        {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                data: ['商事主体', '机关单位', '社会组织']
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                top: '3%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'value',
                                nameTextStyle: {
                                    color: '#94d4f8',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#94d4f8',
                                        fontSize: 10,
                                    }
                                }
                            },
                            yAxis: {
                                type: 'category',
                                nameTextStyle: {
                                    color: '#94d4f8',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#94d4f8',
                                        fontSize: 14,
                                    }
                                },
                                data: ['商事主体', '机关单位', '社会组织'],
                            },
                            series: {
                                name: '企业统计',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    show: true,
                                    formatter: '{c}',
                                    color:'#ffffff',
                                    position: 'right'
                                },
                                data: data1
                            },
                        }
                    );
                });
            },
            //绑定网格数据
            async bindwg(){

                //调用网格数据接口
                let {data:wgdata} = await index.fetchData_get(Api.dpzj.wg,
                              {"orgcode":this.orgid});
                let datalist=wgdata;
                this.wg.zxwg=datalist[0].zxwgs;
                this.wg.fzxwg=datalist[0].fzxwgs;
                this.wg.wgsum=datalist[0].wgysl;

                this.wgyN=datalist[0].male===null?0:datalist[0].male;
                this.wgyV=datalist[0].female===null?0:datalist[0].female;
            },
            //绑定镇街考核
            async bindStreetkh() {

                let data1 = [60, 73, 85, 40, 90];


                // data1=[]
                // let {data:wxzbdata} = await index.fetchData_get(Api.dpzj.wxzb,
                //               {"orgcode":this.orgid});
                // let datalist=wxzbdata;
                // data1.push(datalist.wgcq);
                // data1.push(datalist.lxbz);
                // data1.push(datalist.xxdb);
                // data1.push(datalist.czzl);
                // data1.push(datalist.yxsj);
                // console.log("[镇街考核]++++++++++data1:",data1);

                this.$nextTick(() => {
                    //日常考核-镇街考核
                    let echarts = require('echarts');
                    // 基于准备好的dom，初始化echarts实例
                    this.chartzjkh = echarts.init(document.getElementById('street_kaohe'));
                    // 绘制图表
                    this.chartzjkh.setOption({
                        title: {
                            text: '五项指标',
                            textStyle: {
                                color: '#cf3c80',
                            },
                            // 分别设置四个方向的内边距
                            padding: [
                                10,  // 上
                                10, // 右
                                5,  // 下
                                10, // 左
                            ]
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        // legend: {
                        //     data: ['镇街考核']
                        // },
                        // radar: {
                        //     // shape: 'circle',
                        //     name: {
                        //         textStyle: {
                        //             color: '#98d4f6',
                        //             //backgroundColor: '#999',
                        //             borderRadius: 3,
                        //             padding: [0, 0]
                        //         }
                        //     },
                        //     indicator: [
                        //         { name: '网格出勤', max: 100},
                        //         { name: '类型标注', max: 100},
                        //         { name: '信息对比', max: 100},
                        //         { name: '处置质量', max: 100},
                        //         { name: '有效事件', max: 100}
                        //     ],
                        //     splitArea: {
                        //         areaStyle: {
                        //             color: ['rgba(114, 172, 209, 0.2)',
                        //                 'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                        //                 'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
                        //             shadowColor: 'rgba(0, 0, 0, 0.3)',
                        //             shadowBlur: 10
                        //         }
                        //     },
                        //     radius: '60%',
                        //     center: ['50%', '60%'],
                        //
                        // },
                        radar: {
                            name: {
                                textStyle: {
                                    color: '#98d4f6',
                                    //backgroundColor: '#999',
                                    borderRadius: 3,
                                    padding: [0, 0]
                                }
                            },
                            indicator: [
                                {text: '网格出勤', max: 100},
                                {text: '类型标注', max: 100},
                                {text: '信息对比', max: 100},
                                {text: '处置质量', max: 100},
                                {text: '有效事件', max: 100},
                            ],
                            splitArea: {
                                areaStyle: {
                                    color: ['rgba(114, 172, 209, 0.2)',
                                        'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                                        'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
                                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                                    shadowBlur: 10
                                }
                            },
                            center: ['50%', '60%'],
                            radius: '60%',
                        },
                        series: {
                            type: 'radar',
                            tooltip: {
                                trigger: 'item'
                            },
                            areaStyle: {},
                            data: [
                                {
                                    value: [60, 73, 85, 40, 90],
                                    name: '五项指标指数'
                                }
                            ]
                        },
                    });

                });
            },
            //绑定职能部门考核
            async bindDepartkh() {
                let bjsxdata = [150, 212, 201, 154, 190, 330, 410];
                let bjzldata = [220, 182, 191, 234, 290, 330, 310];
                let wgmydata = [120, 132, 101, 134, 90, 230, 210];
                let departdata = ['党政办', '发展服务办', '综合治理办', '社会服务管理办', '综合指挥室', '财政管理办', '市场监督办'];

                bjsxdata=[]
                bjzldata=[];
                wgmydata=[];
                departdata=[];
                //调用职能部门考核
                let {data:znbmkhdata} = await index.fetchData_get(Api.dpzj.kh,
                              {"orgcode":this.orgid});
                let datalist=znbmkhdata;

                datalist.map(item=>{
                    let obj={...item};
                    departdata.push(obj.departname);
                    bjsxdata.push(obj.bjsx.toString().substring(0,2));
                    bjzldata.push(obj.bjzl.toString().substring(0,2));
                    wgmydata.push(obj.wgmy.toString().substring(0,2));
                });


                this.$nextTick(() => {
                    // let colors = ['#5793f3', '#d14a61', '#675bba'];
                    //日常考核-职能部门考核）
                    let echarts = require('echarts');
                    // 基于准备好的dom，初始化echarts实例
                    this.chartznbmkh = echarts.init(document.getElementById('depart_kaohe'));
                    // 绘制图表（职能部门考核）
                    this.chartznbmkh.setOption({
                        title: {
                            text: '科室评估',
                            textStyle: {
                                color: '#8cedff',
                            },
                            // 分别设置四个方向的内边距
                            padding: [
                                10,  // 上
                                10, // 右
                                5,  // 下
                                10, // 左
                            ]
                        },
                        legend: {
                            type: 'scroll',
                            left: '30%',
                            width: '65%',
                            orient: 'horizontal',
                            data: ['办结时限', '办结质量', '网格满意'],
                            top: 2,
                            // 设置文本为红色
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        xAxis: {
                            type: 'category',
                            nameTextStyle: {
                                color: '#94d4f8',
                                fontStyle: 'normal',
                                fontSize: 12,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#94d4f8',
                                    fontSize: 12,
                                }
                            },
                            data: departdata
                        },
                        yAxis: {
                            type: 'value',
                            nameTextStyle: {
                                color: '#94d4f8',
                                fontStyle: 'normal',
                                fontSize: 12,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#94d4f8',
                                    fontSize: 10,
                                }
                            }
                        },
                        grid: {
                            x: '15%',
                            y: '23%',
                            width: '80%',
                            height: '60%'
                        },
                        series: [
                            {
                                name: '办结时限',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    show: true,
                                    position: 'inside'
                                },
                                data: bjsxdata
                            },
                            {
                                name: '办结质量',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    show: true,
                                    position: 'inside'
                                },
                                data: bjzldata
                            },
                            {
                                name: '网格满意',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    show: true,
                                    position: 'inside'
                                },
                                data: wgmydata
                            }

                        ]
                    });
                });
            },
            //绑定头部6项关键指标
            async bindgjzb(){
                //调用6项关键指标
                let {data:gjzbdata} = await index.fetchData_get(Api.dpzj.gjzb,
                    {"orgcode":this.orgid});
                let datalist=gjzbdata;

                this.c_top_item_yjsj=datalist[0].OneEventNums;
                this.c_top_item_ejsj=datalist[0].twoEventNums;
                this.c_top_item_sjsj=datalist[0].threeEventNums;
                this.c_top_item_wgzxl=((datalist[0].wgzxl)*100).toString().substring(0,4)+"%";
                this.c_top_item_sjgbl=((datalist[0].sjgbl)*100).toString().substring(0,4)+"%";
                this.c_top_item_mfwgl=((datalist[0].mfwgl)*100).toString().substring(0,4)+"%";

            },
            //绑定底部7项指标
            async bindrctx(){
                //调用6项关键指标
                let {data:rctxdata} = await index.fetchData_get(Api.dpzj.rctx,
                    {"orgcode":this.orgid});
                let datalist=rctxdata;

                this.wgbs=datalist[0].wgbs==null?0:datalist[0].wgbs;
                this.yqs=datalist[0].yqs==null?0:datalist[0].yqs;
                this.ths=datalist[0].ths==null?0:datalist[0].ths;
                this.wzss=datalist[0].wzss==null?0:datalist[0].wzss;
                this.wqzs=datalist[0].wqzs==null?0:datalist[0].wqzs;
                this.lqsjs=datalist[0].lqsjs==null?0:datalist[0].lqsjs;
                this.ydzfwwcs=datalist[0].ydzfwwcs==null?0:datalist[0].ydzfwwcs;
            },
            //绑定今日事件
            async bindjrsj(){
                //调用今日事件
                let {data:jrsjdata} = await index.fetchData_get(Api.dpzj.topevents,
                    {"orgcode":this.orgid});
                let datalist=jrsjdata;
                this.eventslist=[];
              //  this.eventslist=datalist;


                if(datalist.length>=5){
                      for(let i=0;i<5;i++){
                          this.eventslist.push(datalist[i]);
                      }
                }
                else{
                    for(let i=0;i<datalist.length;i++){
                        this.eventslist.push(datalist[i]);
                    }
                }
                //console.log("+++++++++eventslist:",this.eventslist);
                let j=0;
                this.eventslist.forEach(item=>{
                  item.src=item.imgurl;
                });
            },
            //绑定问题聚焦
            async bindwtjj(){

                let that=this;

                let data1=[
                    {value: 200, name: '排摸湖北籍人员'},
                    {value: 335, name: '电瓶车充电'},
                    {value: 310, name: '拆迁问题'},
                    {value: 170, name: '精神病异常'},
                    {value: 235, name: '健身器材损坏'},
                    {value: 400, name: '施工扰民'}
                    ];


                // //调用问题聚焦
                // data1=[];
                // let {data:wtjjdata} = await index.fetchData_get(Api.dpzj.wtjj,
                //               {"orgcode":this.orgid});
                // let datalist=wtjjdata;
                //
                // datalist.map(item=>{
                //     let obj={...item};
                //     wtjjlist.push(obj);
                //     data1.push({
                //      value: obj.value, name: obj.name
                //     });
                //
                //
                //
                //
                // });

                this.$nextTick(()=> {

                    // let colors = ['#5793f3', '#d14a61', '#675bba'];
                    //日常考核-职能部门考核）
                    let echarts = require('echarts');
                    // 基于准备好的dom，初始化echarts实例
                    this.chartwtjj = echarts.init(document.getElementById('wtjj'));
                    // 绘制图表（职能部门考核）
                    this.chartwtjj.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },

                        visualMap: {
                            show: false,
                            min: 80,
                            max: 600,
                            inRange: {
                                colorLightness: [0, 1]
                            }
                        },
                        color:['#d56e6b','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                        series: [
                            {
                                name: '问题聚焦',
                                type: 'pie',
                                radius: '75%',
                                center: ['50%', '50%'],
                                data: data1.sort(function (a, b) { return a.value - b.value; }),
                                roseType: 'radius',
                                label: {
                                    color: '#fff',
                                    fontSize:14
                                },
                                labelLine: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    },
                                    smooth: 0.2,
                                    length: 10,
                                    length2: 20
                                },
                                // itemStyle: {
                                //     color: '#c23531',
                                //     shadowBlur: 200,
                                //     shadowColor: 'rgba(0, 0, 0, 0.5)'
                                // },
                                animationType: 'scale',
                                animationEasing: 'elasticOut'
                            }
                        ]
                    });
                    this.chartwtjj.on('click', function (params) {
                        // console.log("+++++++++++++++params:",params);
                        // let item=that.wtjjlist.find((item) => item.name == params.name);
                        // console.log("+++++++++++++++查找到的问题聚焦id:",item);
                        // console.log("+++++++++++++++params.name：",params.name);
                        //console.log("+++++++++++++++params.seriesName：",params.seriesName);
                    });
                });
            },
            //中部区域头部数值按钮鼠标移上
            MoveOnCards(e){
                e.currentTarget.classList.add('c_panner_item_on');
            },
            //中部区域头部数值按钮鼠标移出
            MoveOutCards(e){
                e.currentTarget.classList.remove('c_panner_item_on');
            },
            MarkerOntiandt(type){
                let typename='一级事件';
                let iconcolor='#ff0000';
                let MarkerList=[];
                if(type==='1'){
                    typename='一级事件';
                    iconcolor='#dd675b';
                    MarkerList=[{
                        x:'121.711913',
                        y:'29.9546517',
                        title:'['+typename+']事件一',
                        content:'事件一内容描述',
                        iconColor:iconcolor
                    },{
                        x:'121.715475',
                        y:'29.959029',
                        title:'['+typename+']事件二',
                        content:'事件二内容描述',
                        iconColor:iconcolor
                    }];
                }
                else if(type==='2'){
                    typename='二级事件';
                    iconcolor='#ffd622';
                    MarkerList=[{
                        x:'121.7101106',
                        y:'29.9660671',
                        title:'['+typename+']事件一',
                        content:'事件一内容描述',
                        iconColor:iconcolor
                    },{
                        x:'121.7089519',
                        y:'29.9599303',
                        title:'['+typename+']事件二',
                        content:'事件二内容描述',
                        iconColor:iconcolor
                    }];
                }
                else if(type==='3'){
                    typename='三级事件';
                    iconcolor='#08c7f1';
                }

                // 调用天地图子组件中的方法
               // this.$refs.tiandt.setmarker(MarkerList);


                this.$refs.tiandt.changeThemeEvent("90ff1917-9560-4ec1-a0d6-184326e1af6d","");
            },
            //点击待办事件弹出框
            showdbsj(){
                this.dbsjshow=true;
            },
            //待办事件列表表格行点击事件
            dbsjrouter(row, column, event){
                console.log("选中行的id：",row.id);
            },
            //待办事件点击
            handledbsj(index, row) {
                this.infoshow=true;
                this.infotitle="事件详情 ";
                this.infourl="";
                // console.log()
               // /grid/event/show?id=8a9335c87458af4501747ae898bb11ac&flag=all
                this.infourl="http://10.19.181.153/grid/event/show?id="+row.id+"&random="+Math.floor(Math.random()*450001);
            },
            //待阅读通知公告弹出框
            showtzgg(){
                this.tzggshow=true;
            },
            //待阅读通知公告点击
            handletzgg(index, row) {
                this.infoshow=true;
                this.infotitle="公告详情";
                this.infourl="";
                this.infourl="http://10.19.181.153/grid/notice/f.show?id="+row.id+"&random="+Math.floor(Math.random()*450001);
            },
            //显示事件详情
            showeventinfo(obj){
                this.eventinfourl="";
                this.eventinfourl="http://10.68.129.154:8119/pages/ZJDPEventDetail.html?id="+obj+"&isShow=1&areaCode="+this.orgid+"&random="+Math.floor(Math.random()*450001)+"";
                this.eventinfoshow=true;
            },
            //关闭事件详情弹出框
            cleareventinfo(){
                this.eventinfourl="";
                this.eventinfoshow=false;

                this.$refs.tiandt.cleareventinfo();
                console.log("+++++++++成功调用父方法");
            },
            //显示视频流
            async showvideo(channelId){


               console.log("++++++++++获取到的视频channelId：",channelId);

                let videodata = await index.fetchData_get(Api.video+"?id="+channelId,null);
                let data1= JSON.parse(JSON.parse(videodata));

               console.log("++++++++++获取到的视频流videodata：",videodata);

                this.videourl="http://10.68.129.154:8119/pages/Childs/PulmonitisProblem/video.html?url="+encodeURIComponent(data1.url);
                this.videoshow=true;
            }
        }
    }
</script>
<style>
    .el-dialog{
        display: flex;
        flex-direction: column;
        margin:0 !important;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        /*height:600px;*/
        max-height:calc(100% - 30px);
        max-width:calc(100% - 30px);

    }

    .el-table{
        font-size: 0.9rem !important;
    }

    .el-dialog, .el-page li{
        background-color: #2c3e50 !important;
    }
    .el-dialog__title{
        color:white !important;
    }
    .el-dialog__body{
        padding: 10px 10px !important;
    }
</style>
<style lang="scss" scoped>
    /*  $menuBackColor: #ffffff;
        $menuListH2: #f3f7fa;*/
    /*浮动统一模块*/
    @mixin float($float:left,$width:0vw,$height:100vh,$margin-left:1vw) {
        float: $float;
        width: $width;
        height: $height;
        margin-left: $margin-left;
    }
    /*wh:100 模块*/
    @mixin parent {
        width: 100vw;
        height: 100vh;
    }
    .van-notice-bar{
        height:3.6vh !important;
        line-height: 3.6vh !important;
        padding: 0px !important;
        background-color: inherit !important;
    }
    .notice-swipe{
        height:3.6vh;
        line-height: 3.6vh;
        font-size: 1.1rem;
        text-indent: 5px;
    }
    .el-carousel__item{
        border-radius: 10px !important;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        border-radius: 10px !important;
        background-color: inherit !important;
    }
    .el-carousel__item:nth-child(2n+1) {
        border-radius: 10px !important;
        background-color: inherit !important;
    }
    .main {
        @include parent;
        background-color: #00011c;
        color: #8bedff;
        font-size: 1rem;
        overflow: hidden;
    }
    .left {
        @include float($width: 24vw);
    }
    .l_tip {
        width: 24vw;
        height: 5vh;
        line-height: 5vh;
        border: solid 1px #ffff33;
        margin-top: 2vh;
        border-radius: 5px;
        box-shadow: 0px 0px 1px 1px #ffff33 inset;
        .l_span {
            display: inline-block;
            width: 30%;
            height: 5vh;
            color: #91bbf4;
            font-weight: bolder;
        }
        .l_spannum {
            display: inline-block;
            width: 15%;
            height: 100%;
            color: #ffff00;
            font-weight: bolder;
            font-size: 1.2rem;
            cursor:pointer;
        }
    }
    .l_xqgk{
        width: 24vw;
        height: 41vh;
        margin-top: 1vh;
        .title{
            text-align: left;
            line-height:4vh;
            height:4vh;
            background-color: #1a1927;
            opacity: 0.8;
            border-radius: 5px;
        }
        .icon {
            height: 4vh;
            display: inline-block;
            float: left;
            margin-left: 10px;
            margin-right: 10px;
        }
        .icon_title {
            display: inline-block;
            height: 4vh;
            line-height: 4vh;
            font-size: 1.1rem;
            font-weight: bolder;
        }
        .xqgk_menu{
            height: 3vh;
            width:100%;
            line-height: 3vh;
            background-color: #0b1932;
            margin-top: 1vh;
        }
        .xqgk_tab{
            float:left;
            width:31.5%;
            height:2.8vh;
            margin-left: 0.2vw;
            border:solid 1px #30566d;
            text-align: center;
            color:#7498c9;
            font-size: 0.8rem;
            font-weight: bolder;
            cursor: pointer;
        }
        .xqgk_content{
            width:100%;
            height:19vh;
            margin-top:5px;
            .full{
                width:24vw;
                height:19vh;
            }
        }
        .xqgk_wg_content{
            width:100%;
            margin-top:1vh;
            height: 2.8vh;
            line-height: 2.8vh;
            .full{
                width:32%;
                margin-left: 0.28vw;
                height: 2.8vh;
                line-height: 2.8vh;
                float:left;
                text-align: center;
                background-color: #162740;
                font-size: 0.7rem;
            }
        }
        .xqgk_nv{
            width:100%;
            margin-top:1vh;
            height: 2.6vh;
            line-height: 2.6vh;
            background-color: #2c3e50;
            .n{
                float:left;
                height: 2.6vh;
                background-color: #0066ff;
            }
            .v{
                float:left;
                height: 2.6vh;
                background-color: #cc3399;
            }
            .n_bar{
                float:left;
                height: 2.6vh;
                width:50%;
                line-height: 2.6vh;
                text-align: left;
                font-size: 0.6rem;
            }
            .v_bar{
                float:left;
                height: 2.6vh;
                width:50%;
                line-height: 2.6vh;
                text-align: right;
                font-size: 0.6rem;
            }
        }
    }
    .tab_on{
        color: black;
        background-color: #8bedff;
    }
    .l_rckh{
        width: 24vw;
        height: 49vh;
        margin-top: 1vh;
        .title{
            text-align: left;
            line-height:4vh;
            height:4vh;
            background-color: #1a1927;
            opacity: 0.8;
            border-radius: 5px;
        }
        .icon {
            height: 4vh;
            display: inline-block;
            float: left;
            margin-left: 10px;
            margin-right: 10px;
        }
        .icon_title {
            display: inline-block;
            height: 4vh;
            line-height: 4vh;
            font-size: 1.1rem;
            font-weight: bolder;
        }
        .content{
            width: 24vw;
            height: 21vh;
            margin-top: 1vh;
            background-color: #0a1930;
        }
    }
    .center {
        @include float($width: 48vw);
    }
    .c_logo{
        width:48vw;
        height:8vh;
        margin-top: 1vh;
        background:url(../assets/imgs/logo_templete.png) no-repeat;
        background-size:100% 100%;
        text-align: center;
        position: relative;
        .title{
            position: absolute;
            width:42vw;
            height: 6vh;
            line-height: 5vh;
            display: block;
            margin-left: 3vw;
            margin-top: 1vh;
            font-size: 2rem;
        }
    }
    .c_nos{
        width:48vw;
        height: 3.6vh;
        line-height: 3.6vh;
        .c_nos_left{
            float:left;
            text-align: right;
            width: 4vw;
            height: 3.6vh;
            color:#019bc1;
            font-weight: bolder;

        }
        .c_nos_right{
            float:left;
            text-align: right;
            width: 43vw;
            height: 3.6vh;
            color:#019bc1;
            a{
                font-size: 0.9rem;
            }
        }
    }
    .c_panner{
        width:48vw;
        height:7vh;
        margin-top: 1vh;
        .c_panner_item{
            float:left;
            width:7.2vw;
            height:7vh;
            margin-left: 0.7vw;
            cursor:pointer;
            background: url(../assets/imgs/empty.png) no-repeat;
            background-size: 100% 100%;
            .c_panner_item_value{
                display: block;
                height:4vh;
                line-height: 4vh;
                text-align: center;
                color:#de685a;
                font-size: 1.3rem;
                font-weight: bolder;
            }
            .c_panner_item_name{
                display: block;
                height:3vh;
                line-height: 3vh;
                text-align: center;
                color:#de685a;
                font-size: 0.9rem;
                font-weight: bolder;
            }

            .yellow{
                color:#ffd725;
            }
            .blue{
                color:#08c7f1;
            }
            .green{
                color:#7fcc5a;
            }
            .white{
                color:#fefefe;
            }
            .red{
                color:#cc3499;
            }
        }
        .c_panner_item_on{
            background: url(../assets/imgs/moveon.png) no-repeat;
            background-size: 100% 100%;
        }
    }
    .c_map{
        width:48vw;
        height:58vh;
        margin-top: 2vh;
        background-color: #2c3e50;
        border-radius: 5px;
        box-shadow: 0px 1px 10px 5px #f2f5f6;
    }
    .c_bottom{
        width:48vw;
        height:17vh;
        margin-top: 1vh;

        .c_bottom_item{
            float:left;
            width:6.3vw;
            height: 14vh;
            margin-left: 0.5vw;
            margin-top:1.5vh;
            background-color: inherit;

            opacity: 0.7;
            border-radius: 5px;
            box-shadow:0px 2px 30px 2px #ffffff;
            .c_bottom_item_img{
                width: 3vw;
                margin-left:1.6vw;
                margin-top: 1.4vh;
                display: block;
                box-shadow: 1px 2px 10px 5px #ffffff;
                border-radius: 10px;
            }
            .c_bottom_item_name{
                display: block;
                width: 6vw;
                height: 3vh;
                line-height: 3vh;
                text-align: center;
                font-size: 0.9rem;
            }
            .c_bottom_item_value{
                display: block;
                width: 6vw;
                height: 4vh;
                line-height: 4vh;
                text-align: center;
                font-weight: bolder;
                font-size: 1.2rem;
                cursor: pointer;

            }

        }
    }
    .right {
        @include float($width: 24vw);
    }
    .r_date{
        position: relative;
        width: 24vw;
        height: 5vh;
        line-height: 5vh;
        margin-top: 2vh;
        .left_top{
            position: absolute;
            width:5%;
            display: block;
            top:0px;
            left:0px;
        }
        .left_bottom{
            position: absolute;
            width:5%;
            display: block;
            bottom:0px;
            left:0px;
        }
        .right_top{
            position: absolute;
            width:5%;
            display: block;
            top:0px;
            right:0px;
        }
        .right_bottom{
            position: absolute;
            width:5%;
            display: block;
            bottom:0px;
            right:0px;
        }
        .r_date_content{
            position: absolute;
            width:80%;
            height:4vh;
            line-height: 4vh;
            margin-left:10%;
            margin-top:0.5vh;
            text-align: center;
            vertical-align: middle;

        }
    }
    .r_jrsj{
        width: 24vw;
        height: 32vh;
        margin-top: 1vh;
        .title{
            text-align: left;
            line-height:4vh;
            height:4vh;
            background-color: #1a1927;
            opacity: 0.8;
            border-radius: 5px;
        }
        .icon {
            height: 4vh;
            display: inline-block;
            float: left;
            margin-left: 10px;
            margin-right: 10px;

        }
        .icon_title {
            display: inline-block;
            height: 4vh;
            line-height: 4vh;
            font-size: 1.1rem;
            font-weight: bolder;
        }
        .content{
            width: 24vw;
            height: 27vh;
            margin-top: 1vh;

        }
    }
    .r_wtjj{
        width: 24vw;
        height: 30vh;
        margin-top: 1vh;
        .title{
            text-align: left;
            line-height:4vh;
            height:4vh;
            background-color: #1a1927;
            opacity: 0.8;
            border-radius: 5px;
        }
        .icon {
            height: 4vh;
            display: inline-block;
            float: left;
            margin-left: 10px;
            margin-right: 10px;

        }
        .icon_title {
            display: inline-block;
            height: 4vh;
            line-height: 4vh;
            font-size: 1.1rem;
            font-weight: bolder;
        }
        .content{
            width: 24vw;
            height: 25vh;
            margin-top: 1vh;
        }
    }
    .r_yyrk{
        width: 24vw;
        height: 26vh;
        margin-top: 1vh;
        .title{
            text-align: left;
            line-height:4vh;
            height:4vh;
            background-color: #1a1927;
            opacity: 0.8;
            border-radius: 5px;
        }
        .icon {
            height: 4vh;
            display: inline-block;
            float: left;
            margin-left: 10px;
            margin-right: 10px;

        }
        .icon_title {
            display: inline-block;
            height: 4vh;
            line-height: 4vh;
            font-size: 1.1rem;
            font-weight: bolder;
        }
        .content{
            width:24vw;
            height:21vh;
            margin-top: 2vh;
        }
        .item{
            float:left;
            height:10vh;
            width:12vw;
            text-align: center;
            color:#98c3f6;
            img{
                width:2.8vw;
                border: solid 2px #6097fd;
                border-radius: 5px;
                box-shadow:0px 2px 30px 2px #6097fd;
                opacity: 0.8;
            }
            span{
                display: block;
                width:100%;
                height:30px;
                line-height: 30px;
                font-weight: bolder;
            }
        }
    }
</style>