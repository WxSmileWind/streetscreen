<template>
    <div id="map" >
        <div class="left_banner">

        </div>
        <!--事件详情 弹出框-->
        <el-dialog  element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    title="事件详情"
                    :visible.sync="eventinfoshow"
                    :modal="true"
                    :modal-append-to-body='false'
                    width="1000px" >
            <iframe width="100%" height="500px" :src="eventinfourl">
            </iframe>
        </el-dialog>
    </div>
</template>

<script>
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
                themeId:'f26c125f-86d6-40fe-a446-b7cb837b57fc'
            }
        },

        created() {

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
                          that.dmap.setMaxZoom(6);
                          that.dmap.setMinZoom(1);
                          // eslint-disable-next-line no-unused-vars
                          let opt={
                              fillColor:"#0445a7",
                              color:"#ff0000"
                          }
                          let zjdata=null;
                          if(orgCode!= '001'){
                              if(orgCode.length == 6)
                              {
                                  zjdata=that.dmap.getLayerXSQ(that.orgname)
                                  //zjdata = that.dmap.dbop.getData("(TL,eq,"+orgCode+")","lh_mdjf_qx_wst");  //面
                              }else{
                                  zjdata=that.dmap.getLayerJD(that.orgname)
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
            //设置标记点位
            async setmarker(MarkerList){
                 // await this.initmap();
                  let that=this;
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
                          marker.bindPopup("<h1>"+item.title+"</h1><p>"+item.content+"</p>");
                          // marker.on("click",function(e){
                          //     alert(e.target)
                          // })
                          markerlist.push(marker);
                      });

                      // eslint-disable-next-line no-undef
                      let overlayGroup2=new JSMap.OverlayGroup(markerlist);
                      overlayGroup2.id="eventmarkerlist";
                      that.dmap.addOverlayGroup(overlayGroup2);
                      //that.dmap.addOverlay(marker);
                  });
              },
            //地图查询条件
            async getQuery(){
                let whereStr = "(";
                //获得查询条件
                //专题编号
                if (this.themeId !== "" && this.themeId !== null && this.themeId !== undefined) {
                    whereStr += "(themeid,eq," + this.themeId + ")";
                }
                //22类判断
                else if (this.type !== "" && this.type !== null && this.type !== undefined) {
                    whereStr += "~and(t6,eq," + this.type + "~)";
                }
                //区域判断
                if (this.orguid !== "001") {
                    whereStr += "~and(t1,eq," + this.orguid + "~)";
                }

                //限制地图数据为当月数据
                var date=new Date();
                date.setDate(1);
                date.setMinutes(0);
                date.setHours(0);
                date.setSeconds(0);
                whereStr += "~and(t2,gte," + date.getTime() + ")";


                whereStr += ")";
                console.log(whereStr);
                return whereStr;
            },
            //添加图层
            async SetMapZoom(maps)
            {
                let that = this;
                //自定义的icon图标
                var icon = new maps.IconMarker({
                    icon: 'fa-bandcamp',//icon名称参考：http://www.fontawesome.com.cn/faicons/
                    iconColor: 'white',//小图标的颜色
                    markerColor: 'yellow',//大图标的样式
                    prefix: 'fa'
                });
                //var icon = that.dmap.IconPulse("/pages/img/corp0.png", new that.dmap.Size(30, 40));
                var opt = {
                    data: {
                        //数据表存放地址
                        field: "x,y,val1,themeid,diffid,orgqxname,eventid",
                        where: that.getQuery(),
                        x: "x",
                        y: "y",
                        size: 20000
                    },
                    symbol: {
                        type: "Cluster",
                        icon: icon,
                        minZoom: 1,
                        maxZoom: 3
                    },
                    //响应动作
                    action: {
                        //bindTooltip: "<iframe style='width:1480px;height:602px;border: 0px;' scrolling='no' src='/pages/EventDetailRequest.html?id={eventid}')></iframe>",
                        //bindPopup:"<iframe style='width:315px;height:150px;border: 0px;' scrolling='no' src='popupFrame.html?bh={bh}')></iframe>",
                        bindClick: function (item) {
                            var eventid = item.eventid;
                            that.eventinfoshow = true;
                            that.eventinfourl = "http://10.68.129.154:8119/pages/ZJDPEventDetail.html?id=" + eventid;
                        }
                    }
                };

                this.dmap.addXYLayer("网格中心", "center_theme_flashpointmap", opt)


                var optData = {
                    //数据结构
                    field: "x,y,val1,themeid,diffid,orgqxname,eventid",
                    where: that.getQuery(),
                    x: "x", //x字段(经度)
                    y: "y", //y字段（纬度）
                    size: 20000
                };
                //定义样式:图标
                var optTB = {
                    data: optData,
                    symbol: {
                        type: "Marker",
                        icon: icon,
                        minZoom: 4,
                        maxZoom: 6,
                    },
                    //响应动作
                    action: {
                        //bindTooltip: "<iframe style='width:1480px;height:602px;border: 0px;' scrolling='no' src='/pages/EventDetailRequest.html?id={eventid}')></iframe>",
                        //bindPopup: "<iframe style='width:315px;height:150px;border: 0px;' scrolling='no' src='/pages/EventDetailRequest.html?id={eventid}')></iframe>",
                        bindClick: function (item) {
                            var eventid = item.eventid;
                            that.eventinfoshow = true;
                            that.eventinfourl = "http://10.68.129.154:8119/pages/ZJDPEventDetail.html?id=" + eventid;
                        }
                    }
                };
                this.dmap.addAutoXYLayer("图标", "center_theme_flashpointmap", optTB, function (data) {

                })

                this.SetQXFont();
                this.SetZJFont()
            },
            //地图专题切换事件
            async changeThemeEvent(themeId,types)
            {
                let that =  this;
                that.themeId = themeId;
                that.type = types;
                let queryWhere = that.getQuery();
                if (that.dmap === null || that.dmap === undefined || that.dmap === "") {
                    that.initmap(that.orguid , that.orgname);
                }
                // if(that.orguid == '001')
                // {
                //     that.dmap.centerAndZoom(new JSMap.Point(121.6155, 29.7055), 0);
                // }else{
                //         if(that.orguid.length == 6)
                //         {
                //             zjdata=that.dmap.getLayerXSQ(that.orgname)
                //             //zjdata = that.dmap.dbop.getData("(TL,eq,"+orgCode+")","lh_mdjf_qx_wst");  //面
                //         }else{
                //             zjdata=that.dmap.getLayerJD(that.orgname)
                //             //zjdata = that.dmap.dbop.getData("(JZ_NUMBER,eq,"+orgCode+")","lh_mdjf_jiedao_wst");  //面
                //         }
                //         zjdata.options.fill=false
                //         that.dmap.removeflyTo();
                //         that.dmap.flyToLayer(zjdata)
                //
                // }
                that.dmap.removeXYLayer("网格中心");
                that.dmap.removeAutoXYLayer("图标");
                this.RemoveQXFont();
                this.RemoveZJFont();

                that.SetMapZoom(that.myJSMap);
            }
            ,
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
                       maxZoom: 3
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
                        minZoom: 4,
                        maxZoom: 6
                    }
                };
                this.dmap.addXYLayer("镇街注记图", "jsmap_jiedao", optZJName);
            },
            //去除 - 镇街标记
            async RemoveZJFont(maps){
                this.dmap.removeXYLayer("镇街注记图");
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