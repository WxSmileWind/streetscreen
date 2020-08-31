<template>
    <div id="map" >
        <div class="left_banner">

        </div>

    </div>
</template>

<script>
    export default {
        name: "tiandt",
        data(){
            return {
                x:'121.535',
                y:'29.873',
                dmap:{type:Object}
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
            async initmap(orgCode){
                  this.$nextTick(()=> {
                      let that=this;  //将方法放在mounted，会有指向问题，定义this使用就会正常
                      window.require(["jsmap"], function () {
                          //var  map=jsmap.Map("map");//使用默认底图
                          // eslint-disable-next-line no-undef
                          that.dmap = JSMap.Map("map", {mapType: "电子地图(高端灰)"}); //初始化时候自定义底图
                          // eslint-disable-next-line no-undef
                          that.dmap.centerAndZoom(new JSMap.Point(121.535, 29.873), 3);
                          // eslint-disable-next-line no-unused-vars
                          let opt={
                              fillColor:"#0445a7",
                              color:"#ff0000"
                          }
                          let zjdata=that.dmap.dbop.getData("(JZ_NUMBER,eq,"+orgCode+")","lh_mdjf_jiedao_wst");  //面
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