<template>
    <div class="Einfo">
        <div style="height:750px;" >
            <div class="dialog_right">
                <p class="content_lx">事件类型:{{iteminfo.type}}             上报时间:{{iteminfo.sbsj}}</p>
                <el-divider content-position="left">事件描述</el-divider>
                <p class="content_con">
                    {{iteminfo.EventLevel === '1'?"【一级】":(iteminfo.EventLevel==='2'?"【二级】":(iteminfo.EventLevel==='3'?"【三级】":(iteminfo.EventLevel==='4'?"【四级】":(iteminfo.EventLevel==='5'?"【五级】":""))))}}{{iteminfo.content}}
                </p>
                <el-divider content-position="left">网格信息</el-divider>
                <p class="content_wg">
                    <span style="display: block;height:30px;line-height:30px;width:380px;float:left;" :title="iteminfo.area">
                        {{iteminfo.area }}
                    </span>
                    <span style="display: block;height:30px;line-height:30px;width:80px;float:left;">
                                        <img @click="dingtalk(iteminfo.userId)" title="网格员视频连线" src="../assets/imgs/mvideo.png"
                                             style="height:26px;cursor:pointer; " >
                        <!--                                     <a target="map" :href="iteminfo.wgmapurl">-->
<!--                                        <img src="../assets/imgs/map_gj.png" style="height:26px;">-->
                        <!--                                    </a>-->
                                    </span>
                    <!--                                <span>-->
                    <!--                                    <a target="map" :href="iteminfo.wgmapurl">-->
                    <!--                                        <img src="../assets/imgs/map_gj.png" style="height:20px;">-->
                    <!--                                    </a>-->
                    <!--                                </span>-->
                    <!--                                <span style="height:30px;width:30px;  display:inline-block;">-->
                    <!--                                     <img title="网格员视频连线" src="../assets/imgs/mvideo.png" style="height:30px; ">-->
                    <!--                                </span>-->
                    <span style="clear: both;"></span>
                </p>
                <el-divider content-position="left">钉钉连线</el-divider>
                <p class="content_ding">
                    <el-select @change="dingtalk(qxcurrent)" style="width:46%;height:30px;" v-model="qxcurrent" placeholder="区县指挥中心">
                        <el-option
                                v-for="item in this.qxOrglist"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select @change="dingtalk(zjcurrent)" style="width:46%;height:30px;" v-model="zjcurrent" placeholder="镇街指挥中心">
                        <el-option
                                v-for="item in this.zjOrglist"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </p>
            </div>
            <div class="dialog_center">
                <el-timeline>
                    <el-timeline-item
                            v-for="(activity, index) in iteminfo.activities"
                            :key="index"
                            :icon="activity.icon"
                            :type="activity.type"
                            :color="activity.color"
                            :size="activity.size"
                            :timestamp="activity.timestamp">
                        {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </div>
            <div class="dialog_left" id="eimap">
            </div>
            <div style="height:320px;width:99%;float:left;margin-top: 20px; " >
                <el-carousel :interval="4000" type="card" height="320px" >
                    <el-carousel-item v-for="(item,index) in iteminfo.imgitems" :key="index" >
                        <!-- <h3 class="medium">{{ item }}</h3>-->
                        <el-image
                                @click="showbigimg(index)"
                                fit="scale-down"
                                :title="item.title"
                                style="width: 480px; height: 320px;"
                                :src="item.src"
                        ></el-image>
                        <div style="position: absolute;height:30px;width:100px;background-color: black;top:0px;line-height: 30px;color:white;">
                            {{item.title}}
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!--viewer图片查看器-->
            <viewer v-show="false" class="images" ref="viewer" :images="bigimgs">
                <img :alt="item.title" v-for="(item,index) in iteminfo.showbigitem" :src="item.src" :key="index" class="image" />
            </viewer>
        </div>
    </div>
</template>

<script>
    //接口调用文件
    import index from '@/api/index';
    import Eventinfo from "../components/eventinfo";

    //接口配置文件
    import {Api} from '@/api/api';
    //viewer事件查看器
    import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
    export default {
        name: "eventinfo",
        data(){
            return{
                iteminfo:{
                    // id:'aaa',
                    // content:'（居民说事）8月1日早，家住西澄河路53号居民陈冬女老人前来社区举报：28号晚7点左右，自己从家中前往公园西门旁边的洗脚的店的路上（广场路）碰到一个穿着时髦40岁左右的女子，跟老人搭讪。实质内容就是宣传法轮功邪教内容，还给老人留下一张字条，内容就是宣传法轮功。老人由于年事已高，又不知道该怎么处置，未第一时间来社区举报，她今天来就想让社区帮忙处理。',
                    // sbsj:'2020-08-06',
                    // type:'矛盾纠纷',
                    // imgitems:[],
                    // showbigitem:[],
                    // activities: [
                    //     {
                    //         content: '【网格上报】',
                    //         timestamp: '2020-08-04 11:37:33',
                    //         size: 'large',
                    //         type: 'primary',
                    //         icon: 'el-icon-more'
                    //     }, {
                    //         content: '【村/社区上报】',
                    //         timestamp: '2020-08-04 14:23:48',
                    //         color: '#0bbd87'
                    //     }, {
                    //         content: '【镇街职能办受理】',
                    //         timestamp: '2020-08-04 14:27:58',
                    //         color: '#cd5e8f'
                    //     }, {
                    //         content: '【镇街职能办办结】锦屏街道，安监办，社区等工作人员到现场指导，后经与其父亲沟通后协同劝解，化险为夷。',
                    //         timestamp: '2020-08-04 16:27:58',
                    //         color: '#d13c7e'
                    //     },
                    //     {
                    //         content: '【网格关闭】',
                    //         timestamp: '2020-08-05 09:27:58'
                    //     },
                    //     {
                    //         content: '【网格关闭】',
                    //         timestamp: '2020-08-05 12:27:58'
                    //     }
                    // ],
                    // area:'鄞州区',
                    // wg:'钟公庙街道后庙社区半岛名邸2',
                    // wgname:'蔺方英',
                    // wgmapurl:'http://10.19.181.153/pubgis/map.jsp?config=screen&amp;loginName=8a93351957cda5740157db93e4ae7617&amp;orgType=134&amp;orgUid=001006023004003&amp;locateCoord=121.54509340478788,29.83097754863277&amp;canEdit',
                    // mapiframe:'<iframe id="gisIframe" frameborder="0" scrolling="no"\n' + '                                        src="http://10.19.181.153/pubgis/flex/map.html?wmode=opaque&amp;coordinatex=121.54509340478788&amp;coordinatey=29.83097754863277&amp;config=config-locate.xml"\n' +'                                        width="300px" height="385px"></iframe>'
                },     //事件详情数据
                areacode:'001',              //组织code,默认001,宁波市
                qxOrglist:[],                //事件对应区县指挥中心账号list
                zjOrglist:[],                //事件对应镇街指挥中心账号list
                qxcurrent:'',                //区县指挥中心选中值
                zjcurrent:'',                //镇街指挥中心选中值
                bigimgs:[],                  //viewer图片查看器图片数组
                hesc_i_eventOverlays:[],     //点位数组
                eventinfomap:{type:Object},  //事件详情页地图对象
                eventinfojsmap:{type:Object}, //事件详情页地图jsmap
                videoIdList:new Array(),
            }
        },
        async created() {
            window.setareacode = this.setareacode;
            window.bindeventinfo = this.bindeventinfo;
        },
        methods:{
            //初始化事件详情地图
            async initmap(x,y){
                this.$nextTick(()=> {
                    let that=this;
                        window.require(["jsmap"], function () {
                            that.eventinfomap = JSMap.Map("eimap", {mapType: "电子地图(高端灰)"}); //初始化时候自定义底图
                            that.eventinfojsmap = JSMap;
                            that.eventinfomap.centerAndZoom(new JSMap.Point(121.535, 29.873), 1);
                            that.eventinfomap.setMaxZoom(9);
                            that.eventinfomap.setMinZoom(1);


                            let pnt = new JSMap.Point(x, y);
                            //点位图标
                            let icon=new JSMap.IconMarker({
                                icon: 'fa-bandcamp',//icon名称参考：http://www.fontawesome.com.cn/faicons/
                                iconColor: 'white',//小图标的颜色
                                markerColor: 'yellow',//大图标的样式
                                prefix: 'fa'
                            });
                            let marker = new JSMap.Marker(pnt,{icon:icon});
                            let mid = "event_point";

                            marker.id = mid;
                            marker.data = { id: mid, name: "" };
                            //点击点后移除该点
                            // marker.on("click", function (e) {
                            //     that.eventinfomap.removeOverlay(marker);
                            //
                            // })
                            that.eventinfomap.addOverlay(marker);
                            //飞行到指定坐标位置
                            that.eventinfomap.flyToLayer(marker);
                            //添加监控点位
                            that.getvideolist({x:x,y:y});
                        });
                });
            },
            //初始化事件详情地图fetchData_get
            async setmap(x,y){
                this.$nextTick(()=> {
                    let that=this;
                    window.require(["jsmap"], function () {
                        that.eventinfomap = JSMap.Map("eimap", {mapType: "电子地图(高端灰)"}); //初始化时候自定义底图
                        that.eventinfojsmap = JSMap;
                        that.eventinfomap.centerAndZoom(new JSMap.Point(121.535, 29.873), 1);
                        that.eventinfomap.setMaxZoom(9);
                        that.eventinfomap.setMinZoom(1);


                        let pnt = new JSMap.Point(x, y);
                        //点位图标
                        let icon=new JSMap.IconMarker({
                            icon: 'fa-bandcamp',//icon名称参考：http://www.fontawesome.com.cn/faicons/
                            iconColor: 'white',//小图标的颜色
                            markerColor: 'yellow',//大图标的样式
                            prefix: 'fa'
                        });
                        let marker = new JSMap.Marker(pnt,{icon:icon});
                        let mid = "event_point";

                        marker.id = mid;
                        marker.data = { id: mid, name: "" };
                        //点击点后移除该点
                        // marker.on("click", function (e) {
                        //     that.eventinfomap.removeOverlay(marker);
                        //
                        // })
                        that.eventinfomap.addOverlay(marker);
                        //飞行到指定坐标位置
                        that.eventinfomap.flyToLayer(marker);
                        //添加监控点位
                        that.getvideolist({x:x,y:y});
                    });
                });
            },
            //设置areacode方法
            setareacode(id){
              this.areacode=id;
              //console.log("[事件详情页]+++++++++++++this.areacode:",this.areacode);
            },
            //事件详情接口
            async bindeventinfo(id){
                this.qxOrglist=[];
                this.zjOrglist=[];
                this.qxcurrent='';
                this.zjcurrent='';
                this.iteminfo=[];
                this.setmarker();
                //调用廖红事件详细接口同时返回区县和镇街的账号以及id
                let data =await index.fetchData_get(Api.lh.eventinfo,
                    {"id":id});
                let eventinfo=data;
                //console.log("[dingtalk]++++eventinfo:", eventinfo);
                let qxsz = [];
                if(eventinfo.data[0].qxOrgID!=null){
                    qxsz = eventinfo.data[0].qxOrgID.split(',');
                }
                let zjsz = [];
                if(eventinfo.data[0].zjOrgID!=null){
                    zjsz = eventinfo.data[0].zjOrgID.split(',');
                }


                this.iteminfo.id=eventinfo.data[0].ID;
                this.iteminfo.content=window.filterPhone(eventinfo.data[0].content);
                this.iteminfo.sbsj=eventinfo.data[0].ctime.toString().replace('T',' ');
                this.iteminfo.type=eventinfo.data[0].typename;
                this.iteminfo.EventLevel = eventinfo.data[0].EventLevel;
                this.iteminfo.userId = eventinfo.data[0].userId;
                //处置图片集
                this.iteminfo.imgitems=[];
                let czqimg=eventinfo.data[0].sImage;
                let czhimg=eventinfo.data[0].eImage;
                if(czqimg!=null){
                    for(let j=0;j<czqimg.length;j++){
                        if(czqimg[j]!==''){
                            this.iteminfo.imgitems.push({title:'处置前图片['+(j+1)+']',src:czqimg[j]});
                        }
                    }
                }
                if(czhimg!=null){
                    for(let j=0;j<czhimg.length;j++){
                        if(czhimg[j]!==''){
                            this.iteminfo.imgitems.push({title:'处置后图片['+(j+1)+']',src:czhimg[j]});
                        }
                    }
                }
                //处置流程
                this.iteminfo.activities=[];
                for(let z=0;z<eventinfo.data[0].Steps.length;z++){
                    let type= eventinfo.data[0].Steps[z].DISPTYPE+eventinfo.data[0].Steps[z].ORGType;
                    let typename="";
                    switch (type) {
                        case "1135":
                            typename="网格上报";
                            break;
                        case "1134":
                            typename="村/社区上报";
                            break;
                        case "1133":
                            typename="镇街中心上报";
                            break;
                        case "1132":
                            typename="镇街科室上报";
                            break;
                        case "2134":
                            typename="村/社区受理";
                            break;
                        case "2133":
                            typename="镇街中心受理";
                            break;
                        case "2132":
                            typename="镇街科室受理";
                            break;
                        case "2122":
                            typename="区县科室受理";
                            break;
                        case "2123":
                            typename="区县中心受理";
                            break;
                        case "3134":
                            typename="村/社区办结";
                            break;
                        case "3132":
                            typename="镇街科室办结";
                            break;
                        case "3122":
                            typename="区县科室办结";
                            break;
                        case "4133":
                            typename="镇街中心派发";
                            break;
                        case "4123":
                            typename="区县中心派发";
                            break;
                        case "4137":
                            typename="区县中心派发";
                            break;
                        case "6132":
                            typename="镇街科室联合处置";
                            break;
                        case "8135":
                            typename="网格关闭";
                            default:
                                if(type.indexOf('1')==0)
                                {
                                    typename="上报";
                                }else if(type.indexOf('2')==0)
                                {
                                    typename="受理";
                                }else if(type.indexOf('3')==0)
                                {
                                    typename="办结";
                                }
                                else if(type.indexOf('4')==0)
                                {
                                    typename="派发";
                                }
                                else if(type.indexOf('5')==0)
                                {
                                    typename="退回";
                                }
                                else if(type.indexOf('6')==0)
                                {
                                    typename="联合处置";
                                }else if(type.indexOf('8')==0)
                                {
                                    typename="关闭";
                                }else{
                                    typename="其他";
                                }
                                break;
                    }


                    if(z===0){
                        this.iteminfo.activities.push(
                            {
                                content: '【'+typename+'】'+eventinfo.data[0].Steps[z].content+'',
                                timestamp: eventinfo.data[0].Steps[z].CREATETIME.toString().replace('T',' '),
                                size: 'large',
                                type: 'primary',
                                icon: 'el-icon-more'
                            }
                        );
                    }
                    else if(z===1){
                        this.iteminfo.activities.push(
                            {
                                content: '【'+typename+'】'+eventinfo.data[0].Steps[z].content+'',
                                timestamp: eventinfo.data[0].Steps[z].CREATETIME.toString().replace('T',' '),
                                color: '#0bbd87'
                            }
                        );
                    }
                    else if(z===2){
                        this.iteminfo.activities.push(
                            {
                                content: '【'+typename+'】'+eventinfo.data[0].Steps[z].content+'',
                                timestamp: eventinfo.data[0].Steps[z].CREATETIME.toString().replace('T',' '),
                                color: '#cd5e8f'
                            }
                        );
                    }
                    else if(type=="8135"){
                        this.iteminfo.activities.push(
                            {
                                content: '【'+typename+'】'+eventinfo.data[0].Steps[z].content+'',
                                timestamp: eventinfo.data[0].Steps[z].CREATETIME.toString().replace('T',' '),
                                color: '#172741'
                            }
                        );
                    }
                    else{
                        this.iteminfo.activities.push(
                            {
                                content: '【'+typename+'】'+eventinfo.data[0].Steps[z].content+'',
                                timestamp: eventinfo.data[0].Steps[z].CREATETIME.toString().replace('T',' '),
                                color: '#1fb4cd'
                            }
                        );
                    }
                }
                this.iteminfo.area = eventinfo.data[0].area;
                //this.iteminfo.wg=eventinfo.data[0].area;
                //this.iteminfo.wgname=datalist[0].上报人;
                this.iteminfo.wgmapurl=eventinfo.data[0].arealink;
                this.iteminfo.mapiframe='<iframe id="gisIframe" frameborder="0" scrolling="no" src="http://10.19.181.153/pubgis/flex/map.html?wmode=opaque&amp;coordinatex='+eventinfo.data[0].xFiled+'&amp;coordinatey='+eventinfo.data[0].yFiled+'&amp;config=config-locate.xml"  width="300px" height="385px"></iframe>';
                //钉钉：区县+镇街
                if(qxsz.length>0){
                    for(let z=0;z<qxsz.length;z++){
                        if(qxsz[z].indexOf('|')>0){
                            this.qxOrglist.push({
                                    name:qxsz[z].split('|')[1],
                                    value:qxsz[z].split('|')[0],
                                }
                            );
                        }
                    }
                }
                if(zjsz.length>0){
                    for(let z=0;z<zjsz.length;z++){
                        if(zjsz[z].indexOf('|')>0){
                            this.zjOrglist.push({
                                    name:zjsz[z].split('|')[1],
                                    value:zjsz[z].split('|')[0],
                                }
                            );
                        }
                    }
                }
                //console.log("[dingtalk]++++this.qxOrglist:", this.qxOrglist);
                //console.log("[dingtalk]++++this.zjOrglist:", this.zjOrglist);


                this.initmap(eventinfo.data[0].xFiled,eventinfo.data[0].yFiled);

                //调用是否开启父容器地图定位
                /*if(ispositon==true){
                    //设置点位
                    this.setmarker(eventinfo.data[0].xFiled,eventinfo.data[0].yFiled);
                }*/
            },
            //调用钉钉视频连线
            async dingtalk(id){
                let that = this;
                that.$confirm('是否进行钉钉连线', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    if(parent.window.orgtype ==1){
                        let data =await index.fetchData_get(Api.lh.dingtalk,
                            {"id":id,"area":that.areacode});
                        let datalist=JSON.parse(data);
                        //console.log("[dingtalk]+++++++++datalist:",datalist);
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
                        //console.log("[dingtalk]+++++++++datalist:",datalist);
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


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        duration:3000,
                        message: '钉钉连线失败'
                    });
                });
                //console.log("[dingtalk]+++++++++++:",datalist);

            },
            //图片放大
            showbigimg (idx) {
                this.iteminfo.showbigitem=[];
                this.iteminfo.showbigitem=this.iteminfo.imgitems;
                this.iteminfo.showbigitem.forEach(item=>{
                    this.bigimgs.push(item.src);
                });
                //dom加载完成后执行viewer图片查看器
                this.$nextTick(()=>{
                    const viewer= this.$refs.viewer;
                    viewer.$viewer.show();
                    viewer.$viewer.index=idx;
                    //console.log("++++++++++viewer",viewer);
                });
            },
            //是否开启父容器事件定位
            setmarker(x,y){
                let jsMap = parent.window.dmaplayer;
                let hesc_map = parent.window.map;
                if (hesc_map != null&x!=null&&y!=null) {
                    //删除之前定位的点位
                   this.hesc_bi_removeAllEventOverlays(hesc_map);
                    let pnt = new jsMap.Point(x, y);
                    let marker = new jsMap.Marker(pnt);
                    let mid = "event_point";
                    marker.id = mid;
                    marker.data = { id: mid, name: "" };
                    marker.on("click", function (e) {
                        hesc_map.removeOverlay(marker);

                    })
                    hesc_map.addOverlay(marker);
                    this.hesc_i_eventOverlays.push({ "id": mid, "layType": "event_point" });
                    //飞行到指定坐标位置
                    hesc_map.flyToLayer(marker);
                }
                else{
                    //console.log("[事件详情]+++++++++++++hesc_map:",hesc_map);
                }



            },
            //删除之前定位的定位
            hesc_bi_removeAllEventOverlays(hesc_map){
                if (this.hesc_i_eventOverlays.length > 0) {
                    for (let i = 0; i < this.hesc_i_eventOverlays.length; i++) {
                        let item = this.hesc_i_eventOverlays[i];
                        hesc_map.removeOverlay(item.id);
                    }
                    this.hesc_i_eventOverlays = [];
                }
            },
            //根据X和Y坐标获得视频标记marklist，2020/9/17 【吴啸】最新修改
            async getvideolist(obj){
                let that=this;
                let videolist = await index.fetchData_get(Api.videomarkerlist+"?x="+obj.x+"&y="+obj.y+"",null);
                if(videolist == '[]' || videolist == null || videolist==undefined || videolist=='' ){
                    return false;
                }
                let data1= JSON.parse(videolist);
                let items = [];
                for (let i = 0; i < data1.length; i++) {
                    items.push({ "channelId": data1[i].channelId, "lng": data1[i].gpsX, "lat": data1[i].gpsY, "name": data1[i].name });
                }

                //创建附近视频标记点位
                for (let i = 0; i < items.length; i++) {
                    let item = items[i];
                    //定义监控图标
                    let icon=that.eventinfojsmap.Icon("http://10.68.129.154:8119/pages/NSquared/static/img/video.png", new that.eventinfojsmap.Size(30,40));
                    let pnt = new that.eventinfojsmap.Point(item.lng, item.lat);
                    let marker = new that.eventinfojsmap.Marker(pnt, { icon: icon });
                    let mid = "event_video_point" + item.channelId;
                    that.videoIdList.push(mid);
                    marker.id = mid;
                    marker.data = { "id": mid, "channelId": item.channelId, name: item.name };
                    marker.bindTooltip(item.name);
                    //绑定数据和事件
                    marker.on("click", function (e) {
                        //调用父组件的showvideo方法
                        window.parent.showvideo(item.channelId);
                    })
                    that.eventinfomap.addOverlay(marker);
                    //hesc_i_eventOverlays.push({ "id": mid, "layType": "event_video_point" });
                }
            },
        }
    }
