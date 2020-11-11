<template>
    <div class="container">
        <div class="handle-box">
            <el-input v-model="query.name" placeholder="网格名称" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
        <el-table
                :data="wzxsdata"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
        >
            <el-table-column prop="qxname" label="区县名称"  align="center"></el-table-column>
            <el-table-column prop="zjname" label="镇街名称"  align="center"></el-table-column>
            <el-table-column prop="csname" label="村社名称"  align="center"></el-table-column>
            <el-table-column prop="wgname" label="网格名称"  align="center"></el-table-column>
<!--            <el-table-column prop="name" label="用户名"></el-table-column>-->
<!--            <el-table-column label="账户余额">-->
<!--                <template slot-scope="scope">￥{{scope.row.money}}</template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="头像(查看大图)" align="center">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-image-->
<!--                            class="table-td-thumb"-->
<!--                            :src="scope.row.thumb"-->
<!--                            :preview-src-list="[scope.row.thumb]"-->
<!--                    ></el-image>-->
<!--                </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="address" label="地址"></el-table-column>-->
<!--            <el-table-column label="状态" align="center">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-tag-->
<!--                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"-->
<!--                    >{{scope.row.state}}</el-tag>-->
<!--                </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="date" label="注册时间"></el-table-column>-->
        </el-table>
        <div class="pagination">
            <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
    //接口调用文件
    import index from '@/api/index';
    //接口配置文件
    import {Api} from '@/api/api';
    export default {
        name: "wzxs",
        props:{
            OrgCode:{
                type:String
            }
        },
        data(){
            return{
                wzxsdata:[],//未在线数list
                query: {
                    name: '',
                    pageIndex: 1, //页码
                    pageSize: 10  //页条数
                }, //查询条件
                pageTotal: 0,
            }
        },
        methods:{
            // 获取 “未在线数” 数据
            async getData() {
                // fetchData(this.query).then(res => {
                //     console.log(res);
                //     this.tableData = res.list;
                //     this.pageTotal = res.pageTotal || 50;
                // });
               let {data: wzsslist, total: counts} = await index.fetchData_get(Api.dpzj.wzsslist,
                   {
                       "orgcode":this.OrgCode,
                       "name":this.query.name,
                       pageindex: this.query.pageIndex,
                       pagesize:  this.query.pageSize,
                   });
                //设置当前页list
                this.wzxsdata=wzsslist;
                //设置总条数
                this.pageTotal=counts;

            },
            // 触发搜索按钮
            async handleSearch() {
                 await this.$set(this.query, 'pageIndex', 1);
                 await this.getData();
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
        }
    }
</script>

<style scoped>
    .container {
        padding: 30px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        min-height: 650px;
    }
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>