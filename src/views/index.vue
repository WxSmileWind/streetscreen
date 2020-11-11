<template>
    <div class="main">
        <!--左-->
        <div class="left">
            <!--待办事件+通知公告-->
            <div class="l_tip">
                <span class="l_span">
                        <i class="el-icon-date"></i>
                        在办事件
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
                    <div title="组织机构" :class="xqgk_menutab===2?'xqgk_tab tab_on':'xqgk_tab'"
                         @mouseover="showxqgk($event,2)">
                        组织机构
                    </div>
                </div>
                <!--人口/房屋/组织机构 统计-->
                <div class="xqgk_content">
                    <div class="full" v-show="xqgk_menutab===0?true:false" id="xqgk_content_rk">
                        人口
                    </div>
                    <div class="full" v-show="xqgk_menutab===1?true:false" id="xqgk_content_fw">
                        房屋
                    </div>
                    <div class="full" v-show="xqgk_menutab===2?true:false" id="xqgk_content_qy">
                        组织机构
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
                    <div  @mouseover="MoveOnWGIngfo($event)"  @mouseout="MoveOffWGIngfo($event)"  @click="showwgfb('1')" class="full" title="点击查看执行网格分布情况">
                        <span  style="display:inline-block;color:#93bdf6;">执行网格:</span>
                        <span
                            style="display:inline-block;color:#ffff00;">{{wg.zxwg}}</span>
                    </div>
                    <div @mouseover="MoveOnWGIngfo($event)" @mouseout="MoveOffWGIngfo($event)" @click="showwgfb('2')" class="full" title="点击查看非执行网格分布情况">
                        <span style="display:inline-block;color:#93bdf6;">非执行网格:</span><span
                            style="display:inline-block;color:#ffff00;">{{wg.fzxwg}}</span>
                    </div>
                    <div @mouseover="MoveOnWGIngfo($event)"  @mouseout="MoveOffWGIngfo($event)"  @click="showwgfb('3')" class="full" title="点击查看网格员数量分布情况">
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
                    <div class="o" :style='{width:wgyOWidth}'>
                    </div>
                    <div class="n_bar">
                        <img src="../assets/imgs/blue_icon.png"
                             style="height:2vh; margin-top:1%;display: inline-block;float:left"/> <span
                            style="display: inline-block;float:left;">男:{{wgyN}}/{{wgyNWidth}}</span>
                    </div>
                    <div class="v_bar">
                        <img src="../assets/imgs/red_icon.png"
                             style="height:2vh; margin-top:1%;display: inline-block;float:left"/> <span
                            style="display: inline-block;float:left;">女:{{wgyV}}/{{wgyVWidth}}</span>
                    </div>

                    <div class="o_bar"   ><!--  v-if="wgyO>0" -->
                        <img src="../assets/imgs/white_icon.png"
                             style="height:2vh; margin-top:1%;display: inline-block;float:left"/> <span
                            style="display: inline-block;float:left;">未选择:{{wgyO}}/{{wgyOWidth}}</span>
                    </div>
                </div>
            </div>
            <!--日常考核-->
            <div class="l_rckh">  
                <div class="title">
                    <img src="../assets/imgs/icon.png" class="icon"/>&nbsp;
                    <span class="icon_title" style="">日常工作</span>
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
<!--                     position: absolute;margin-left: -7.5vw;margin-top: 1vh;-->
                     <img src="../assets/imgs/centerbackground.png" height="40vh" width="40vw" title="宁波市社会治理工作中心"  class="icon" style="display: inline-block;vertical-align: middle;"/>
                         {{orgname}}综合指挥平台
                     <b style="font-size:10px;" title="本次新增辖区下的监控查看功能、镇街钉钉连线功能（E宁波钉钉版-视频连线）">v1.2</b>
                 </span>
            </div>
            <!--通知1-->
            <div class="c_nos">
                <div class="c_nos_left">
                    通知：
                </div>
                <div class="c_nos_right" style="text-align:left;">
                    <!--通知公告滚动区域-->
<!--                    <PaoMaDeng ref="paomadeng" :content="marqueeList">-->
<!--                        <div style='float:left;padding-right:15px;' v-for="(item,index) in marqueeList" :key="index">-->
<!--                            <span :title="item.title" :data-id="item.id" onclick="showtzgginfo(this)" style="line-height: 3.6vh;cursor:pointer;" ><i class="fa fa-info" aria-hidden="true" style="color:rgb(222 104 90);"></i> {{'['+item.createtime+'] '+item.title+'                    '}}</span>-->
<!--                        </div>-->
<!--                    </PaoMaDeng>-->
                    <!--vant通知栏-->
                    <van-notice-bar left-icon="volume-o" :scrollable="false">
                        <van-swipe
                                vertical
                                class="notice-swipe"
                                :autoplay="3000"
                                :show-indicators="false"
                        >
                            <van-swipe-item  @click="showtzgginfobyid(item.id)" style="height:40px;line-height: 40px;cursor: pointer;" v-for="(item,idx) in marqueeList"
                                            :key="idx"><a :title="item.title">{{item.title}}</a></van-swipe-item>
                        </van-swipe>
                    </van-notice-bar>
                </div>
            </div>
            <!--头部各个数值统计-->
            <div class="c_panner">
                <div @click="levelchange('=|1',$event)" class="c_panner_item" @mouseover="MoveOnCards($event)" @mouseout="MoveOutCards($event)">
                    <span class="c_panner_item_value blue">{{(c_top_item_yjsj == null?0:c_top_item_yjsj)}}</span>
                    <span class="c_panner_item_name blue">一级事件</span>
                </div>
                <div @click="levelchange('=|2',$event)" class="c_panner_item" @mouseover="MoveOnCards($event)" @mouseout="MoveOutCards($event)">
                    <span class="c_panner_item_value yellow">{{(c_top_item_ejsj == null?0:c_top_item_ejsj)}}</span>
                    <span class="c_panner_item_name yellow">二级事件</span>
                </div>
                <div @click="levelchange('+=|3',$event)" class="c_panner_item" @mouseover="MoveOnCards($event)" @mouseout="MoveOutCards($event)">
                    <span class="c_panner_item_value ">{{(c_top_item_sjsj == null?0:c_top_item_sjsj)}}</span>
                    <span class="c_panner_item_name ">三级及以上</span>
                </div>
                <div class="c_panner_item"  ><!-- @mouseout="MoveOutCards($event)" -->
                    <span class="c_panner_item_value green">{{c_top_item_wgzxl}}</span>
                    <span class="c_panner_item_name green">网格在线率</span>
                </div>
                <div class="c_panner_item"  ><!-- @mouseout="MoveOutCards($event)" -->
                    <span class="c_panner_item_value white">{{c_top_item_sjgbl}}</span>
                    <span class="c_panner_item_name white">按期关闭率</span>
                </div>
                <div class="c_panner_item" ><!-- @mouseout="MoveOutCards($event)" -->
                    <span class="c_panner_item_value red">{{c_top_item_mfwgl}}</span>
                    <span class="c_panner_item_name red">满分网格率</span>
                </div>
            </div>
            <!--地图区域-->
            <div class="c_map" @mouseout="starttofly" @mouseover="stoptofly">
                <!--地图组件-->
                <Tiandt ref="tiandt"/>
                <!--<Tiandt_new ref="tiandt"/>-->
            </div>
            <!--底部各个数值统计-->
            <div class="c_bottom">
              <div  class="c_bottom_item"><!--  @click="showwzss()"-->
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
                    <span class="c_bottom_item_name">临期数</span>
                    <span class="c_bottom_item_value">{{lqsjs}}</span>
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
                    <img src="../assets/imgs/img_wgbs.png" class="c_bottom_item_img" />
                    <span class="c_bottom_item_name">未关闭数</span>
                    <span class="c_bottom_item_value">{{wgbs}}</span>
                </div>
                <div  class="c_bottom_item"><!-- @click="showjd()" -->
                    <img src="../assets/imgs/img_zfwwcs.png" class="c_bottom_item_img" />
                    <span class="c_bottom_item_name" >季度走访未完成数</span>
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
                    <span class="icon_title" style="" title="展示今日2级及以上存在图片与有效定位的事件">今日聚焦</span>
                </div>
                <div class="content">
                    <el-carousel height="27vh" arrow="always" indicator-position="none" v-if="isshowevent">
                        <el-carousel-item v-for="(item,index) in eventslist" :key="index" >
                            <div style="width:100%;height:27vh;float:left;position: relative; border-radius: 10px;cursor:pointer;">
                                <el-image
                                        @click="showNeventinfo(item.id)"
                                        style="width: 100%; height:27vh; border-radius: 10px; display: block;"
                                        :src="item.src"
                                ></el-image>
                                <div  style="cursor:pointer; position: absolute;height:30px;width:100%;background-color: #000;bottom:0px;line-height: 30px;color:white; opacity: 0.8;">
                                    {{item.title}}
                                </div>
                                <div style="position:absolute;height:30px;width:110px;top:0px;left:0px;background-color: #000;opacity: 0.8; line-height:30px; color:white;">
                                    {{item.type}}
                                </div>
                                <div style="position:absolute;height:30px;width:100px;top:0px;right:0px;background-color: black;opacity: 0.8; line-height:30px; color:white;">
                                    {{item.date.split(' ')[1]}}
                                </div>
                            </div>
                            <!--<img src="../assets/imgs/img_1.jpg" style="width:100%;height:100%;"/>
                            <h3 style="display: block;height:30px;line-height:30px; position:absolute; background-color:black;color:white;">{{ item }}</h3>-->
                        </el-carousel-item>
                    </el-carousel>

