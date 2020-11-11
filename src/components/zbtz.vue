<template>
   <div>
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
   </div>
</template>

<script>
    //接口调用文件
    import index from '@/api/index';
    //接口配置文件
    import {Api} from '@/api/api';

    export default {
        name: "zbtz",
        data(){
            return {
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
            }
        },
        async created() {

        },
        methods:{
            //未在线数清单
            showwzss(){
                this.dblisttitle="网格未在线数清单";
                this.dbsjlistshow=true;
                this.allcomponentindex=0;
            },
            //绑定通知公告
            async bindtzgg(orgid){
                this.tzgg=0;
                this.tzgglist=[];
                //调用通知公告接口
                let {data:tzggdata} = await index.fetchData_get(Api.dpzj.tzgg,
                    {"orgcode":orgid});

                // eslint-disable-next-line no-console
                //console.log("+++++获取到的人口数据：",rkdata)
                let datalist=tzggdata;
                this.tzgg=datalist.length;
                this.tzgglist=datalist;
                this.marqueeList=this.tzgglist;
            },
            //绑定待办事件
            async binddbsj(){
                this.dbsj=0;
                this.dbsjlist=[];
                //调用待办事件接口
                let {data:dbsjdata} = await index.fetchData_get(Api.dpzj.dbsj,
                    {"orgcode":orgid});

                // eslint-disable-next-line no-console
                console.log("+++++获取到的待办事件：",dbsjdata)
                let datalist=dbsjdata;
                this.dbsj=datalist.length;
                this.dbsjlist=datalist;
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
            showtzgginfo(id){
                this.infoshow=true;
                this.infotitle="公告详情";
                this.infourl="";
                this.infourl="http://10.19.181.153/grid/notice/f.show?id="+id+"&random="+Math.floor(Math.random()*450001);
            },
        },


    }
</script>

<style scoped lang="scss">
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
</style>