</script>


<style>
    .el-card{
        margin: 9px;
        border:none !important;
        background-color: inherit !important;
        float:left;
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
    .el-dialog .el-dialog__body{
        flex:1;
        overflow: hidden;
        overflow-y: auto;
    }
    .el-dialog__body::-webkit-scrollbar {
        width: 5px;
        opacity: 0.6;
    }
    .el-dialog__body::-webkit-scrollbar-track {
        background-color: #ffffff;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
    }
    .el-dialog__body::-webkit-scrollbar-thumb {
        background-color: #8c939d;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
    }
</style>
<style scoped>
    .Einfo{
        width:1200px;
        min-height:100px;

    }
    .content_lx {
        height: 30px;
        font-size: 16px;
        color: #990000;
        text-indent: 24px;
        font-family: "Microsoft YaHei UI";
        margin: 0px;
    }
    .content_wg {
        color: #990000;
        text-indent: 24px;
        line-height: 30px;
        height:30px;
        width:100%;
        font-size: 14px;
        font-family: "Microsoft YaHei UI";
    }
    .content_ding{
        line-height: 26px;
        text-indent: 9px;
    }
    .content_sbsj {
        height: 34px;
        line-height: 34px;
        font-size: 18px;
        font-weight: bolder;
        color: #990000;
        text-indent: 25px;
    }
    .content_con {
        text-align:justify;
        text-indent: 26px;
        line-height: 26px;
        display: block;
        height:146px;
        min-height: 146px;
        overflow: hidden;
        overflow-y: auto;
        color: #172740;
        font-size: 16px;
        font-family: "Microsoft YaHei UI";
    }
    /*设置 class为p_left的div滚动条样式*/
    .content_con::-webkit-scrollbar {
        width: 5px;
        opacity: 0.6;
    }
    .content_con::-webkit-scrollbar-track {
    background-color: #ffffff;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
    }
    .content_con::-webkit-scrollbar-thumb {
    background-color: #8c939d;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
    }
    .dialog_left {
        float: left;
        width: 300px;
        height: 375px;
        background-color: #DFDFDF;
        margin-left: 9px;
        border-radius: 5px;
        border: solid 1px #DFDFDF;
        box-shadow: 0px 1px 3px 3px gray;
        overflow: hidden;
    }
    .dialog_center {
        float: left;
        width: 350px;
        height: 355px;
        overflow: hidden;
        overflow-y: auto;
        text-align: left;
        margin-left: 9px;
        border: solid 1px #DFDFDF;
        border-radius: 5px;
        padding: 10px;
        background-color: #DFDFDF;
        box-shadow: 0px 1px 3px 3px gray;
    }
    .dialog_right {
        text-align: left;
        padding: 10px;
        float: left;
        width: 465px;
        height: 355px;
        background-color: #DFDFDF;
        box-shadow: 0px 1px 3px 3px gray;
        border: solid 1px #f3f3f3;
        border-radius: 5px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #dfdfdf;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #dfdfdf;
    }
    p {
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
    }
</style>