<!--                    <div v-if="!isshowevent" style="font-size: 50px;margin-top: 20%;">暂无</div>-->
                    <img   v-if="!isshowevent" src="../assets/imgs/nodata.png"  style="vertical-align: middle;text-align: center;"/></div>
            </div>
            <!--问题聚焦-->
            <div class="r_wtjj">
                <div class="title">
                    <img src="../assets/imgs/icon.png" class="icon"/>&nbsp;
                    <span class="icon_title" style="">问题聚焦</span>
                    <div class="icon_right" style="float: right;margin-right: 4px;color: #e6a23c;cursor: default;">近一月</div>
                </div>
                <div class="content" id="wtjj">

                </div>
            </div>
            <!--数据查询-->
            <div class="r_yyrk">
                <div class="title">
                    <img src="../assets/imgs/icon.png" class="icon"/>&nbsp;
                    <span class="icon_title" style="">数据查询</span>
                </div>
                <div class="content">
                    <div class="item"
                         @click="showpeopleinfo('1','人口')"
                         :style="{cursor:'pointer'}">
                        <img src="../assets/imgs/renkou.png"/>
                        <span class="txt">人口</span>
                    </div>
                    <div class="item"
                         @click="showpeopleinfo('2','房屋')"
                         :style="{cursor:'pointer'}">
                        <img src="../assets/imgs/fangwu.png"/>
                        <span class="txt">房屋</span>
                    </div>
                    <div class="item"
                         @click="showpeopleinfo('3','事件')"
                         :style="{cursor:'pointer'}">
                        <img src="../assets/imgs/shijian.png"/>
                        <span class="txt">事件</span>
                    </div>
                    <div class="item"
                         @click="showpeopleinfo('4','企业')"
                         :style="{cursor:'pointer'}">
                        <img src="../assets/imgs/qiye.png"/>
                        <span class="txt">企业</span>
                    </div>
                </div>
            </div>
        </div>
        <!--在办事件列表  弹出框-->
        <el-dialog  element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    title="在办事件"
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
                            prop="c_status"
                            label="状态"
                            width="100"
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
                    title="通知公告"
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
                    @close="closeDialog"
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
                    title="功能查询"
                    :visible.sync="eventinfoshow"
                    :modal="true"
                    :modal-append-to-body='false'
                    width="1300px" >
            <iframe width="100%" height="700px" :src="eventinfourl">
            </iframe>
        </el-dialog>
        <!--视频 弹出框-->
        <el-dialog  element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    title="监控"
                    v-if="videoshow"
                    :visible.sync="videoshow"
                    :modal="true"
                    :modal-append-to-body='false'
                    width="800px" >
            <iframe width="100%" height="600px" allowfullscreen="true"  :src="videourl">
            </iframe>
        </el-dialog>
        <!--改造后事件详情 弹出框-->
        <el-dialog  element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    title="事件详情"
                    v-if="Neweventinfoshow"
                    :visible.sync="Neweventinfoshow"
                    :modal="true"
                    top="100px"
                    :modal-append-to-body='false'
                    width="1200px" >
            <!--事件详情子组件-->
            <Eventinfo ref="eventinfo"/>
        </el-dialog>
        <!--人口、企业、房屋 查询 弹出框-->
        <el-dialog  element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :title="peoplename"
                    v-if="showpeople"
                    :visible.sync="showpeople"
                    :modal="true"
                    :modal-append-to-body='false'
                    width="1300px" >
            <iframe width="100%" height="700px" :src="peopleiframeurl">
            </iframe>
        </el-dialog>
        <!--底角数据反查弹出框-->
        <el-dialog  element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :title="dblisttitle"
                    :visible.sync="dbsjlistshow"
                    :modal="true"
                    :modal-append-to-body='false'
                    width="1300px" >
            <div style="min-height: 700px;">
                <component :is="showdbcomponent" :OrgCode="orgid"></component>
            </div>
        </el-dialog>
        <!-- 待督办 -->
        <el-card v-show="isshowdb" class="box-card boxShadow"
                     :body-style="cardstyle"
            >
                <!--            头部 -->
                <div class="clearfix" style="background-color: rgb(33 33 33); height: 26px;padding: 9px;">

                    <span :style="{color:'#fff',textAlign:'left',}">待督办事件提醒[
                        <span :style="{color:'#f00',}">{{showdbnoreadnum}}</span>
                        /{{showdbnum}}]</span>
                    <el-button title="关闭" @click="closeDB" style="float: right; padding: 3px 0;" type="text"><i
                            class="fa fa-times" aria-hidden="true" style="color: #a9aaad;"></i></el-button>

                    <el-button title="展开"  @click="openDB"
                               style="float: right; padding: 3px 0px;margin-right: 15px;" type="text"><i
                            class="fa fa-envelope-open" aria-hidden="true" style="color: #a9aaad;"></i></el-button>
                    <el-button title="缩小"  @click="miniDB"
                               style="float: right; padding: 3px 0px;margin-right: 15px;" type="text"><i
                            class="fa fa-minus" aria-hidden="true" style="color: #a9aaad;"></i></el-button>


                    <!--                <hr/>-->
                </div>
                <!--            事件内容 -->
                <div :style="{maxHeight:'250px',overflow: 'auto' , }" class="ddbClass">
                    <div v-for="(items,index) in dbdata"
                         :key="index"
                         class="text item" style="padding:10px 6px 9px 10px;">
                        <div :style="{textAlign:'left',color: 'rgb(202 194 194)',}">
                            <i class="fa fa-fire" aria-hidden="true"
                               :style="{color:(items.isRead==0?'#f00':'rgb(202 194 194)')}"
                               :title="(items.isRead==0?'未读':'已读')">
                            </i>【{{orgid.length==3?items.CityName:(orgid.length==6?items.StreetName:items.csName)}}】{{items.ReportTime}}
                        </div>

                        <!--                    <span v-if="orgid.length==3">【{{items.CityName}}】</span>-->
                        <!--                    <span v-else-if="orgid.length==6">【{{items.StreetName}}】</span>-->
                        <!--                    <span v-else>【{{items.csName}}】</span>-->
                        <!--                    :title="items.Description"-->
                        <div style="text-align: left;color: #cab6b6;cursor: pointer;"
                             @click="showdetails(items.EventID,'督办')">
                            <span>{{filterPhone(items.Description).length>30?filterPhone(items.Description).substr(0,28)+'...':filterPhone(items.Description) }}
                            </span>
                            <span style="float: right;cursor:pointer;color: #e6a23c;font-size: 15px;">详情</span>
                        </div>
                    </div>
                </div>
                <!--                <div :style="{maxHeight:'250px',overflow: 'auto' , }" class="ddbClass">-->
                <!--                    <div v-for="(items,index) in dbdata"-->
                <!--                         v-if="index <= 10"-->
                <!--                         :key="items.id"-->
                <!--                         class="text item"-->
                <!--                    >-->
                <!--                        <div style="text-align: left;color:#3a8ee6;font-weight: bold;cursor: pointer;"-->
                <!--                             @click="showdetails(items.id,'镇街大屏-督办')">-->
                <!--                            【2019-9-29 10:13】{{items.type}}</div>-->
                <!--                        <div style="text-align: left;">{{items. title}}</div>-->
                <!--                    </div>-->
                <!--                </div>-->


            </el-card>


        <!--网格分布 弹出框-->
        <el-dialog  element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :title="wgfbtitle"
                    v-if="wgfbshow"
                    :visible.sync="wgfbshow"
                    :modal="true"
                    top="100px"
                    :modal-append-to-body='false'
                    width="1200px" height="700px"  >
            <!--网格分布子组件-->
            <wgtree :lx="wgfbtype" :orguid="orgid"/>
        </el-dialog>

        <!-- 右侧导航菜单 -->
        <rightmenu :links="links"/>
    </div>
