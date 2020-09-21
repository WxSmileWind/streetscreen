<template>
    <div id="map" >
        <!--        <div class="left_banner">-->

        <!--        </div>-->
        <el-date-picker
                v-model="values"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :disabled="false"
                :style="{zIndex:999}"
                @change="changeThemeEvent('','')"
        ></el-date-picker>
        <!--        <el-button type="primary" plain @click="">查询</el-button>-->
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
    </div>
</template>

<script>
    //接口调用文件
    import index from '@/api/index';
    //接口配置文件
    import {Api} from '@/api/api';
    export default {
        name: "tiandt",
        data(){
            return {
                x:'121.535',
                y:'29.873',
                eventinfoshow:false,
                eventinfourl:'',
                dmap:{type:Object},
                myJSMap:null,
                orguid:'001',
                orgname:'',
                type:'',
               // themeId:'4d18c15c-ae7c-4630-9403-940a7df4fab9',
                themeId:'',
                stime:'',
                etime:'',
                values:['20'],
                whereStr:'',
                videolist:[]
            }
        },

        created() {
            this.TimeFormat();
        },
        mounted() {
            //this.setmarker(null);
            //this.initmap();
        },
        methods:{
            //初始化点位+画面
            async initmap(orgCode,orgname,types){
                this.$nextTick(()=> {
                    let that=this;  //将方法放在mounted，会有指向问题，定义this使用就会正常
                    window.require(["jsmap"], function () {
                        //var  map=jsmap.Map("map");//使用默认底图
                        // eslint-disable-next-line no-undef
                        that.dmap = JSMap.Map("map", {mapType: "电子地图(高端灰)"}); //初始化时候自定义底图
                        that.myJSMap = JSMap;
                        that.orgname = orgname;
                        that.type = types;
                        // eslint-disable-next-line no-undef
                        that.dmap.centerAndZoom(new JSMap.Point(121.535, 29.873), 1);
                        that.dmap.setMaxZoom(9);
                        that.dmap.setMinZoom(1);
                        // eslint-disable-next-line no-unused-vars
                        let opt={
                            fillColor:"#0445a7",
                            color:"#ff0000"
                        }
                        let zjdata=null;
                        that.orguid =orgCode;
                        if(orgCode!= '001'){
                            if(orgCode.length == 6)
                            {
                                zjdata=that.dmap.getLayerXSQ(that.orgname);
                                //zjdata = that.dmap.dbop.getData("(TL,eq,"+orgCode+")","lh_mdjf_qx_wst");  //面
                            }else{
                                zjdata=that.dmap.getLayerJD(that.orgname);
                                console.log("[mappp]+++++++++++++orgname:",orgname);
                                console.log("[mappp]+++++++++++++zjdata:",zjdata);
                                //zjdata = that.dmap.dbop.getData("(JZ_NUMBER,eq,"+orgCode+")","lh_mdjf_jiedao_wst");  //面
                            }
                            /*
                            // eslint-disable-next-line no-undef
                            let arrPois=JSMap.getPoints(zjdata[0].SHAPE);
                            // eslint-disable-next-line no-undef
                            let polygon=JSMap.Polygon(arrPois,opt);
                            that.dmap.flyToLayer(polygon,true,function(){
                                // eslint-disable-next-line no-undef,no-unused-vars
                                let buffer=JSMap.getLayerBuffer(polygon,100,function(layerBuffer){
                                    that.dmap.addOverlay(layerBuffer);
                                })
                            })
                            */
                            zjdata.options.fill=false
                            that.dmap.flyToLayer(zjdata)
                            //添加围栏
                            that.dmap.setFenceLayer(zjdata)
                        }
                        that.SetMapZoom(JSMap);
                        //修改部分
                        window.map=that.dmap;

                        //修改部分
                        that.dmaplayer=JSMap;
                        window.dmaplayer=that.dmaplayer;

                        //修改部分
                        window.map=that.dmap;

                        //修改部分
                        that.dmaplayer=JSMap;
                        window.dmaplayer=that.dmaplayer;
                        // // eslint-disable-next-line no-undef
                        // let marker2 = new JSMap.Marker(new JSMap.Point(121.533,29.87));
                        // that.dmap.addOverlay(marker2);
                        // //绑定点位弹出框
                        // marker2.bindPopup("<font size=5>事件标记点位");
                        // //绑定点位tip提示信息,支持html
                        // marker2.bindTooltip("我是点233333333333333333333333");
                        // //that.dmap.setFenceLayer(layerBuffer);
                        // // eslint-disable-next-line no-console
                        // console.log("##################dmap:",that.dmap);
                    });
                });
            },
            //设置标记点位, 2020/9/17 【吴啸】最新修改
            async setmarker(MarkerList){
                // await this.initmap();


                let that=this;
                console.log("[天地图子组件]+++++++++++++that.dmap:",that.dmap);
                //自定义图标
                window.require(["jsmap"], function () {
                    that.dmap.removeOverlayGroup("eventmarkerlist");
                    // let icon=JSMap.Icon("http://10.68.132.104/JSMap/demo/icon/marker-icon-red.png", new JSMap.Size(25,41));
                    // let marker3 = new JSMap.Marker(new JSMap.Point(121.539,29.87),{icon:icon});
                    // marker3.bindTooltip("自定义图标");
                    // MarkerList.For
                    let markerlist=[];
                    // eslint-disable-next-line no-console
                    console.log("#####################MarkerList:",MarkerList);
                    MarkerList.forEach(item=>{
                        // eslint-disable-next-line no-undef
                        let icon=new JSMap.IconMarker({
                            icon: 'fa-circle-o-notch',//icon名称参考：http://www.fontawesome.com.cn/faicons/
                            iconColor:item.iconColor,
                            markerColor: 'black',
                            prefix: 'fa',
                            extraClasses: 'fa-spin' //让图标旋转
                        });
                        // eslint-disable-next-line no-undef
                        let marker=new JSMap.Marker(new JSMap.Point(item.x,item.y),{icon:icon});
                        //marker.bindPopup("<h1>"+item.title+"</h1><p>"+item.content+"</p>");
                        marker.on("click",function(e){
                            console.log("++++++++++++++e:",e);
                            console.log("++++++++++++++e.target:",e.target);
                            that.eventinfoshow = true;
                            that.eventinfourl = "http://10.68.129.154:8119/pages/ZJDPEventDetail.html?id=" + item.id+"&isShow=1&areaCode="+that.orguid;
                            //alert(e.target)
                        })
                        markerlist.push(marker);
                    });

                    // eslint-disable-next-line no-undef
                    let overlayGroup2=new JSMap.OverlayGroup(markerlist);
                    overlayGroup2.id="eventmarkerlist";
                    that.dmap.addOverlayGroup(overlayGroup2);
                    //飞行至这些点位
                    that.dmap.flyToLayer(markerlist[0]);


                    for (const item of MarkerList) {
                        that.getvideolist(item);
                    }

                });
            },
            //添加图层
            async SetMapZoom(maps)
            {
                let that = this;
                let imageSrc = require("../assets/MapIcons/corp1.png");
               // let imageSrcs = require("../assets/MapIcons/corp{val1}.png");
                that.dmap.removeXYLayer("网格中心");
                that.dmap.removeXYLayer("图标");
                //查询条件
                that.getQuery();
                //自定义的icon图标
                let optData = {
                    //数据结构
                    field: "val1,themeid,diffid,orgqxname,eventid,createtime,t1,t6,t7,themeid",
                    where:that.whereStr
                        //"(themeid,eq," + that.themeId + ")"+"~and(t1,eq," + that.orguid + ")"+"~and(createtime,gte," + that.values[0] + " 00:00:00)"+"~and(createtime,lte," + this.values[1] + " 00:00:00)",
                    ,x: "x", //x字段(经度)
                    y: "y", //y字段（纬度）
                    size: 5000
                };
                //定义样式:图标
                let optTB = {
                    data: optData,
                    symbol: {
                        type: "Cluster",
                        icon: new maps.Icon(imageSrc, new maps.Size(30, 40)),
                        bindIconField: 'http://10.68.129.154:8119/pages/NSquared/static/img/corp{val1}.png',
                        minZoom: 1,
                        maxZoom: 4,
                    },
                    //响应动作
                    action: {
                        //bindTooltip: "<iframe style='width:1480px;height:602px;border: 0px;' scrolling='no' src='/pages/EventDetailRequest.html?id={eventid}')></iframe>",
                        //bindPopup: "<iframe style='width:315px;height:150px;border: 0px;' scrolling='no' src='/pages/EventDetailRequest.html?id={eventid}')></iframe>",
                        bindClick: function (item) {
                            var eventid = item.eventid;
                            that.eventinfoshow = true;
                            that.eventinfourl = "http://10.68.129.154:8119/pages/ZJDPEventDetail.html?id=" + eventid+"&isShow=1&areaCode="+that.orguid;
                        }
                    }
                };

                this.dmap.addXYLayer("网格中心", "center_theme_flashpointmap", optTB)

                //定义样式:图标
                let optTB1 = {
                    data: optData,
                    symbol: {
                        type: "Marker",
                        icon: new maps.Icon(imageSrc, new maps.Size(30, 40)),
                        bindIconField: 'http://10.68.129.154:8119/pages/NSquared/static/img/corp{val1}.png',
                        minZoom: 5,
                        maxZoom: 9,
                  },
                    //响应动作
                    action: {
                        //bindTooltip: "<iframe style='width:1480px;height:602px;border: 0px;' scrolling='no' src='/pages/EventDetailRequest.html?id={eventid}')></iframe>",
                        //bindPopup: "<iframe style='width:315px;height:150px;border: 0px;' scrolling='no' src='/pages/EventDetailRequest.html?id={eventid}')></iframe>",
                        bindClick: function (item) {
                            var eventid = item.eventid;
                            that.eventinfoshow = true;
                            that.eventinfourl = "http://10.68.129.154:8119/pages/ZJDPEventDetail.html?id=" + eventid+"&isShow=1&areaCode="+that.orguid;
                        }
                    }
                };
                this.dmap.addXYLayer("图标", "center_theme_flashpointmap", optTB1, function (data) {

                })

                this.SetQXFont();
                this.SetZJFont()
            },
            //地图专题切换事件
            async changeThemeEvent(themeId,types)
            {
                let that =  this;
                if(themeId != "")
                {
                    that.themeId = themeId;
                    that.type = types;
                }

                if (that.dmap === null || that.dmap === undefined || that.dmap === "") {
                    that.initmap(that.orguid , that.orgname);
                }

                this.RemoveQXFont();
                this.RemoveZJFont();
                let zjdata = null;
                if(that.orguid!= '001'){
                    if(that.orguid.length == 6)
                    {
                        zjdata=that.dmap.getLayerXSQ(that.orgname)
                        //zjdata = that.dmap.dbop.getData("(TL,eq,"+orgCode+")","lh_mdjf_qx_wst");  //面
                    }else{
                        console.log("[map]++++++++++++that.orgname:",that.orgname);
                        zjdata=that.dmap.getLayerJD(that.orgname)
                        console.log("[map]++++++++++++zjdata:",zjdata);
                        //zjdata = that.dmap.dbop.getData("(JZ_NUMBER,eq,"+orgCode+")","lh_mdjf_jiedao_wst");  //面
                    }
                }
                if(that.orguid!= '001'){
                    that.dmap.removeflyTo()
                    //添加围栏
                    that.dmap.clearFenceLayer()

                    zjdata.options.fill=false
                    that.dmap.flyToLayer(zjdata)
                    //添加围栏
                    that.dmap.setFenceLayer(zjdata)
                }

                that.SetMapZoom(that.myJSMap);
            },
            //区县标记
            async SetQXFont(){
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
            },
            //去除 - 区县标记
            async RemoveQXFont(){
                this.dmap.removeXYLayer("区县注记图");
            }
            ,//镇街标记
            async SetZJFont(maps){
                //镇街标记
                var optZJName = {
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
                            size: 12, //文字大小
                            font: '18px Arial', //字体
                            fillStyle: 'rgb(212, 130, 101)', //文字颜色
                            shadowColor: '#fff'
                        },
                        minZoom: 5,
                        maxZoom: 9
                    }
                };
                this.dmap.addXYLayer("镇街注记图", "jsmap_jiedao", optZJName);
            },
            //去除 - 镇街标记
            async RemoveZJFont(maps){
                this.dmap.removeXYLayer("镇街注记图");
            },
            //时间格式化
            async TimeFormat(){
                let date = new Date()
                let month = date.getMonth() + 1
                let day = date.getDate();
                let year = date.getFullYear();

                let currentday=year+"-"+(month>9?month:('0'+month))+"-"+day;

                switch (month) {
                    case 1:
                    case 2:
                    case 3:
                        month+=9;
                        year--;
                        break;
                        default:
                            month-=3;
                            break;

                }

                this.values = [year+"-"+(month>9?month:('0'+month))+"-01",currentday];
            },
            //关闭事件详情弹出框
            cleareventinfo(){
                this.eventinfourl="";
                this.eventinfoshow=false;
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
                    whereStr += "(t6,eq," + this.type + ")";
                }
                //区域判断
                if (this.orguid !== "001") {
                    if(this.orguid.length == 6)
                    {
                        if(whereStr.length>0){
                            whereStr += "~and(t1,eq," + this.orguid + ")";
                        }
                        else{
                            whereStr += "(t1,eq," + this.orguid + ")";
                        }
                        //zjdata = that.dmap.dbop.getData("(TL,eq,"+orgCode+")","lh_mdjf_qx_wst");  //面
                    }else{

                        if(whereStr.length>0){
                            whereStr += "~and(t7,eq," + this.orguid + ")";
                        }
                        else{
                            whereStr += "(t7,eq," + this.orguid + ")";
                        }
                        //zjdata = that.dmap.dbop.getData("(JZ_NUMBER,eq,"+orgCode+")","lh_mdjf_jiedao_wst");  //面
                    }

                }else{
                    whereStr += "(t1,like," + this.orguid + "~)";
                }
                if(this.values.length >0)
                {
                    let sTime = new Date(this.values[0]+' 00:00:00').getTime();
                    let eTime = new Date(this.values[1]+' 00:00:00').getTime();
                    whereStr += "~and(createtime,gte," + this.values[0] + " 00:00:00)";
                    whereStr += "~and(createtime,lte," + this.values[1] + " 00:00:00)";
                    //whereStr += "~and(createtime,bw," + this.values[0] + ","+ this.values[1] +")";
                }
                //限制地图数据为当月数据
                // var date=new Date();
                // date.setDate(1);
                // date.setMinutes(0);
                // date.setHours(0);
                // date.setSeconds(0);
                // whereStr += "~and(t2,gte," + date.getTime() + ")";
                this.whereStr = whereStr;

            },
            //根据X和Y坐标获得视频标记marklist，2020/9/17 【吴啸】最新修改
            async getvideolist(obj){
                let that=this;
                let videolist = await index.fetchData_get(Api.videomarkerlist+"?x="+obj.x+"&y="+obj.y+"",null);
                let data1= JSON.parse(videolist);
                let items = [];
                for (let i = 0; i < data1.length; i++) {
                    items.push({ "channelId": data1[i].channelId, "lng": data1[i].gpsX, "lat": data1[i].gpsY, "name": data1[i].name });
                }
                console.log("[天地图组件]+++++++++++++++获取到videomarkerlist:",items);
                //创建附近视频标记点位
                for (let i = 0; i < items.length; i++) {
                    let item = items[i];
                    //自定义图片符号
                    // var icon = jsMap.Icon("/pages/images/sp1.png", new jsMap.Size(45, 60));
                    let icon=new that.myJSMap.IconMarker({
                        icon: 'fa-camera',
                        iconColor:'#ff0000',//小图标的颜色
                        markerColor: 'white',//大图标的样式
                        prefix: 'fa'
                    });
                    let pnt = new that.myJSMap.Point(item.lng, item.lat);
                    let marker = new that.myJSMap.Marker(pnt, { icon: icon });
                    let mid = "event_video_point" + item.channelId;
                    marker.id = mid;
                    marker.data = { "id": mid, "channelId": item.channelId, name: item.name };
                    marker.bindTooltip(item.name);
                    //绑定数据和事件
                    marker.on("click", function (e) {
                        //调用父组件的showvideo方法
                        window.parent.showvideo(item.channelId);
                    })
                    that.dmap.addOverlay(marker);
                    //hesc_i_eventOverlays.push({ "id": mid, "layType": "event_video_point" });
                }
            }
        }

    }
</script>

<style scoped>
    #map {
        width: 100%;
        height: 100%;
        color: white;
        position: relative;
    }
    .banner{
        position: absolute;
        width:200px;
        height:50px;
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
    .left_banner{
        position: absolute;
        width:260px;
        height:35px;
        line-height: 35px;
        box-shadow: 0px 2px 6px 2px #000;
        border-radius: 5px;
        background-color: #f2f5f6;
        left: 56px;
        top: 10px;
        z-index: 999;
    }
</style>