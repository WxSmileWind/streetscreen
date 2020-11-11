<template>
    <div id="map">
        <svg t="1604991986852" @click="IsShowJKYZoom(showonlinejk)" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11023" width="200" height="200"
             :style="jkstyle" @mouseover="changejkcolor(true)"  @mouseout="changejkcolor(false)"  >
            <title>展示辖区下的监控定位</title>
            <path d="M960 224L768 381.09V256a64.19 64.19 0 0 0-64-64H128a64.19 64.19 0 0 0-64 64v512a64.19 64.19 0 0 0 64 64h576a64.19 64.19 0 0 0 64-64V642.91L960 800z" p-id="11662"></path>
        </svg>

        <svg t="1604565370488"   @click="IsShowWGYZoom(showonlinewgy)" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1320"
             :style="wgstyle" @mouseover="changewgcolor(true)"  @mouseout="changewgcolor(false)">
            <title>展示辖区下的在线网格员实时定位</title>
            <path d="M717.664 612.195c-52.734 47.461-121.289 79.102-200.391 79.102s-147.656-31.641-205.664-79.102c-131.836 68.555-221.484 158.203-221.484 321.68l843.75 0c0-163.477-89.648-247.852-216.211-321.68zM512 628.016c131.836 0 237.305-110.742 237.305-242.578s-105.469-242.578-237.305-242.578-237.305 110.742-237.305 242.578c0 137.109 110.742 242.578 237.305 242.578z" p-id="1321">
        </path></svg>
<!--        时间选择-->
        <el-date-picker
                v-model="values"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :disabled="false"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                :style="{zIndex:999,position: 'absolute' , right: '266px'}"
                @change="changeThemeEvent('','')"
        ></el-date-picker>

        <!-- 类型下拉 -->
        <el-select
                placeholder="事件类型选择"
                multiple
                filterable
                allow-create
                collapse-tags
                value-key="ival"
                v-model="citys"
                :style="{position: 'absolute' , right: '83px' , zIndex: 999,borderColor: '#f7f8fa',width:'183px' }"
                @change = "changeThemeEvent('','')"
        >
            <el-option
                    v-for="item in etype.data"
                    :label="item.iname"
                    :value="item.ival"
                    :key="item.ival">
            </el-option>
        </el-select>

        <!-- 返回 初始状态 按钮 -->
        <el-button type="primary"
                   icon="el-icon-refresh"
                   circle title="返回初始状态"
                   @click="returnToIni()"

                   :style="{zIndex:999,position:'absolute',top: '-0.2vh', right: '-0.1vw',fontSize: '25px',borderRadius:'10px',padding:'7px' }">
            <!--            :style="{zIndex:999,position:'absolute',top: '18.4vh', left: '0.52vw',fontSize: '23px' }">-->
        </el-button>
        <!--   图例 -->
        <el-button @click="drawer=!drawer" type="primary"
                   icon="el-icon-s-fold"
                   title="图例"  circle
                   :style="{zIndex:1001,position:'absolute',bottom: '0vh', right: '0vw',fontSize: '23px',padding:'12px' }">
            <!--            图例-->
        </el-button>

        <div v-show="drawer" class="animated fadeInRight tl" >
            <ul >
                <li>
                    <img src="http://10.68.129.154:8119/pages/NSquared/static/img/1_0.png"  class="imgs">
                    <div>一级事件</div>
                </li>
                <li>

                    <img src="http://10.68.129.154:8119/pages/NSquared/static/img/2_0.png"  class="imgs">
                    <div>二级事件</div>
                </li>
                <li>

                    <img src="http://10.68.129.154:8119/pages/NSquared/static/img/3_0.png"  class="imgs">
                    <div>三级及以上</div>
                </li>
                <li>

                    <img src="http://10.68.129.154:8119/pages/NSquared/static/img/3_1.png"  class="imgs">
                    <div>三级及以上紧急事件</div>
                </li>
                <li>

                    <img src="http://10.68.129.154:8119/pages/NSquared/static/img/3_2.png" class="imgs">
                    <div>近3天三级及以上紧急事件</div>
                </li>
                <li>

                    <img src="http://10.68.129.154:8119/pages/NSquared/static/img/new.png" class="imgs">
                    <div>今日事件</div>
                </li>
            </ul>
        </div>

        <!-- 倒计时 -->
        <b :style="{position: 'absolute' , right: '40px',top:'-3px' , zIndex: 999,color: '#000',textAlign:'center',fontSize: '17px',padding:'10px',width:'23px',backgroundColor:'#fff',borderRadius:'12px', } ">{{times}}</b>
        <!--事件详情 弹出框-->
        <el-dialog element-loading-text="拼命加载中"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)"
                   title="事件详情"
                   :visible.sync="eventinfoshow"
                   :modal="true"
                   :modal-append-to-body='false'
                   width="1366px">
            <!--事件详情子组件-->
            <Eventinfo ref="eventinfo"/>
        </el-dialog>
    </div>
</template>