</template>
<script>
    import Eventinfo from "../components/eventinfo";
    // import Tiandt from "../components/tiandt";

    import Tiandt from "../components/tiandt_new";
    //接口调用文件
    import index from '@/api/index';
    //接口配置文件
    import {Api} from '@/api/api';
    //右侧其他大屏导航
    import rightmenu from "../components/rightmenu";

    //网格发布
    import wgtree from "../components/wgtree";

    //舆情滚动跑马灯
    import PaoMaDeng from "@/components/paomadeng.vue";
    //加密
    import JsEncrypt from 'jsencrypt'

    export default {
        name: "index",
        //引入子组件
        components: {
            PaoMaDeng,//舆情滚动子组件
            Tiandt , Eventinfo,rightmenu,wgtree,
            wzxs:()=>import("@/components/wzxs.vue")
            // Tiandt_new
        },
        data(){
            return {
                orgtype:1,//默认市级 2：其他
                datalist:{},
                screenWidth: document.body.clientWidth,
                screenHeight:document.body.clientHeight,
                dbsj: 15,//待办事件数
                dbsjlist:[],//待办事件列表
                dbsjshow:false,//待办事件弹出是否
                tzgg: 10,//通知公告数
                tzgglist:[],//通知公告列表
                tzggshow:false,//通知公告弹出是否
                infoshow:false,//待办事件+通知公告详情弹出是否
                infourl:"",//待办事件+通知公告详情url
                infotitle:"",//待办事件+通知公告弹出框标题
                xqgk_menutab: 0,//辖区概况menutab
                wgyN: 0,//男网格员数
                wgyV: 0,//女网格员数
                wgyO: 0,//未选择性别网格员数
                wgyNWidth:'0%',
                wgyVWidth:'0%',
                wgyOWidth:'0%',
                wg:{
                    zxwg:12,
                    fzxwg:12,
                    wgsum:24
                }, //执行网格/非执行网格数
                wgfbtitle:"网格分布",//网格分布弹框标题
                wgfbshow:false,//网格分布弹框
                wgfbtype:"0",//0:表示 执行网格;1:表示非执行网格;2:表示网格员数量
                nowdate:'',//右上角日期显示
                chartsrk:null, //辖区概况下的人口统计
                chartfw:null, //辖区概况下的房屋统计
                chartqy:null, //辖区概况下的企业统计
                chartzjkh:null,//日常考核下的镇街考核统计
                chartznbmkh:null,//日常考核下的职能部门考核统计
                chartwtjj:null,//问题聚焦统计
                marqueeList: [], //紧急通知
                c_top_item:'c_panner_item',//中间头部数值区域按钮未选中class
                c_top_item_yjsj:'-',//一级事件数
                c_top_item_ejsj:'-',//二级事件数
                c_top_item_sjsj:'-',//三级事件数
                c_top_item_wgzxl:'-',//网格在线率
                c_top_item_sjgbl:'-',//事件关闭率
                c_top_item_mfwgl:'-',//满分网格率
                orgname:'',//组织名称,默认：招宝山街道
                orgid:'',  //组织id,默认：招宝山街道组织uid
                eventslist:[], //今日事件list
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
                ydzfwwcs:0,
                flytomarker:Object,
                Neweventinfoshow:false,
                showpeople:false,//是否显示人房企弹窗
                peopleiframeurl:'',//人房企弹窗url
                peopleinfologinid:'',//人房企接口登录的账号
                peopleinfologinids:'',//人房企接口登录的账号
                peoplename:'',//人房企类别名称
                cardstyle:{ position:'absolute',bottom:'0vh',border: '1px solid #48494a',boxShadow: 'rgb(72, 73, 74) 1px 3px 10px 1px, rgba(72, 73, 74, 0.19) 1px 3px 0px 0px !important' ,right:'0vw',borderRadius:'10px',padding: '0px',backgroundColor:'rgb(1 1 28)',overflow: 'hidden',width:'306px',maxHeight:'300px', },//待督办卡片的样式
                isshowdb:false,
                isshowdball:false,//是否显示展开待督办
                isshowdbmini:false,//是否显示缩小待督办
                showdbnum:0,//待督办的条数
                showdbnoreadnum:0,//待督办的未阅读条数
                dbdata:[],//待督办的事件
                timer:null,//待督办定时器
                dblisttitle:"功能查询", //底部数据反查弹框title
                dbsjlistshow:false,     //底部数据反查弹框显示
                allcomponentindex:0,    //组件数组索引
                allcomponent:["wzxs","NotFound"], //底部数据反查调用某个子组件
                links:[
                    {
                        name:"典型事件",
                        icon:require("../assets/imgs/dxal.png"),
                        url:"http://10.68.129.154:8119/pages/pub/#/?orgid=001"
                    }
                ], //右侧其他大屏链接菜单
                isshowevent:true,
                isopentimer:true,
                selectthemeid:'',//已经选择的专题
            }
        },
        computed: {
            changewgynums() {
                const { wgyN, wgyV,wgyO } = this
                return {
                    wgyN,
                    wgyV,
                    wgyO
                }
            },
            showdbcomponent () {
                return this.allcomponent[this.allcomponentindex]
            }
        },
        watch:{
            '$route'(to,from){
                //console.log("[watch]监听到路由变化to:",to);
                //console.log("[watch]监听到路由变化from:",from);
                window.location.reload();
                //window.reload();
            },
            changewgynums:{
                // eslint-disable-next-line no-unused-vars
                handler(newValue, oldValue) {
                    let total=newValue.wgyN+newValue.wgyV+newValue.wgyO;
                    let wgyN = ((newValue.wgyN/total)*100).toFixed(2);
                    this.wgyNWidth= wgyN +"%";
                    let wgyV = ((newValue.wgyV/total)*100).toFixed(2);
                    this.wgyVWidth= ((100-wgyN)>wgyV?wgyV:(100-wgyN)) +"%";
                    this.wgyOWidth= ((100 - wgyN - wgyV )<=0?"0":(100 - wgyN - wgyV ).toFixed(2)) + "%";//((newValue.wgyO/total)*100).toFixed(2)
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

            // this.orgid= this.$route.params.orgid;
            // if(this.orgid==="001"){
            //     this.orgname="宁波市";
            //     this.links[0].url="http://10.68.129.154:8119/pages/pub/#/?orgid="+this.orgid;
            // }
            //1:市级  2：其他
            this.orgtype = 2;
            await this.orgMethod(this.orgtype);

            // console.log("+++++++++++++++获取到的orgid:",this.orgid);
            //将vue方法转换为js原生方法
            let _this = this;
            //将vue申明的方法复制给原生js方法，用于onclick方式原生调用
            //cleareventinfo方法用于子iframe，事件详情页调用父方法来关闭当前事件详情弹窗
            window.cleareventinfo = _this.cleareventinfo;
            window.removelevelchange = _this.removelevelchange;
            window.showtzgginfo= _this.showtzgginfo;

            window.orgtype = _this.orgtype;

            window.addlogopt = _this.addlogopt;
            window.filterPhone = _this.filterPhone;

            //console.log("+++++++++++++window.cleareventinfo:",window.cleareventinfo);
            window.showvideo = _this.showvideo;
            //console.log("+++++++++++++window.showvideo:",window.showvideo);
            this.getNow();
            //绑定orgname
            await this.bindorgname();
            window.orgname  = this.orgname;

            if(_this.orgtype !==1){
                this.peopleinfologinids = this.peopleinfologinid;
            }

            window.peopleinfologinids = _this.peopleinfologinids;

            window.peopleinfologinid = _this.peopleinfologinid;



            this.addlogout(1,'zj',"登入" ,this.orgid ,this.orgname ,"登录",this.peopleinfologinids)


            //绑定待办事件
            this.binddbsj();
            //绑定通知公告
            this.bindtzgg();
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
            //获得镇街中心账号
            this.catchzjzxinfo();

            //视窗size改变后重新赋值长宽
            const that = this;
            window.onresize = () => {
                window.screenWidth = document.body.clientWidth;
                window.screenHeight = document.body.clientHeight;
                that.screenWidth = window.screenWidth;
                that.screenHeight= window.screenHeight;
            };
            //待督办
            this.initDB();
        },
        async mounted() {
            //开启今日事件定时器并设置地图marker
            this.starttofly();
            //setTimeout(this.MarkerOntiandt('1'),10000);
            //this.MarkerOntiandt('1');
            //定时指定待督办弹窗
            this.timer = setInterval(()=>{
                this.initDB();
            }, 3600000);

            window.onbeforeunload = ()=>{
                this.addlogout(0,'zj',"登出" ,this.orgid ,this.orgname ,"登出",this.peopleinfologinids)
            } ;
        },
        methods:{
            //显示网格分布
            showwgfb(type){
                let typename="执行网格分布情况";
                if(type=='1'){
                    typename="执行网格分布情况";
                }
                else if(type=='2'){
                    typename="非执行网格分布情况";
                }
                else if(type=='3'){
                    typename="网格员数量分布情况";
                }
                this.wgfbshow=true;
                this.wgfbtitle=typename;
                this.wgfbtype=type;
                this.addlogopt(0,'zj',typename ,this.orgid ,this.orgname ,"网格" ,this.peopleinfologinids)
            },
            //未在线数清单
            showwzss(){
                this.dblisttitle="网格未在线数清单";
                this.dbsjlistshow=true;
                this.allcomponentindex=0;

            },
            //季度走访未完成
            showjd(){
                this.eventinfoshow=true;
                this.eventinfourl="http://10.19.181.153/grid/index";
            },
            //开始今日事件定时器
            starttofly(){
                if(this.isopentimer){
                    //添加定时
                    this.$refs.tiandt.openTimeTimer();

                    this.flytomarker=setInterval(()=>{

                        this.bindjrsj();
                        this.bindautoevent();
                        //清除定时
                        this.$refs.tiandt.closeTimeTimer();
                        //添加定时
                        this.$refs.tiandt.openTimeTimer();

                        //日常提醒
                        this.bindrctx();
                    }, 30000);
                }

            },
            //停止今日事件定时器
            stoptofly(){
                if(this.flytomarker!==null){
                    clearInterval(this.flytomarker);
                    //清除定时
                    this.$refs.tiandt.closeTimeTimer();
                }
            },
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
                if(hh=='23' && mm =='59' && ss=='50'){
                    window.location.href = 'http://10.19.181.153/grid/login';
                }
                this.nowdate=date.getFullYear() + '-' + month + '-' + day+ ' ' + hh+ ':' + mm+ ':' + ss+' '+weekName
            },
            //辖区概况切换
            showxqgk(e,i){
                // e.currentTarget.classList.add('tab_on');
                this.xqgk_menutab=i;
            },
            //绑定获取组织名称
            async bindorgname(){
                //调用通知公告接口
                let {data:orgnamedata} = await index.fetchData_get(Api.dpzj.orgname,
                    {"orgcode":this.orgid});
                this.orgname=orgnamedata[0].name;
                //初始化画镇街行政区划
                await this.$refs.tiandt.initmap(this.orgid, this.orgname);
            },
            //获得镇街中心的账号
            async bindorgcode() {
                // let orgcodedata = await index.fetchData_get(Api.lh.getorgcode, {"id":this.peopleinfologinids});
                let orgcodedata = await index.fetchData_get(Api.lh.getorgcode, {"userid":this.peopleinfologinid});
                if(orgcodedata.resultCode === 0){
                    // this.orgid = orgcodedata.data;
                    this.orgid = orgcodedata.obj.placecode;
                }else{
                    this.orgid = '';
                }
            },
            closeDialog(){
                //清空跑马灯所有定时器
                this.$refs.paomadeng.clearall();

                // 调用子组件中的方法,开启滚动
                this.$refs.paomadeng.bindevents();
            },
            //绑定通知公告
            async bindtzgg(){
                this.tzgg=0;
                this.tzgglist=[];
                //调用通知公告接口
                let {data:tzggdata} = await index.fetchData_get(Api.dpzj.tzgg,
                    {"orgcode":this.orgid});

                // eslint-disable-next-line no-console
                //console.log("+++++获取到的人口数据：",rkdata)
                let datalist=tzggdata;
                this.tzgg=datalist.length;
                this.tzgglist=datalist;
                this.marqueeList=this.tzgglist;

                // 调用子组件中的方法
                // this.$refs.paomadeng.bindevents();
            },
            //绑定待办事件
            async binddbsj(){
                this.dbsj=0;
                this.dbsjlist=[];
                //调用待办事件接口
                let {data:dbsjdata} = await index.fetchData_get(Api.dpzj.dbsj,
                    {"orgcode":this.orgid});

                // eslint-disable-next-line no-console
                //console.log("+++++获取到的待办事件：",dbsjdata)
                let datalist=dbsjdata;
                this.dbsj=datalist.length;
                this.dbsjlist=datalist;
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
                //console.log("+++++获取到的人口数据：",rkdata)
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
                //console.log("[人口]++++处理后的data1:",data1);
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
                                            //console.log('++++++++++tooltip:', param);
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
                //console.log("[房屋]++++++++++data1:",data1);
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
                                    fontSize: 14,
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 14,
                                    }
                                }
                            },
                            yAxis: {
                                type: 'category',
                                nameTextStyle: {
                                    color: '#94d4f8',
                                    fontStyle: 'normal',
                                    fontSize: 14,
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 14,
                                    }
                                },
                                data: ['房屋', '危房', '出租房']
                            },
                            series: {
                                name: '',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    show: true,
                                    formatter: '{c}',
                                    color:'#ffffff',
                                    position: 'right',
                                },
                                itemStyle:{
                                    barBorderRadius: [0, 10, 10, 0]
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
                //console.log("[企业]++++++++++data1:",data1);
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
                                        color: '#fff',
                                        fontSize: 14,
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
                                        color: '#fff',
                                        fontSize: 14,
                                    }
                                },
                                data: ['商事主体', '机关单位', '社会组织'],
                            },
                            series: {
                                name: '',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    show: true,
                                    formatter: '{c}',
                                    color:'#ffffff',
                                    position: 'right'
                                },
                                itemStyle:{
                                    barBorderRadius: [0, 10, 10, 0]
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
                this.wgyO=datalist[0].wgysl-(this.wgyN+this.wgyV);
            },
            //绑定镇街考核
            async bindStreetkh() {
                let data1 = [60, 73, 85, 40, 90];
                data1=[]
                let {data:wxzbdata} = await index.fetchData_get(Api.dpzj.wxzb,
                    {"orgcode":this.orgid});
                let datalist=wxzbdata;

                //console.log("[镇街考核]++++++++++data1:",data1);


                let titledata=[];
                if(this.orgid.length===9){
                    titledata=[
                        {text: '网格出勤', max: 100},
                        {text: '类型标注', max: 100},
                        {text: '信息对比', max: 100},
                        {text: '及时处置', max: 100},
                        {text: '季度走访', max: 100},
                    ];
                    data1.push(datalist[0].wgcq);
                    data1.push(datalist[0].lxbz);
                    data1.push(datalist[0].xxdb);
                    data1.push(datalist[0].czzl);
                    data1.push(datalist[0].jdzfwcl);
                }
                else{
                    titledata=[
                        {text: '网格出勤', max: 100},
                        {text: '类型标注', max: 100},
                        {text: '信息对比', max: 100},
                        {text: '及时处置', max: 100},
                        {text: '有效事件', max: 100},
                    ];
                    data1.push(datalist[0].wgcq);
                    data1.push(datalist[0].lxbz);
                    data1.push(datalist[0].xxdb);
                    data1.push(datalist[0].czzl);
                    data1.push(datalist[0].yxsj);
                }
                this.$nextTick(() => {
                    //日常考核-镇街考核
                    let echarts = require('echarts');
                    // 基于准备好的dom，初始化echarts实例
                    this.chartzjkh = echarts.init(document.getElementById('street_kaohe'));
                    // 绘制图表
                    this.chartzjkh.setOption({
                        title: {
                            text: '工作评估',
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
                                    // color: '#98d4f6',
                                    color: '#fff',
                                    //backgroundColor: '#999',
                                    borderRadius: 3,
                                    padding: [0, 0],
                                    fontSize:13,
                                }
                            },
                            indicator:titledata,
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
                                    value: data1,
                                    name: '工作评估指数'
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
                                color: '#d48265',
                                fontSize:14,
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
                                color: '#fff',
                                fontStyle: 'normal',
                                fontSize: 14,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 14,
                                }
                            },
                            data: departdata
                        },
                        yAxis: {
                            type: 'value',
                            nameTextStyle: {
                                 color: '#fff',//'#94d4f8',
                                fontStyle: 'normal',
                                fontSize: 14,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 14,
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
                if(datalist){
                    this.wgbs=datalist[0].wgbs==null?0:datalist[0].wgbs;
                    this.yqs=datalist[0].yqs==null?0:datalist[0].yqs;
                    this.ths=datalist[0].ths==null?0:datalist[0].ths;
                    this.wzss=datalist[0].wzss==null?0:datalist[0].wzss;
                    this.wqzs=datalist[0].wqzs==null?0:datalist[0].wqzs;
                    this.lqsjs=datalist[0].lqsjs==null?0:datalist[0].lqsjs;
                    this.ydzfwwcs=datalist[0].ydzfwwcs==null?0:datalist[0].ydzfwwcs;
                }
                else{
                    this.bindrctx();
                }

            },
            //绑定今日事件
            async bindjrsj(){
                //调用今日事件
                let {data:jrsjdata} = await index.fetchData_get(Api.dpzj.topevents,
                    {"orgcode":this.orgid});
                let datalist=jrsjdata;
                this.eventslist=[];
                //  this.eventslist=datalist;
                if(datalist.length <=0){
                    this.isshowevent = false;

                }else{
                    this.isshowevent = true;
                }

                if(datalist.length>=10){
                    for(let i=0;i<10;i++){
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
            async bindautoevent(){
                this.MarkerOntiandt('1');
            },
            //绑定问题聚焦
            async bindwtjj(){
                let that=this;
                //调用问题聚焦
                let data1=[];
                this.wtjjlist=[];
                // let {data:wtjjdata} = await index.fetchData_get(Api.dpzj.wtjj,
                //               {"orgcode":this.orgid});
                let {data:wtjjdata} = await index.fetchData_get(Api.lh.themestatic,
                    {"orguid":this.orgid});
                let datalist=wtjjdata.curData;
                that.wtjjtype = wtjjdata.types;
                datalist.map(item=>{
                    let obj={...item};
                    this.wtjjlist.push(obj);
                    data1.push({
                        value: obj.value, name: obj.name
                    });
                });

                this.$nextTick(()=> {

                    // let colors = ['#5793f3', '#d14a61', '#675bba'];
                    //日常考核-职能部门考核）
                    let echarts = require('echarts');
                    // 基于准备好的dom，初始化echarts实例
                    this.chartwtjj = echarts.init(document.getElementById('wtjj'));
                    // 绘制图表（职能部门考核）
                    this.chartwtjj.setOption({
                        tooltip: {
                            trigger: 'item',//{a} <br/>
                            formatter: '{b} : {c} ({d}%)'
                        },

                        // visualMap: {
                        //     show: false,
                        //     min: 80,
                        //     max: 600,
                        //     inRange: {
                        //         colorLightness: [0, 1]
                        //     }
                        // },
                        series: [
                            {
                                name: '问题聚焦',
                                type: 'pie',
                                radius: '60%',
                                center: ['50%', '50%'],
                                data: data1,
                                label: {
                                    color: '#fff',
                                    fontSize:15
                                },
                                selectedMode: 'single',
                                labelLine: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)',
                                        fontSize:15
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


                    let that=this;
                    this.chartwtjj.on('click', function (params) {
                        let name="专题";
                        if(that.wtjjtype ==0){//专题
                            if(that.selectthemeid ==that.wtjjlist[params.dataIndex].id ){
                                that.$refs.tiandt.changeThemeEvent("" , "");
                            }else{
                                that.$refs.tiandt.changeThemeEvent(that.wtjjlist[params.dataIndex].id,"");
                                that.selectthemeid = that.wtjjlist[params.dataIndex].id;
                            }
                        }
                        else{//类型
                            that.$refs.tiandt.changetypeinfo(that.wtjjlist[params.dataIndex].id)
                            that.$refs.tiandt.changeThemeEvent("",that.wtjjlist[params.dataIndex].id);
                            name="省标类型";
                        }
                        that.addlogopt(0,'zj',that.wtjjlist[params.dataIndex].id ,this.orgid ,this.orgname ,"地图-"+ name+"切换",this.peopleinfologinids)
                    });
                });
            },
            //中部区域头部数值按钮鼠标移上
            MoveOnCards(e){
                e.currentTarget.classList.add('c_panner_item_on');
            },
            //中部区域头部数值按钮鼠标移上
            MoveOnWGIngfo(e){
                let p = document.getElementsByTagName('div');
                for(let i = 0;i <p.length;i++){
                    //第一种方法，用classList这个H5 API，有兼容性问题
                    if(p[i].classList.contains('wginfo_on')==true){
                        p[i].classList.remove('wginfo_on');
                    }

                }
                // e.currentTarget.classList.remove('c_panner_item_click');
                e.currentTarget.classList.add('wginfo_on');
            },
            //中部区域头部数值按钮鼠标移上
            MoveOffWGIngfo(e){
                let p = document.getElementsByTagName('div');
                for(let i = 0;i <p.length;i++){
                    //第一种方法，用classList这个H5 API，有兼容性问题
                    if(p[i].classList.contains('wginfo_on')==true){
                        p[i].classList.remove('wginfo_on');
                    }

                }
            },
            //中部区域头部数值按钮鼠标移出
            MoveOutCards(e){
                e.currentTarget.classList.remove('c_panner_item_on');
            },
            //地图等级切换
            levelchange(level,e){
                if(e.currentTarget.classList.contains('c_panner_item_click')==true)
                {
                    //显示全部等级信息
                    e.currentTarget.classList.remove('c_panner_item_click');
                    level = '-1';
                }
                else{
                    let p = document.getElementsByTagName('div');
                    for(let i = 0;i <p.length;i++){
                        //第一种方法，用classList这个H5 API，有兼容性问题
                        if(p[i].classList.contains('c_panner_item_click')==true){
                            p[i].classList.remove('c_panner_item_click');
                        }

                    }
                    // e.currentTarget.classList.remove('c_panner_item_click');
                    e.currentTarget.classList.add('c_panner_item_click');
                }

                this.$refs.tiandt.changeLevelEvent(level);
                this.addlogopt(0,'zj',level ,this.orgid ,this.orgname ,"地图-等级切换",this.peopleinfologinids)
            },
            //地图等级切换
            removelevelchange(){
                let p = document.getElementsByTagName('div');
                for(let i = 0;i <p.length;i++){
                    //第一种方法，用classList这个H5 API，有兼容性问题
                    if(p[i].classList.contains('c_panner_item_click')==true){
                        p[i].classList.remove('c_panner_item_click');
                    }

                }
            },
            MarkerOntiandt(type){
                let typename='一级事件';
                let iconcolor='#ff0000';
                let MarkerList=[];


                this.eventslist.forEach(item=>{
                    //item.src=item.imgurl;
                    // if(item.x!="0"&&item.x!=null){
                    //
                    // }

                    MarkerList.push({
                        x:item.x,
                        y:item.y,
                        id:item.id,
                        title:item.title,
                        iconColor:iconcolor,
                        type:item.type,
                        date:item.date,
                    });
                });

                // if(type==='1'){
                //     typename='一级事件';
                //     iconcolor='#dd675b';
                //     MarkerList=[{
                //         x:'121.54131004622892',
                //         y:'29.863637067043463',
                //         id:'8a9335c77458bae201749075e208014a',
                //         title:'['+typename+']事件一',
                //         content:'事件一内容描述',
                //         iconColor:iconcolor
                //     },{
                //         x:'121.53588399604126',
                //         y:'29.875790846180443',
                //         id:'8a9335c77458bae201749075e208014a',
                //         title:'['+typename+']事件二',
                //         content:'事件二内容描述',
                //         iconColor:iconcolor
                //     }];
                //
                //     console.log("+++++++++++++111MarkerList:",MarkerList);
                // }
                // else if(type==='2'){
                //     typename='二级事件';
                //     iconcolor='#ffd622';
                //     MarkerList=[{
                //         x:'121.7101106',
                //         y:'29.9660671',
                //         title:'['+typename+']事件一',
                //         content:'事件一内容描述',
                //         iconColor:iconcolor
                //     },{
                //         x:'121.7089519',
                //         y:'29.9599303',
                //         title:'['+typename+']事件二',
                //         content:'事件二内容描述',
                //         iconColor:iconcolor
                //     }];
                // }
                // else if(type==='3'){
                //     typename='三级事件';
                //     iconcolor='#08c7f1';
                // }

                // 调用天地图子组件中的方法
                // this.$refs.tiandt.setmarker(MarkerList);

                //根据问题聚焦的饼图点击事件触发显示事件定位
                //this.$refs.tiandt.changeThemeEvent("90ff1917-9560-4ec1-a0d6-184326e1af6d","");
                //console.log("+++++++++++++type:",type);
                //console.log("+++++++++++++MarkerList:",MarkerList);

                //用于测试
                setTimeout(()=>{
                    this.$refs.tiandt.setmarker(MarkerList);
                },1000);

            },
            //最新事件详情弹出框
            showNeventinfo(id){

                this.Neweventinfoshow=true;
                setTimeout(()=>{
                    //设置子组件areacode
                    this.$refs.eventinfo.setareacode(this.orgid);
                    //调用子组件事件详情绑定方法
                    this.$refs.eventinfo.bindeventinfo(id);
                    this.addlogopt(0,'zj',id,this.orgid ,this.orgname ,"事件详情",this.peopleinfologinids)
                },100);

            },
            //点击待办事件弹出框
            showdbsj(){
                this.dbsjshow=true;
                this.addlogopt(0,'zj',"点击在办事件的数量" ,this.orgid ,this.orgname ,"在办事件",this.peopleinfologinids)
            },
            //待办事件列表表格行点击事件
            dbsjrouter(row, column, event){
                //console.log("选中行的id：",row.id);
            },
            //待办事件点击
            handledbsj(index, row) {
                this.infoshow=true;
                this.infotitle="事件详情 ";
                this.infourl="";
                // console.log()
                // /grid/event/show?id=8a9335c87458af4501747ae898bb11ac&flag=all
                this.infourl="http://10.19.181.153/grid/event/show?id="+row.id+"&random="+Math.floor(Math.random()*450001);
                this.addlogopt(0,'zj',row.id ,this.orgid ,this.orgname ,"在办事件-列表-详情",this.peopleinfologinids)
            },
            //待阅读通知公告弹出框
            showtzgg(){
                this.tzggshow=true;
                this.addlogopt(0,'zj',"点击通知公告" ,this.orgid ,this.orgname ,"通知公告",this.peopleinfologinids)
            },
            //待阅读通知公告点击
            handletzgg(index, row) {
                this.infoshow=true;
                this.infotitle="公告详情";
                this.infourl="";
                this.infourl="http://10.19.181.153/grid/notice/f.show?id="+row.id+"&random="+Math.floor(Math.random()*450001);
                this.addlogopt(0,'zj',row.id ,this.orgid ,this.orgname ,"通知公告-列表-详情",this.peopleinfologinids)
            },
            showtzgginfobyid(id){
                this.infoshow=true;
                this.infotitle="公告详情";
                this.infourl="";
                this.infourl="http://10.19.181.153/grid/notice/f.show?id="+id+"&random="+Math.floor(Math.random()*450001);
                this.addlogopt(0,'zj',id ,this.orgid ,this.orgname ,"通知公告-列表-详情",this.peopleinfologinids)
            },
            showtzgginfo(obj){
                let item_no = this.marqueeList.find((item) => item.id == obj.getAttribute('data-id'));
                this.infoshow=true;
                this.infotitle="公告详情";
                this.infourl="";
                this.infourl="http://10.19.181.153/grid/notice/f.show?id="+obj.getAttribute('data-id')+"&random="+Math.floor(Math.random()*450001);
            },
            //关闭事件详情弹出框
            cleareventinfo(){
                this.eventinfourl="";
                this.eventinfoshow=false;

                this.$refs.tiandt.cleareventinfo();
                //console.log("+++++++++成功调用父方法");
            },
            //显示视频流
            async showvideo(channelId){
                //console.log("++++++++++获取到的视频channelId：",channelId);
                let videodata = await index.fetchData_get(Api.video+"?id="+channelId,null);
                let data1= JSON.parse(JSON.parse(videodata));
                if(data1.url == null || data1.url == ""  || data1.url ==undefined){
                    this.$notify({
                        title: '提示',
                        message: '获取失败，请稍后再试！',
                        duration:3000,
                        type: 'error'
                    });
                }else{
                    this.videourl="http://10.68.129.154:8119/pages/Childs/PulmonitisProblem/video.html?url="+encodeURIComponent(data1.url);
                    this.videoshow=true;
                }
                this.addlogopt(0,'zj',channelId ,this.orgid ,this.orgname ,"雪亮" ,this.peopleinfologinids)
            },
            //获得镇街中心的账号
            async catchzjzxinfo() {
                let zjzxid = await index.fetchData_get(Api.lh.getzjzx, {"id":this.orgid});
                if(zjzxid.type !== 40001){
                    this.peopleinfologinid = zjzxid.data;
                }else{
                    this.peopleinfologinid = '';
                }

            },
            //显示人口企业房屋链接
            showpeopleinfo(types,name){
                let that = this;
                that.peopleiframeurl="";
                //如果指挥中心的账号为空，不显示弹窗
                if(that.peopleinfologinid =='' ||that.peopleinfologinid==null || that.peopleinfologinid== undefined )
                {
                    that.showpeople = false;
                    return false;
                }
                let baseurl='http://10.19.181.153/gis2/#/?_='+ new Date().getTime()+'&loginName='
                    + that.peopleinfologinid
                    +'&redirectName=searchIndex&searchType='+types;
                that.peopleiframeurl=baseurl;
                that.peoplename = name;
                that.showpeople = true;
                //console.log("----baseurl:"+baseurl)
            },
            //关闭 - 待督办
            closeDB() {
                let that = this;
                that.isshowdb = false;
                clearInterval(this.timer);
            },
            //缩小 - 待督办
            miniDB() {
                let that = this;
                //隐藏缩小
                that.isshowdbmini = false;
                //显示展开
                that.isshowdball = true;
                //修改样式
                that.cardstyle={
                    position:'absolute',bottom:'0vh',right:'3px',height:'40px'
                    ,borderRadius:'10px',backgroundColor:'rgb(1 1 28)',width:'306px',padding:'0px',border: '1px solid #48494a'
                    ,overflow: 'hidden',boxShadow: 'rgb(72, 73, 74) 1px 3px 10px 1px, rgba(72, 73, 74, 0.19) 1px 3px 0px 0px !important'
                };
            },
            //展开 - 待督办
            openDB() {
                let that = this;
                //显示缩小
                that.isshowdbmini = true;
                //隐藏展开
                that.isshowdball = false;
                //修改样式
                that.cardstyle={
                    position:'absolute',bottom:'0vh',right:'3px',maxHeight:'300px'
                    ,borderRadius:'10px',backgroundColor:'rgb(1 1 28)',width:'306px',padding:'0px',border: '1px solid #48494a'
                    ,overflow: 'hidden',boxShadow: 'rgb(72, 73, 74) 1px 3px 10px 1px, rgba(72, 73, 74, 0.19) 1px 3px 0px 0px !important'
                };
            },
            //加载待督办数据
            async initDB(){
                let that = this;
                let ddbda =  await index.fetchData_get(Api.lh.getddb,{area:this.orgid});
                //let ddbda =  await  index.fetchData_get(Api.dpzj.topevents, {"orgcode":that.orgid});
                if(ddbda.type==40001 ||ddbda.type==30001 || ddbda.count<=0 ){
                    that.isshowdb = false;
                }else{
                    that.dbdata = ddbda.data;
                    that.showdbnum = ddbda.count;
                    that.showdbnoreadnum = ddbda.notreadcount;
                    that.isshowdball = false;//是否显示展开待督办
                    that.isshowdbmini = true;//是否显示缩小待督办
                    that.isshowdb = true;
                }
            },
            //获得督办详情
            async showdetails(id,title){
                //加载日志
                //let loginfo = await index.fetchData_get(Api.lh.log,{id:id,code:this.orgid , name:this.orgname,module:title});
                this.addlogopt(0,'zj',id,this.orgid ,this.orgname ,title,this.peopleinfologinids)
                //显示详情
                this.showNeventinfo(id);
                //重新获取待督办列表
                this.initDB();
            },
            async orgMethod(type){//市级方法
                if(type==1)//市级
                {
                    this.orgid= this.$route.params.orgid;
                    if(this.orgid==="001"){
                        this.orgname="宁波市";
                    }
                    this.links[0].url="http://10.68.129.154:8119/pages/pub/#/?orgid="+this.orgid;
                }else{
                    this.peopleinfologinid = this.$route.params.orgid;
                    //获得组织信息
                    // this.orgid = '001';
                    await this.bindorgcode();
                    if(this.orgid==="001"){
                        this.orgname="宁波市";
                    }
                    this.links[0].url="http://10.68.129.154:8119/pages/dx/#/?userid="+this.peopleinfologinid;
                }

            },
            //过滤敏感内容
            filterPhone(str){
                // let reg = new RegExp('^(\d{3})\d{4}(\d{4})$')
                return str.replace(/(\d{3})\d{4}(\d{4})/g, "$1****$2")
            },
            //添加登录登出日志
            async addlogout(type , bigname ,description,areacode,areaname,modulename,OptUserId){
                if(window.orgtype !==1){
                    let data =await index.fetchData_post(Api.lh.getuserlogoutlog ,
                        {  type:type, bigname:bigname ,description:description,areacode:areacode,areaname:areaname,
                            modulename:modulename,OptUserId:OptUserId });
                    // console.log("登录登出日志："+ data)
                }
            },
            //添加操作日志
            async addlogopt(type , bigname ,description,areacode,areaname,modulename,OptUserId){
                if(window.orgtype !==1){
                    let data =await index.fetchData_post(Api.lh.getuseroptlog ,
                        {  type:type, bigname:bigname ,description:description,areacode:areacode,areaname:areaname,
                            modulename:modulename,OptUserId:OptUserId });
                    // console.log("操作日志："+ data)
                }
            }
        },
        async beforeDestroy() {
            clearInterval(this.timer);
        }
    }
</script>
<style>

    input::-webkit-input-placeholder{
        color:red;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:red;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:red;
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:red;
    }


    /*elementui库·-个性化设置*/
    .el-input__inner::-webkit-input-placeholder{
        color:#ccc !important;
    }
    .el-input__inner::-moz-placeholder{
        color:red !important;
    }
    .el-input__inner::-moz-placeholder{
        color:red !important;
    }
    .el-input__inner::-ms-input-placeholder{
        color:red !important;
    }


    .el-tabs__nav{
        margin-left: 94px !important;
    }
    .el-dialog, .el-page li{
        background-color: #2c3e50 !important;
    }
    .icon_menu:hover{
        box-shadow: 15px 15px 14px rgba(50,50,50,0.4);
        transform: rotate(0deg) scale(1.2);
        -webkit-transform: rotate(0deg) scale(1.2);
        -moz-transform: rotate(0deg) scale(1.2);
        z-index: 2;
    }
    .el-tag{
        margin-right: 10px;
    }
    /*.el-card{
      width:300px;
      float:left;
      margin: 9px;
      opacity: 0.9;
    }*/
    .el-card{
        margin: 9px;
        border:none !important;
        background-color: inherit !important;
        float:left;
        color: #191a1d!important;
    }
    .el-divider--horizontal{
        margin: 17px 0 !important;
    }
    .el-divider__text{
        padding: 5px 20px !important;
    }
    .el-tag--warning{
        background-color: inherit !important;
        color:#f7ba2a !important;
        font-weight: bolder;
        font-size: 14px !important;
    }
    .el-divider__text{
        background-color: #2c3e50 !important;
        color:white !important;
    }
    .el-tabs__item{
        color:white !important;
        padding: 0 10px !important;
        margin-right: 0px !important;
    }
    .el-tabs__item.is-active{
        color:black !important;
        background-color: white;
    }
    .el-dialog__title{
        color:white !important;
    }
    .el-dialog__body{
        padding: 10px 10px !important;
    }
    .el-timeline-item{
        padding-bottom: 10px !important;
    }
    .viewer-title{
        font-size:26px !important;
    }
    /* element-ui card样式 */
    .box-card .item {
        margin-bottom: 0px;
    }
    .box-card .clearfix:before,
    .box-card .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
    .boxShadow{
        border-radius: 5px;
        background: linear-gradient(to right, #abbd73 35%, #d6e2ad 100%);
        color: darkslategray;
        box-shadow: 1px 2px 1px -1px #777;
        transition: background 200ms ease-in-out;
    }
    .boxShadow:before {
        box-shadow: 0 15px 10px #777;
        -webkit-transform: rotate(4deg);
        transform: rotate(4deg);
        transition: all 150ms ease-in-out;
    }


    /*.ddbClass::-webkit-scrollbar {!*滚动条整体样式*!*/
    /*    width: 5px;     !*高宽分别对应横竖滚动条的尺寸*!*/


    /*}*/
    /*.ddbClass::-webkit-scrollbar-track { //滚动条凹槽的设置*/
    /*    background-color: #ffffff;*/
    /*    -webkit-border-radius: 2em;*/
    /*    -moz-border-radius: 2em;*/
    /*    border-radius: 2em;*/
    /*}*/

    /*.ddbClass::-webkit-scrollbar-thumb { //滚动条的设置*/
    /*    background-color: #8c939d;*/
    /*    -webkit-border-radius: 2em;*/
    /*    -moz-border-radius: 2em;*/
    /*    border-radius: 2em;*/
    /*}*/
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
        height:40px;
        line-height:40px;
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
            color:#fff;
            font-size: 0.9rem;
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
                line-height: 3vh;
                float:left;
                text-align: center;
                background-color: #162740;
                font-size: 0.9rem;
                cursor: pointer;
            }
        }
        .xqgk_nv{
            width:100%;
            margin-top:1vh;
            height: 2.6vh;
            line-height: 2.6vh;
            color:#fff;
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
            .o{
                float:left;
                height: 2.6vh;
                background-color: #ffffff;
            }
            .n_bar{
                float:left;
                height: 2.6vh;
                width:32.8%;
                line-height: 2.6vh;
                text-align: center;
                font-size: 0.8rem;
            }
            .v_bar{
                float:left;
                height: 2.6vh;
                width:32.8%;
                line-height: 2.6vh;
                text-align: center;
                font-size: 0.6rem;
            }
            .o_bar{
                float:left;
                height: 2.6vh;
                width:34.4%;
                line-height: 2.6vh;
                text-align: center;
                font-size: 0.6rem;
            }
        }
    }
    .tab_on{
        /*color: #fbfbfb !important;*/
        background-color: #5c96a0;
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
            vertical-align: middle;
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
            margin-left: 5vw;
            margin-top: 1vh;
            font-size: 2rem;
        }
    }
    .c_nos{
        width:48vw;
        height:3.6vh;
        line-height:3.6vh;
        .c_nos_left{
            float:left;
            text-align: right;
            width: 4vw;
            height: 3.6vh;
            color:#e6a23c;
            font-weight: bolder;

        }
        .c_nos_right{
            float:left;
            text-align: right;
            width: 43vw;
            height: 3.6vh;
            color:#d8d096;
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
                font-size: 1.2rem;
                font-weight: bolder;
            }
            .c_panner_item_name{
                display: block;
                height:3vh;
                line-height: 3vh;
                text-align: center;
                color:#de685a;
                font-size: 1.2rem;
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
                width: 6.3vw;
                height: 3vh;
                line-height: 4.5vh;
                text-align: center;
                font-size: 0.9rem !important;
                color: #fff;
            }
            .c_bottom_item_value{
                display: block;
                width: 6vw;
                height: 4vh;
                line-height: 4vh;
                text-align: center;
                font-weight: bolder;
                font-size: 1.2rem;
                /*cursor: pointer;*/
                cursor: default;
                color: #ccc;

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
                width:3vw;
                border: solid 2px #6097fd;
                border-radius: 5px;
                box-shadow:0px 2px 30px 2px #6097fd;
                opacity: 0.8;
            }
            span{
                display: block;
                width:100%;
                height: 3vh;
                line-height: 3vh;
                font-weight: bolder;
            }
        }
    }

    /*待督办   */
    .ddbClass{
        overflow: hidden;
        overflow-y: auto;
    }


    .ddbClass::-webkit-scrollbar { //滚动条的宽度
        width: 5px;
        opacity: 0.6;
    }

    .ddbClass::-webkit-scrollbar-track { //滚动条凹槽的设置
        background-color: #1a1927;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
    }

    .ddbClass::-webkit-scrollbar-thumb { //滚动条的设置
        background-color: #8c939d;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
    }

    .c_panner_item_click {
        background: url("../assets/imgs/moveon.png") no-repeat !important;
        background-size: 100% 100% !important;
    }
    .wginfo_on{
        /*border: 1px solid #e6a23c;*/
        background-color: #5e41b7 !important;
    /*box-shadow: -2px -2px 10px #1e3250;*/
}

</style>