<script>
    //接口调用文件
    import index from '@/api/index';
    //接口配置文件
    import {Api} from '@/api/api';

    export default {
        name: "tiandt",
        data() {
            return {
                x: '121.535',
                y: '29.873',
                eventinfoshow: false,
                eventinfourl: '',
                dmap: {type: Object},
                myJSMap: null,
                orguid: '001',
                orgname: '',
                type: '',
                level1:'0',
                times:30,
                timeTimer:null,
                // themeId:'4d18c15c-ae7c-4630-9403-940a7df4fab9',
                themeId: '',
                stime: '',
                etime: '',
                values: [],
                valuesold: [],
                whereStr: '',
                videolist: [],
                videoIdList: new Array(),
                zjData: {type: Object},
                etype:{type: Object},//事件类型
                citys:[],//选中的事件类型
                eventtypeshow:false,//是否显示事件类型下拉
                oldChooseData: [],//事件下拉选中旧值存储
                drawer:false,//是否显示抽屉
                minzoom:1,
                selectStartDate:this.catchSETime(0),
                selectEndDate:this.catchSETime(1),
                pickerOptions: {
                    disabledDate: time => {
                        return this.dealDisabledDate(time);
                    }
                },
                showonlinewgy:false,
                showonlinejk:false,
                wgstyle:{zIndex:999,position: 'absolute',cursor:'pointer' , right: '527px',fill:'#ccc',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' },
                jkstyle:{zIndex:999,position: 'absolute',cursor:'pointer' , right: '572px',fill:'#ccc',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' },
                wgyselectlist:[],
                areafw:null,
                maptype:1,//默认为事件地图:1   2:网格地图  3：监控地图
            }
        },

        created() {
             this.TimeFormat();
            //事件类型
            this.GetEventTypeData();
            window.getvideolist = this.getvideolist;
            window.dingtalk = this.dingtalk;
        },
        mounted() {
            //this.setmarker(null);
            //this.initmap();
        },
        methods: {
            //初始化点位+画面
            async initmap(orgCode, orgname, types) {
                this.$nextTick(() => {
                    let that = this;  //将方法放在mounted，会有指向问题，定义this使用就会正常
                    window.require(["jsmap"], function () {
                        //var  map=jsmap.Map("map");//使用默认底图
                        // eslint-disable-next-line no-undef
                        that.dmap = JSMap.Map("map", {mapType: "电子地图(高端灰)"}); //初始化时候自定义底图

                        that.myJSMap = JSMap;
                        that.orgname = orgname;
                        that.type = types;
                        that.minzoom = (orgCode=='001'?1:(orgCode.length==6?2:2));
                        // eslint-disable-next-line no-undef
                        that.dmap.centerAndZoom(new JSMap.Point(121.535, 29.873), 0);
                        that.dmap.setMaxZoom(9);
                        that.dmap.setMinZoom(that.minzoom);



                        // that.dmap.setMapBGStyle((orgCode=='001'?"深蓝":"常规"));
                        that.dmap.setMapBGStyle("深蓝");
                        that.dmap.setBaseLayerOpacity(0.4);


                        // eslint-disable-next-line no-unused-vars

                        //赋值区域
                        that.orguid = orgCode;
                        //飞行至具体的区域
                        that.flyToArea();

                        //修改部分
                        window.map = that.dmap;

                        //修改部分
                        that.dmaplayer = JSMap;
                        window.dmaplayer = that.dmaplayer;

                        that.maptype = 1;
                        //获得区域信息
                        that.getareainfo();


                        //判断区域  区县、镇街
                        if(that.orguid != '001'){

                            // if (that.orguid.length == 6) {
                            //     that.zjData = that.dmap.getLayerXSQ(that.orgname);
                            // } else {
                            //     that.zjData = that.dmap.getLayerJD(that.orgname);
                            // }
                            //
                            // that.zjData.options.fill = false;
                            // //添加围栏
                            // that.dmap.clearFenceLayer();
                            // //添加围栏
                            // that.dmap.setFenceLayer(that.zjData);
                            //zoom判断
                            that.dmap.on("zoomend", function () {
                                if ((that.dmap.getZoom() <= 7) && that.dmap.getOverlayGroup("eventmarkerlist") != undefined) {
                                    that.removeMarkerVideo();
                                }
                            });
                        }else{//宁波市
                            //zoom判断
                            that.dmap.on("zoomend", function () {
                                //0-2级别显示
                                if ((that.dmap.getZoom() <= 1)) {
                                    // that.dmap.setMapBGStyle("深蓝");
                                    that.dmap.setBaseLayerOpacity(0.4);
                                    if (that.dmap.getXYLayer("闪点图") == undefined) {
                                        that.scatterData(that.myJSMap);
                                    }

                                } else {
                                    // that.dmap.setMapBGStyle("常规");
                                    that.dmap.removeXYLayer("闪点图");

                                    if ((that.dmap.getZoom() <= 7) && that.dmap.getOverlayGroup("eventmarkerlist") != undefined) {
                                        that.removeMarkerVideo();
                                    }
                                }

                            });
                        }
                        that.SetMapZoom(JSMap);
                    });
                });
            },
            dealDisabledDate(time) {
                console.log("----------time="+time.getTime());
                return (
                    time.getTime() > this.selectEndDate ||
                    time.getTime() < this.selectStartDate
                );
            },
            flyToArea(){
                let that = this;
                let zjdata=null;
                let opt = {
                    fillColor: "#0445a7",
                    color: "#ff0000"
                }
                that.dmap.removeOverlay("flyto");
                that.dmap.removeOverlay("flytobuffer");
                //非宁波市：添加围栏
                if (that.orguid != '001') {
                    if (that.orguid.length == 6) {
                        zjdata=that.dmap.dbop.getData("(QX_NAME,eq,"+that.orgname+")","jsmap_xianshi");
                    } else {
                         //面
                        zjdata=that.dmap.dbop.getData("(JZ_NAME,eq,"+that.orgname+")","jsmap_jiedao_chouxi");
                    }
                    // eslint-disable-next-line no-undef
                    let arrPois=that.myJSMap.getPoints(zjdata[0].SHAPE);
                    // eslint-disable-next-line no-undef
                    let polygon=that.myJSMap.Polygon(arrPois,opt);
                    polygon.id="flyto";
                    that.dmap.flyToLayer(polygon);
                    // that.dmap.flyToLayer(polygon,false,function() {
                    //     // eslint-disable-next-line no-undef,no-unused-vars
                    //     let buffer = that.myJSMap.getLayerBuffer(polygon, 100, function (layerBuffer) {
                    //         layerBuffer.id="flytobuffer";
                    //         that.dmap.addOverlay(layerBuffer);
                    //     })
                    // });

                }
            },
            //设置标记点位, 2020/9/17 【吴啸】最新修改
            async setmarker(MarkerList) {
                // await this.initmap();
                let that = this;
                //自定义图标
                // window.require(["jsmap"], function () {
                //     if(that.dmap.getOverlayGroup("eventmarkerlist") != undefined){
                //
                //     }
                that.dmap.removeOverlayGroup("eventmarkerlist");
                //去掉监控
                that.videoIdList.forEach(item => {
                    that.dmap.removeOverlay(item);
                });

                // let icon=JSMap.Icon("http://10.68.132.104/JSMap/demo/icon/marker-icon-red.png", new JSMap.Size(25,41));
                // let marker3 = new JSMap.Marker(new JSMap.Point(121.539,29.87),{icon:icon});
                // marker3.bindTooltip("自定义图标");
                // MarkerList.For
                let markerlist = [];
                // eslint-disable-next-line no-console
                MarkerList.forEach(item => {
                    // eslint-disable-next-line no-undef
                    /* let icon = new that.myJSMap.IconMarker({
                         icon: 'http://10.68.129.154:8119/pages/NSquared/static/img/new.png',//icon名称参考：http://www.fontawesome.com.cn/faicons/
                         iconColor: item.iconColor,
                         markerColor: '#b9c0ee',
                         prefix: 'fa',
                         extraClasses: 'fa-spin' //让图标旋转
                     });
                     */
                    let icon=that.myJSMap.Icon("http://10.68.129.154:8119/pages/NSquared/static/img/new.png", new that.myJSMap.Size(30,40));
                    // eslint-disable-next-line no-undef
                    let marker = new that.myJSMap.Marker(new JSMap.Point(item.x, item.y), {icon: icon});
                    //marker.bindPopup("<h1>"+item.title+"</h1><p>"+item.content+"</p>");
                    marker.on("click", function (e) {
                        that.$parent.showNeventinfo(item.id);
                    });
                    let pophtml='<b>'+item.type +'[' + item.date +'</b>'+']<br/>'+item.title;
                    marker.bindTooltip(pophtml);
                    // marker.bindPopup(function (e) {
                    //     alert(1)
                    // });
                    marker.setZIndexOffset(200)
                    markerlist.push(marker);
                });

                // eslint-disable-next-line no-undef
                let overlayGroup2 = new that.myJSMap.OverlayGroup(markerlist);
                overlayGroup2.id = "eventmarkerlist";

                that.dmap.addOverlayGroup(overlayGroup2);
                //飞行至这些点位
                that.dmap.flyToLayer(markerlist[0]);


                for (const item of MarkerList) {
                    that.getvideolist(item.x, item.y);
                }

                // });


            },
            //添加图层
            async SetMapZoom(maps) {
                let that = this;
                let imageSrc = require("../assets/MapIcons/corp1.png");
                //查询条件
                that.getQuery();
                //闪点图
                // that.scatterData(maps);
                //聚合图
                that.ClusterData(maps, imageSrc);
                //点
                that.MarkerData(maps, imageSrc);
                //区县文字
                //that.SetQXFont(maps);
                //镇街文字
                //that.SetZJFont(maps);
                //镇街面
                that.JZPolygon(maps,that.orguid.length, that.orguid.length > 3 ? that.orgname : "");
            },
            //地图专题切换事件
            async changeThemeEvent(themeId, types) {
                let that = this;
                // if(that.themeId == themeId && that.type == types)
                // {
                //     return false;
                // }
                //赋值专题  类型
                that.themeId = themeId;
                that.type = types;
                if (that.dmap === null || that.dmap === undefined || that.dmap === "") {
                    that.initmap(that.orguid, that.orgname);
                }
                // if(that.orguid!= '001'){
                //     that.dmap.removeflyTo();
                //     //添加围栏
                //     that.dmap.clearFenceLayer();
                //     that.zjData.options.fill=false;
                //     //添加围栏
                //     that.dmap.setFenceLayer(that.zjData);
                // }
                let oldmaptype = this.maptype;
                if(oldmaptype !=1){
                    this.maptype = 1;//1：基础  2：网格  3：监控
                    this.ClearOrAddBaseZoom2(oldmaptype);//清除基础图层
                    this.showonlinewgy = false;
                    this.showonlinejk = false;
                    this.jkstyle={zIndex:999,position: 'absolute' ,cursor:'pointer',fill:'#ccc', right: '572px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };
                    this.wgstyle={zIndex:999,position: 'absolute',cursor:'pointer',fill: '#ccc' , right: '527px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };
                }else{
                    that.removeMarkerVideo();
                }

                that.SetMapZoom(that.myJSMap);
                if(that.orguid == '001'){
                    that.scatterData();
                    that.dmap.setZoom(that.minzoom);
                }
                window.addlogopt(0,'zj',JSON.stringify(this.getQuery()) ,this.orguid ,this.orgname ,"地图-专题切换" ,window.peopleinfologinids)
            },
            //地图等级切换事件
            async changeLevelEvent(level) {
                let that = this;
                // if(that.themeId == themeId && that.type == types)
                // {
                //     return false;
                // }
                //赋值专题  类型
                if(level == '-1')
                {
                    that.level1 = '0';
                }else{
                    that.level1 = level;
                }

                if (that.dmap === null || that.dmap === undefined || that.dmap === "") {
                    that.initmap(that.orguid, that.orgname);
                }
                // if(that.orguid!= '001'){
                //     that.dmap.removeflyTo();
                //     //添加围栏
                //     that.dmap.clearFenceLayer();
                //     that.zjData.options.fill=false;
                //     //添加围栏
                //     that.dmap.setFenceLayer(that.zjData);
                // }
                let oldmaptype = this.maptype;
                if(oldmaptype !=1){
                    this.maptype = 1;//1：基础  2：网格  3：监控
                    this.ClearOrAddBaseZoom2(oldmaptype);//清除基础图层
                    this.showonlinewgy = false;
                    this.showonlinejk = false;
                    this.jkstyle={zIndex:999,position: 'absolute' ,cursor:'pointer',fill:'#ccc', right: '572px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };
                    this.wgstyle={zIndex:999,position: 'absolute',cursor:'pointer',fill: '#ccc' , right: '527px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };
                }else{
                    that.removeMarkerVideo();
                }


                that.SetMapZoom(that.myJSMap);
                if(that.orguid == '001'){
                    that.scatterData();
                    that.dmap.setZoom(that.minzoom);
                }
            },
            flyToArea2(){
                //非宁波市：添加围栏
                if (that.orguid != '001') {
                    if (that.orguid.length == 6) {
                        that.zjData = that.dmap.getLayerXSQ(that.orgname);
                    } else {
                        that.zjData = that.dmap.getLayerJD(that.orgname);
                    }

                    that.zjData.options.fill = false;
                    that.dmap.flyToLayer(that.zjData)
                    //添加围栏
                    that.dmap.setFenceLayer(that.zjData)

                }
            },
            //区县标记
            SetQXFont() {
                // if(this.dmap.getXYLayer("区县注记图")!=undefined){
                //
                // }
                this.dmap.removeXYLayer("区县注记图");
                //区县标记
                let optQXName = {
                    data: {
                        field: "CENTERX,CENTERY,QX_NAME",
                        x: "CENTERX",
                        y: "CENTERY",
                        //sort:"-uv",
                        value: "QX_NAME",
                        size: 50
                    },
                    symbol: {
                        type: "Text",
                        options: {
                            size: 15,//文字大小
                            font: '21px Arial',//字体
                            fillStyle: '#fff',//文字颜色
                            shadowColor: '#333'
                        },
                        minZoom: 1,
                        maxZoom: 4
                    }
                };

                this.dmap.addXYLayer("区县注记图", "jsmap_xianshi", optQXName);
            }
            ,//镇街标记
            SetZJFont() {
                // if(this.dmap.getXYLayer("镇街注记图")!=undefined){
                //
                // }
                this.dmap.removeXYLayer("镇街注记图");
                //镇街标记
                let optZJName = {
                    data: {
                        field: "CENTERX,CENTERY,JZ_NAME",
                        x: "CENTERX",
                        y: "CENTERY",
                        value: "JZ_NAME",
                        size: 500
                    },
                    symbol: {
                        type: "Text",
                        options: {
                            size: 15, //文字大小
                            font: '18px Arial', //字体
                            fillStyle: 'rgb(212, 130, 101)', //文字颜色
                            shadowColor: '#fff'
                        },
                        minZoom: 4,
                        maxZoom: 9
                    }
                };
                this.dmap.addXYLayer("镇街注记图", "jsmap_jiedao", optZJName);
            },
            //镇街面
            JZPolygon(maps,len, name) {
                this.dmap.removeXYLayer("基层网格乡镇街道");
                //乡镇街道
                let optJZ = {
                    data: {
                        size: 20000,
                        field: "CENTERX,CENTERY,QX_NAME,JZ_NAME",
                        where: len==3?"":(len==6?"(QX_NAME,eq," + name + ")":"(JZ_NAME,eq," + name + ")"),
                    },
                    symbol: {
                        type: "Polygon",
                        options: {
                            fillColor: "randomColor", //随机颜色
                            color: "#ffffff",
                            weight: 1,
                            opacity: 0.4
                        },
                        minZoom: 2,
                        maxZoom: 9
                    },
                    //响应动作
                    action: {
                        bindTooltip: "{JZ_NAME}",
                    }
                };
                this.dmap.addXYLayer("基层网格乡镇街道", "jsmap_jiedao_chouxi", optJZ);
            },
            //时间格式化
            async TimeFormat() {
                let date = new Date()
                let month = date.getMonth() + 1
                let day = date.getDate();
                let year = date.getFullYear();

                let currentday = year + "-" + (month > 9 ? month : ('0' + month)) + "-" + day;
                switch (month) {
                    case 1:
                        month += 11;
                        year--;
                        break;
                    default:
                        month -= 1;
                        break;

                }
                this.values = [year + "-" + (month > 9 ? month : ('0' + month)) +"-"+ (day > 9 ? day : ('0' + day)), currentday];
                this.valuesold = this.values;
            },
            formatter(time,fmt){
                let date = new Date(time);
                let month = date.getMonth() + 1
                let day = date.getDate();
                let year = date.getFullYear();

                let hour = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();

                var o = {
                    "M+": month, //月份
                    "d+": day, //日
                    "h+": hour, //小时
                    "m+": minutes, //分
                    "s+": seconds, //秒
                    "q+": Math.floor((month-1 + 3) / 3), //季度
                    "S": date.getMilliseconds() //毫秒
                };

                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
            //获得开始时间与结束时间
            catchSETime(num) {
                let date = new Date()
                let month = date.getMonth() + 1
                let day = date.getDate();
                let year = date.getFullYear();

                let currentday = year + "-" + (month > 9 ? month : ('0' + month)) + "-" + day;
                switch (month) {
                    case 1:
                        month += 11;
                        year--;
                        break;
                    default:
                        month -= 1;
                        break;

                }

                let values = [new Date(year + "-" + (month > 9 ? month : ('0' + month)) + "-01 00:00:00").getTime()-1*1000 ,
                    new Date().getTime()  ];
                return  values[num];
            },
            //关闭事件详情弹出框
            cleareventinfo() {
                this.eventinfourl = "";
                this.eventinfoshow = false;
            },
            //闪点图
            scatterData() {
                let that = this;
                // if(that.dmap.getXYLayer("闪点图")!=undefined){
                //     that.dmap.removeXYLayer("闪点图");
                // }
                that.dmap.removeXYLayer("闪点图");

                var opt = {
                    data: {
                        //数据结构
                        field: "eventid,createtime,level,themeid,isurgent,isnearurgent,orguid,x,y,eventtype,",
                        where: that.whereStr
                        //"(themeid,eq," + that.themeId + ")"+"~and(t1,eq," + that.orguid + ")"+"~and(createtime,gte," + that.values[0] + " 00:00:00)"+"~and(createtime,lte," + this.values[1] + " 00:00:00)",
                        , x: "x", //x字段(经度)
                        y: "y", //y字段（纬度）
                        size: 200000,
                    },
                    symbol: {
                        type: "scatter",
                        sizeRate: 2,
                        //lightValueField:"ONLINE",
                        //lightValueValue:"1",
                        color: {
                            light: 'rgba(92,184,92,0.4)',
                            dark: '#fff',
                            flash: 'rgba(174,213,129,0.1)'
                        },
                        minZoom: 1,
                        maxZoom: 1,
                    }
                    // symbol:{
                    //     type:"Heat",
                    //     heatValueField:"eventid",
                    //     heatValueX:0.02,
                    //     minZoom: 1,
                    //     maxZoom: 1,
                    // }

                }
                that.dmap.addXYLayer("闪点图", "center_allevent", opt)
            },
            //聚合
            ClusterData(maps, imageSrc) {
                let that = this;
                // if(that.dmap.getXYLayer("网格中心")!=undefined){
                //
                // }
                that.dmap.removeXYLayer("网格中心");
                //自定义的icon图标
                let optData = {
                    //数据结构
                    // field: "val1,themeid,orgqxname,eventid,createtime,t1,t6,t7,x,y",
                    field: "eventid,createtime,level,themeid,isurgent,isnearurgent,orguid,x,y,eventtype,",
                    where: that.whereStr
                    //"(themeid,eq," + that.themeId + ")"+"~and(t1,eq," + that.orguid + ")"+"~and(createtime,gte," + that.values[0] + " 00:00:00)"+"~and(createtime,lte," + this.values[1] + " 00:00:00)",
                    , x: "x", //x字段(经度)
                    y: "y", //y字段（纬度）
                    size: 5000
                };
                //定义样式:图标  聚合图
                let optTB = {
                    data: optData,
                    symbol: {
                        type: "Cluster",
                        icon: new maps.Icon(imageSrc, new maps.Size(30, 40)),
                        bindIconField: 'http://10.68.129.154:8119/pages/NSquared/static/img/{level}_{isnearurgent}.png',
                        minZoom: 2,
                        maxZoom: 7,
                    },
                    //响应动作
                    action: {
                        //bindTooltip: "<iframe style='width:1480px;height:602px;border: 0px;' scrolling='no' src='/pages/EventDetailRequest.html?id={eventid}')></iframe>",
                        //bindPopup: "<iframe style='width:315px;height:150px;border: 0px;' scrolling='no' src='/pages/EventDetailRequest.html?id={eventid}')></iframe>",
                        bindClick: function (item) {
                            var eventid = item.eventid;
                            // that.eventinfoshow = true;
                            // //that.eventinfourl = "http://10.68.129.154:8119/pages/ZJDPEventDetail.html?id=" + eventid + "&isShow=1&areaCode=" + that.orguid;
                            // setTimeout(()=>{
                            //     //设置子组件areacode
                            //     window.setareacode(that.orguid);
                            //     //调用子组件事件详情绑定方法
                            //     window.bindeventinfo(eventid);
                            // },100);
                            that.$parent.showNeventinfo(eventid);
                        }
                    }
                };

                this.dmap.addXYLayer("网格中心", "center_allevent", optTB)
            },
            //点
            MarkerData(maps, imageSrc) {
                let that = this;
                that.dmap.removeAutoXYLayer("图标");
                // if(that.dmap.getAutoXYLayer("图标")!=undefined){
                //
                // }
                //自定义的icon图标
                let optDataMarker = {
                    //数据结构
                    field: "eventid,createtime,level,themeid,isurgent,isnearurgent,orguid,x,y,eventtype,",
                    where: that.whereStr
                    //"(themeid,eq," + that.themeId + ")"+"~and(t1,eq," + that.orguid + ")"+"~and(createtime,gte," + that.values[0] + " 00:00:00)"+"~and(createtime,lte," + this.values[1] + " 00:00:00)",
                    , x: "x", //x字段(经度)
                    y: "y", //y字段（纬度）
                    size: 500
                };
                //定义样式:图标   点
                let optTB1 = {
                    data: optDataMarker,
                    symbol: {
                        type: "Marker",
                        icon: new maps.Icon(imageSrc, new maps.Size(30, 40)),
                        bindIconField: 'http://10.68.129.154:8119/pages/NSquared/static/img/{level}_{isnearurgent}.png',
                        minZoom: 8,
                        maxZoom: 9,
                    },
                    //响应动作
                    action: {
                        //bindTooltip: "<iframe style='width:1480px;height:602px;border: 0px;' scrolling='no' src='/pages/EventDetailRequest.html?id={eventid}')></iframe>",
                        //bindPopup: "<iframe style='width:315px;height:150px;border: 0px;' scrolling='no' src='/pages/EventDetailRequest.html?id={eventid}')></iframe>",
                        bindClick: function (item) {
                            var eventid = item.eventid;
                            // that.eventinfoshow = true;
                            // //that.eventinfourl = "http://10.68.129.154:8119/pages/ZJDPEventDetail.html?id=" + eventid + "&isShow=1&areaCode=" + that.orguid;
                            // setTimeout(()=>{
                            //     //设置子组件areacode
                            //     window.setareacode(that.orguid);
                            //     //调用子组件事件详情绑定方法
                            //     window.bindeventinfo(eventid);
                            // },100);
                            that.$parent.showNeventinfo(eventid);
                        }
                    }
                };
                this.dmap.addAutoXYLayer("图标", "center_allevent", optTB1, function (data) {

                })
            },
            //清除基础图层
            ClearOrAddBaseZoom(type){
                let that = this;
                //清除
                if(type == 0){
                    if(that.orguid == '001'){
                        that.dmap.removeXYLayer("闪点图");
                        that.dmap.setZoom(that.minzoom);
                    }
                    that.dmap.removeXYLayer("网格中心");
                    that.dmap.removeAutoXYLayer("图标");
                    that.$parent.stoptofly();
                    that.removeMarkerVideo();
                    //加载网格信息
                    that.showwgyinfo();
                }else if(type == 1){//加载
                    if (that.dmap === null || that.dmap === undefined || that.dmap === "") {
                        that.initmap(that.orguid, that.orgname);
                    }
                    if(that.orguid == '001'){
                        that.scatterData();
                        that.dmap.setZoom(that.minzoom);
                    }
                    that.removeMarkerVideo();
                    that.SetMapZoom(that.myJSMap);

                    //去除网格图层
                    that.dmap.removeOverlayGroup("wgyinfo");
                    that.dmap.removeOverlay("wgyselectinfo");
                }
            },
            //清除基础图层
            ClearOrAddBaseZoom2(oldtype){
                let that = this;
                    //清除老图层
                    if(oldtype == 1){//基础图层
                        if(that.orguid == '001'){
                            that.dmap.removeXYLayer("闪点图");
                            that.dmap.setZoom(that.minzoom);
                        }
                        that.dmap.removeXYLayer("网格中心");
                        that.dmap.removeAutoXYLayer("图标");
                        that.$parent.stoptofly();
                        that.removeMarkerVideo();
                        that.returnToIniNotMap();
                    }else if(oldtype == 2){//网格图层
                        //去除网格图层
                        that.dmap.removeOverlayGroup("wgyinfo");
                        that.dmap.removeOverlay("wgyselectinfo");
                        that.removeMarkerVideo();

                    }else if(oldtype == 3)//监控图层
                    {
                        that.removeMarkerVideo();
                        that.dmap.removeXYLayer("jkinfos");
                        that.dmap.removeAutoXYLayer("jkinfo");
                    }
                    that.dmap.removeOverlayGroup("jks");
                    //加载新图层
                    if(that.maptype == 1){//基础图层
                        if (that.dmap === null || that.dmap === undefined || that.dmap === "") {
                            that.initmap(that.orguid, that.orgname);
                        }
                        if(that.orguid == '001'){
                            that.scatterData();
                            that.dmap.setZoom(that.minzoom);
                        }
                        that.SetMapZoom(that.myJSMap);
                    }else if(that.maptype == 2){//网格图层
                        //加载网格信息
                        that.showwgyinfo();
                    }else if(that.maptype == 3)//监控图层
                    {
                        that.ClusterJKData();
                        that.showjkinfo();
                    }


            },
            //显示与隐藏网格员信息
            IsShowWGYZoom(value){
                let name = "";
                //显示
                if(value == false){
                    let oldmaptype = this.maptype;
                    this.maptype = 2;//1：基础  2：网格  3：监控
                    this.ClearOrAddBaseZoom2(oldmaptype);//清除基础图层

                    name = "显示网格图层"
                    this.$parent.isopentimer = false;
                    this.showonlinewgy = true;
                    this.showonlinejk = false;
                    this.jkstyle={zIndex:999,position: 'absolute' ,cursor:'pointer',fill:'#ccc', right: '572px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };
                    this.wgstyle={zIndex:999,position: 'absolute',cursor:'pointer',fill: '#67c23a' , right: '527px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };

                }else{
                    let oldmaptype = this.maptype;
                    this.maptype = 1;//1：基础  2：网格  3：监控
                    name = "显示事件图层"
                    this.ClearOrAddBaseZoom2(oldmaptype);//加载基础图层
                    this.$parent.isopentimer = true;
                    this.showonlinewgy = false;
                    this.wgstyle={zIndex:999,position: 'absolute',cursor:'pointer' ,fill:'#ccc', right: '527px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };


                }
                window.addlogopt(0,'zj',name ,this.orguid ,this.orgname ,"地图-网格图层的显示与隐藏" ,window.peopleinfologinids)
            },
            //显示与隐藏监控信息
            IsShowJKYZoom(value){
                let name = "";
                //显示
                if(value == false){
                    let oldmaptype = this.maptype;
                    this.maptype = 3;//1：基础  2：网格  3：监控
                    this.ClearOrAddBaseZoom2(oldmaptype);//清除基础图层
                    this.showonlinewgy = false;
                    this.wgstyle={zIndex:999,position: 'absolute',cursor:'pointer' ,fill:'#ccc', right: '527px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };
                    this.jkstyle={zIndex:999,position: 'absolute' ,cursor:'pointer',fill:'#67c23a', right: '572px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };
                    name = "显示监控图层"
                    this.$parent.isopentimer = false;
                    this.showonlinejk = true;

                }else{
                    let oldmaptype = this.maptype;
                    this.maptype = 1;//1：基础  2：网格  3：监控
                    name = "显示事件图层"
                    this.ClearOrAddBaseZoom2(oldmaptype);//加载基础图层
                    this.$parent.isopentimer = true;
                    this.showonlinejk = false;
                    this.jkstyle={zIndex:999,position: 'absolute',cursor:'pointer' ,fill:'#ccc', right: '572px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };
                }
                window.addlogopt(0,'zj',name ,this.orguid ,this.orgname ,"地图-网格图层的显示与隐藏" ,window.peopleinfologinids)
            },
            changewgcolor(flag){
                if(flag  && !this.showonlinewgy){
                    this.wgstyle={zIndex:999,position: 'absolute' ,cursor:'pointer',fill:'#67c23a', right: '527px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };
                }else if(!flag && !this.showonlinewgy){
                    this.wgstyle={zIndex:999,position: 'absolute',cursor:'pointer' ,fill:'#ccc', right: '527px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };
                }
            },
            changejkcolor(flag){
                if(flag  && !this.showonlinejk){
                    this.jkstyle={zIndex:999,position: 'absolute' ,cursor:'pointer',fill:'#67c23a', right: '572px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };
                }else if(!flag && !this.showonlinejk){
                    this.jkstyle={zIndex:999,position: 'absolute',cursor:'pointer' ,fill:'#ccc', right: '572px',color:'#737478',backgroundColor:'#fff',width:'44px',height:'38px',borderRadius: '4px' };
                }
            },
            //展示网格员信息
            async showwgyinfo(){
                let that = this;
                that.dmap.removeOverlayGroup("wgyinfo");
                //获得在线网格员的数据
                let wgyData = await that.GetWgyData(that.$parent.peopleinfologinid ,that.$parent.orgid );
                //定义图标
                let imageSrc = require("../assets/imgs/MapIcons/markerforwgy.png");
                let imageSelectSrc = require("../assets/imgs/MapIcons/markerforwgy_select.png");
                let markerlist = [];
                // eslint-disable-next-line no-console
                let p=0
                wgyData.forEach(item => {
                    let icon=that.myJSMap.Icon( imageSrc , new that.myJSMap.Size(40,40));
                    // eslint-disable-next-line no-undef
                    let marker = new that.myJSMap.Marker(new that.myJSMap.Point(item.x, item.y), {icon: icon});
                    let pophtml='<div style="color:#000;font-size:18px;"><b>'+item.name +'【' + item.orgName +'</b>'+'】<br/>'
                                +'<span>'+item.phone.substr(0,item.phone.length-3)+"***" +'</span>'
                                +'<br/>' +
                        '<button class="curJK"  style="margin-right:15px;border-radius: 12px;cursor: pointer;background-color: #e6a23c;border: 2px solid #f1f1f1;padding: 5px;color: #fff;"  onclick="window.getvideolist('+ item.x+','+item.y+')">查看监控</button>'
                                // +'<a >查看周边监控</a>'
                    +'<button class="curDDlx"  style="margin-right:15px;border-radius: 12px;cursor: pointer;background-color: #409eff;border: 2px solid #f1f1f1;padding: 5px;color: #fff;"  onclick="window.dingtalk(\''+ item.id + '\')">钉钉连线</button>';
                                // +'<a style="left:15px;cursor: pointer;" onclick="window.dingtalk(\''+ item.id + '\')">钉钉连线</a></div>' ;
                    marker.bindPopup(pophtml);
                    marker.on("click",function(e){
                        let iconselect=that.myJSMap.Icon( imageSelectSrc , new that.myJSMap.Size(40,40));
                        let markerselect = new that.myJSMap.Marker(new that.myJSMap.Point(item.x, item.y), {icon: iconselect});
                        markerselect.setZIndexOffset(201)
                        markerselect.bindPopup(pophtml);
                        markerselect.id="wgyselectinfo";
                        that.dmap.addOverlay(markerselect);
                        window.addlogopt(0,'zj',"x:"+item.x+",y:"+item.y ,this.orguid ,window.orgname ,"地图-获得网格员详情" ,window.peopleinfologinids)
                    })
                    marker.setZIndexOffset(200)
                    markerlist.push(marker);
                    p++
                });

                // eslint-disable-next-line no-undef
                let overlayGroup2 = new that.myJSMap.OverlayGroup(markerlist);
                overlayGroup2.id = "wgyinfo";

                that.dmap.addOverlayGroup(overlayGroup2);
            },
            //展示监控信息
            async showjkinfo(){
                let that = this;
                that.dmap.removeAutoXYLayer("jkinfo");
                //自定义的icon图标
                let optDataMarker = {
                    //数据结构
                    field: "bh,GPS_X,GPS_Y,tdmc",
                    where: that.areafw == null?"":( "((GPS_X,bw,"+ that.areafw.XMIN+","+that.areafw.XMAX +")~and(GPS_Y,bw,"+ that.areafw.YMIN +","+ that.areafw.YMAX +"))")
                    //"(themeid,eq," + that.themeId + ")"+"~and(t1,eq," + that.orguid + ")"+"~and(createtime,gte," + that.values[0] + " 00:00:00)"+"~and(createtime,lte," + this.values[1] + " 00:00:00)",
                    , x: "GPS_X", //x字段(经度)
                    y: "GPS_Y", //y字段（纬度）
                    size: 500
                };
                //定义样式:图标   点
                let optTB1 = {
                    data: optDataMarker,
                    symbol: {
                        type: "Marker",
                        icon: new  that.myJSMap.Icon('http://10.68.129.154:8119/pages/NSquared/static/img/video.png', new that.myJSMap.Size(30, 40)),
                        // bindIconField:'bh' ,
                        minZoom: 8,
                        maxZoom: 9,
                    },
                    //响应动作
                    action: {
                        bindTooltip: "{tdmc}",
                        bindClick: function (item) {
                            window.parent.showvideo(item.bh);
                        }
                    }
                };
                this.dmap.addAutoXYLayer("jkinfo", "sxt_nh", optTB1, function (data) {})
            },
            //聚合图-监控
            ClusterJKData(maps, imageSrc) {
                let that = this;
                that.dmap.removeXYLayer("jkinfos");
                //自定义的icon图标
                let optDataMarker = {
                    //数据结构
                    field: "bh,GPS_X,GPS_Y,tdmc",
                    where: that.areafw == null?"":( "((GPS_X,bw,"+ that.areafw.XMIN+","+that.areafw.XMAX +")~and(GPS_Y,bw,"+ that.areafw.YMIN +","+ that.areafw.YMAX +"))")
                    //"(themeid,eq," + that.themeId + ")"+"~and(t1,eq," + that.orguid + ")"+"~and(createtime,gte," + that.values[0] + " 00:00:00)"+"~and(createtime,lte," + this.values[1] + " 00:00:00)",
                    , x: "GPS_X", //x字段(经度)
                    y: "GPS_Y", //y字段（纬度）
                    size: 12500
                };
                //定义样式:图标   点
                let optTB1 = {
                    data: optDataMarker,
                    symbol: {
                        type: "Cluster",
                        icon: new  that.myJSMap.Icon('http://10.68.129.154:8119/pages/NSquared/static/img/video.png', new that.myJSMap.Size(30, 40)),
                        // bindIconField:'bh' ,
                        minZoom: that.minzoom,
                        maxZoom: 7,
                    },
                    //响应动作
                    action: {
                        bindTooltip: "{tdmc}",
                        bindClick: function (item) {
                            window.parent.showvideo(item.bh);
                        }
                    }
                };
                this.dmap.addXYLayer("jkinfos", "sxt_nh", optTB1, function (data) {})
            },
            // 获得网格员信息
            async GetWgyData(userid,orguid){
                let curData;
                let data = await index.fetchData_get(Api.wgyposition,{
                    userid:userid,placecode:orguid,curPage:1,pageSize:2000
                });
                //成功
                if(data.resultCode ==0){
                    let allOnlineData = JSON.parse(data.obj);
                    if( allOnlineData.usertotal <=0){
                        curData = null;

                    }else{
                        //获得当前区域的在线网格员的数据
                        curData = allOnlineData.userList;
                    }
                }else{
                    this.$notify({
                        title: '提示',
                        message: '获取失败，请稍后再试！',
                        duration:3000,
                        type: 'error'
                    });
                    curData = null;
                }
                return curData;
            },
            //地图查询条件
            async getQuery() {
                let whereStr = "";
                //获得查询条件
                //专题编号
                if (this.themeId !== "" && this.themeId !== null && this.themeId !== undefined) {
                    whereStr += "(themeid,eq," + this.themeId + ")";
                }
                //22类判断
                else if (this.type !== "" && this.type !== null && this.type !== undefined) {
                    whereStr += "(eventtype,eq," + this.type + ")";
                }
                //区域判断
                if (this.orguid !== "001") {
                    if (whereStr.length > 0) {
                        // whereStr += "~and(left(orguid,"+this.orguid.length+"),eq," + this.orguid + ")";
                        whereStr += "~and(orguid,like," + this.orguid + "~)";
                    } else {
                        // whereStr += "(left(orguid,"+this.orguid.length+"),eq," + this.orguid + ")";
                        whereStr += "(orguid,like," + this.orguid + "~)";
                    }
                    //zjdata = that.dmap.dbop.getData("(TL,eq,"+orgCode+")","lh_mdjf_qx_wst");  //面


                }
                //开始时间结束时间的筛选
                if (this.values.length > 0) {
                    // let sTime = new Date(this.values[0] + ' 00:00:00').getTime();
                    // let eTime = new Date(this.values[1] + ' 23:59:59').getTime();
                    if (whereStr.length > 0) {
                        whereStr += "~and(createtime,gte," + this.values[0] + " 00:00:00)";
                        whereStr += "~and(createtime,lte," + this.values[1] + " 23:59:59)";
                        //whereStr += "~and(createtime,bw," + this.values[0] + ","+ this.values[1] +")";
                    } else {
                        whereStr += "(createtime,gte," + this.values[0] + " 00:00:00)";
                        whereStr += "~and(createtime,lte," + this.values[1] + " 23:59:59)";
                    }
                }
                //如果选中了事件类型，则判断事件类型
                if(this.citys.length > 1 &&  this.citys.findIndex(item => item === 'all') == -1 ) {
                    let done1= "~and" ;
                    if (whereStr.length <= 0) {
                        done1 = "";
                    }
                    whereStr += done1 + "(eventtype,in," + this.citys.join(',') + ")";
                }
                //等级判断
                if(this.level1 !== '0'){
                    let done = this.level1.split('|')[0];
                    let levelNum =  this.level1.split('|')[1];
                    let rdone='';
                    if(done=='='){
                        rdone='eq';
                    }
                    else if(done=='+='){
                        rdone='gte';
                    }
                    else if(done=='+'){
                        rdone='gt';
                    }
                    else if(done=='-='){
                        rdone='lte';
                    }
                    else if(done=='-'){
                        rdone='lt';
                    }
                    if (whereStr.length > 0) {
                        whereStr += "~and(level,"+rdone+","+levelNum+")";
                    } else {
                        whereStr += "(level,"+rdone+","+levelNum+")";
                    }
                }


                //限制x,y
                if (whereStr.length > 0) {
                    whereStr += "~and(x,gt,0)";
                    whereStr += "~and(y,gt,0)";
                } else {
                    whereStr += "(x,gt,0)";
                    whereStr += "~and(y,gt,0)";
                }


                this.whereStr = whereStr;
            },
            // 修改当前样式
            async SetCurStyleNotChange(x,y ,id){
                await  this.getvideolist(x,y);
                if(this.wgyselectlist.indexOf(id) <= -1){
                    this.wgyselectlist.push(id);
                    $(".curJK").attr("disabled","disabled")
                    $(".curJK").css({"backgroundColor":"rgb(234 232 228)",'cursor':'not-allowed'})
                }
            },
            //根据X和Y坐标获得视频标记marklist，2020/9/17 【吴啸】最新修改
            async getvideolist(x,y) {
                let that = this;
                that.dmap.removeOverlayGroup("jks");

                let videolist = await index.fetchData_get(Api.videomarkerlist + "?x=" + x + "&y=" + y + "", null);
                // console.log("=============videolist:"+videolist)
                if(videolist == '[]' || videolist == null || videolist==undefined || videolist=='' ){
                    return false;
                }
                let markerlist = [];
                let data1 = JSON.parse(videolist);
                let items = [];
                for (let i = 0; i < (data1.length>10 ? 10 : data1.length); i++) {
                    items.push({
                        "channelId": data1[i].channelId,
                        "lng": data1[i].gpsX,
                        "lat": data1[i].gpsY,
                        "name": data1[i].name
                    });
                }

                //创建附近视频标记点位
                for (let i = 0; i < items.length ; i++) {
                    let item = items[i];
                    //获得监控图标
                    let icon=that.myJSMap.Icon("http://10.68.129.154:8119/pages/NSquared/static/img/video.png", new that.myJSMap.Size(30,40));
                    let pnt = new that.myJSMap.Point(item.lng, item.lat);
                    let marker = new that.myJSMap.Marker(pnt, {icon: icon});
                    let mid = "event_video_point" + item.channelId;
                    that.videoIdList.push(mid);
                    marker.id = mid;
                    marker.data = {"id": mid, "channelId": item.channelId, name: item.name};
                    marker.bindTooltip(item.name);
                    //绑定数据和事件
                    marker.on("click", function (e) {
                        //调用父组件的
                        // 方法
                        window.parent.showvideo(item.channelId);
                    })
                    //添加监控的zindex
                    marker.setZIndexOffset(200)
                    // that.dmap.addOverlay(marker);
                    //hesc_i_eventOverlays.push({ "id": mid, "layType": "event_video_point" });
                    markerlist.push(marker);
                }
                let overlayGroup2 = new that.myJSMap.OverlayGroup(markerlist);
                overlayGroup2.id = "jks";

                that.dmap.addOverlayGroup(overlayGroup2);
            },
            //调用钉钉视频连线
            async dingtalk(id){
                let that = this;
                that.$confirm('是否进行钉钉连线', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    if(window.orgtype ==1){
                        let data =await index.fetchData_get(Api.lh.dingtalk,
                            {"id":id,"area":that.areacode});
                        let datalist=JSON.parse(data);
                        console.log("[dingtalk]+++++++++datalist:",datalist);
                        if (datalist.code === 1) {
                            this.$notify({
                                title: '提示',
                                message: '钉钉连线中',
                                duration:3000,
                                type: 'success'
                            });
                        } else {
                            this.$notify({
                                title: '提示',
                                message: '钉钉连线失败！错误内容：' + datalist.msg,
                                duration:3000,
                                type: 'error'
                            });
                        }
                    }else{
                        let data =await index.fetchData_get(Api.lh.dingtalk,
                            {"id":id,"area": window.peopleinfologinid,"type":1});
                        let datalist=JSON.parse(data);
                        console.log("[dingtalk]+++++++++datalist:",datalist);
                        if (datalist.code === 1) {
                            this.$notify({
                                title: '提示',
                                message: '钉钉连线中',
                                duration:3000,
                                type: 'success'
                            });
                        } else {
                            this.$notify({
                                title: '提示',
                                message: '钉钉连线失败！错误内容：' + datalist.msg,
                                duration:3000,
                                type: 'error'
                            });
                        }
                    }
                    window.addlogopt(0,'zj', id ,this.orguid ,this.orgname ,"地图-钉钉连线" ,window.peopleinfologinids)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        duration:3000,
                        message: '钉钉连线失败'
                    });
                    window.addlogopt(0,'zj', id+"，失败" ,this.orguid ,this.orgname ,"地图-钉钉连线" ,window.peopleinfologinids)
                });
            },
            //移除点位和监控
            removeMarkerVideo() {
                //去掉点位
                this.dmap.removeOverlayGroup("eventmarkerlist");
                if(this.videoIdList !=null && this.videoIdList.length >0){
                    //去掉监控
                    this.videoIdList.forEach(item => {
                        this.dmap.removeOverlay(item);
                    });
                }

            },
            async getareainfo(){
                let that = this;

                //获得区域的范围
                if(that.orguid=='001'){
                    that.areafw=null;
                }
                else if( that.orguid.length == 6 ){//区县
                    //获得区县数据
                    let data  = await  index.fetchData_get(Api.lh.getqxinfo , {
                        '_where':'(QX_NAME,eq,'+ that.orgname +')'
                    });
                    if(data !=null && data.length >0 ){
                        that.areafw = {
                            XMAX:data[0]["XMAX"],
                            XMIN:data[0]["XMIN"],
                            YMAX:data[0]["YMAX"],
                            YMIN:data[0]["YMIN"]
                        };
                    }
                }else{
                    //获得镇街数据
                    let data  = await index.fetchData_get(Api.lh.getjdinfo , {
                        '_where' :'(JZ_NAME,eq,'+ that.orgname +')'
                    });
                    if(data !=null && data.length >0 ){
                        that.areafw = {
                            XMAX:data[0]["XMAX"],
                            XMIN:data[0]["XMIN"],
                            YMAX:data[0]["YMAX"],
                            YMIN:data[0]["YMIN"]
                        };
                    }
                }
            },
            //获得事件类型
            async GetEventTypeData(){
                let that = this;
                //获得事件类型 接口
                let eventtype = await index.fetchData_get( Api.lh.eventtype , null);
                //判断接口是否报错   不显示类型下拉
                if(eventtype.type == 40001)
                {
                    that.eventtypeshow = false;
                }else{
                    //显示类型下拉
                    that.etype = eventtype;
                    that.etype.data.unshift({ival:'all',iname:'全选'})
                    that.eventtypeshow = true;
                }
            },
            //返回初始状态按钮点击
            returnToIni(){
                this.level1 = '0';
                //删除等级样式
                window.parent.removelevelchange();
                //类型选项初始化
                this.citys=[];
                //初始化时间
                //获得近一月的开始时间
                this.values=this.valuesold ;
                //地图初始化
                this.changeThemeEvent('','');
            },
            //返回初始状态-  不包括地图
            returnToIniNotMap(){
                this.level1 = '0';
                //删除等级样式
                window.parent.removelevelchange();
                //类型选项初始化
                this.citys=[];
                //初始化时间
                //获得近一月的开始时间
                this.values=this.valuesold ;
            },
            //修改类型数据
            changetypeinfo(type){
                this.citys = new Array();
                this.citys.push(type);
            },
            //修改时间
            changeTimer(){
                this.times = this.times-1;
            },
            //开启倒计时
            openTimeTimer(){
                // console.log('--------open---------------')
                this.times = 30;
                this.timeTimer = setInterval(this.changeTimer, 1000);
                // console.log('--------open----------end-----')
            },
            closeTimeTimer(){
                //倒计时的开启与关闭
                if(this.timeTimer !=null)
                {
                    this.times = 0;
                    clearInterval(this.timeTimer);
                }
            },


        },
        watch:{
            //事件类型选择 - 监控
            citys:function(val,oldval){
                let newindex =  val.indexOf('all'),oldindex =  oldval.indexOf('all');   //获取val和oldval里all的索引,如果没有则返回-1
                if(newindex!=-1 && oldindex==-1 && val.length>1)                       //如果新的选择里有勾选了选择所有选择所有 则 只直线勾选所有整个选项
                    this.citys=['all'];
                else if(newindex!=-1 && oldindex!=-1 && val.length>1)                 //如果操作前有勾选了选择所有且当前也选中了勾选所有且勾选数量大于1  则移除掉勾选所有
                    this.citys.splice(val.indexOf('all'),1)
            }
        }

    }
</script>

<style lang="scss" scoped>
    #map {
        width: 100%;
        height: 100%;
        color: white;
        position: relative;
    }

    /*返回主页按钮*/
    .el-button.is-circle {
        border-radius: 0;
        padding: 4px;
    }

    .el-button--primary {
        color: #303133;
        background-color: #f7f8fa;
        border: 2px solid rgba(0, 0, 0, 0.2);
        background-clip: padding-box;
    }

    .el-button--primary:focus, .el-button--primary:hover {
        background-color: #f4f4f4;
        color: #303133;
        border: 2px solid rgba(0, 0, 0, 0.2);
    }
    /* 下拉 */
    .el-range-editor.is-active, .el-range-editor.is-active:hover {
        border-color: #f7f8fa;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
        width: 260px;
    }

    .banner {
        position: absolute;
        width: 200px;
        height: 50px;
        left: 0;
        right: 0;
        margin: auto;
        line-height: 50px;
        background-color: #2c3e50;
        color: white;
        z-index: 999;
        text-align: center;
        font-size: 24px;
        font-weight: bolder;
        opacity: 0.8;
        border-radius: 5px;
    }

    .left_banner {
        position: absolute;
        width: 260px;
        height: 35px;
        line-height: 35px;
        box-shadow: 0px 2px 6px 2px #000;
        border-radius: 5px;
        background-color: #f2f5f6;
        left: 56px;
        top: 10px;
        z-index: 999;
    }
    .imgexample{
        position: absolute;
        right:0;
        bottom: 0;
        background-color: #fff;
        color:#737478;
        font-size:15px;
        z-index: 3001;
        /*width:70%;*/
    }
    .tl{
        position: absolute;
        right: 71px;
        bottom: 0px;
        min-height: 30px;
        min-width: 400px;
        /*background-color: #fff;*/
        z-index: 1001;
        ul li{
            float: left;
            margin-left: 5px;
            color: #fff;
            border-radius: 16px;
            font-size: 15px;
            display: inline-block;
            vertical-align: middle;
            border: 1px solid #fff;
            box-shadow: 5px 5px 2px #383838;
            padding: 8px 3px 8px 3px;
            .imgs{
                width:34px;
                height:40px;
                vertical-align: middle;
            }

        }
    }
    .curJK{

    }


</style>