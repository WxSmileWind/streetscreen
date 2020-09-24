
//测试环境
//http://10.68.129.154:8119/BigScreen/CenterBCManage1/GetLists
const baseURL = "http://10.68.129.154:8119/BigScreen";
//const baseURL="http://18.125.71.1:10011/hj-server/";
//const baseURL_FWDT = "http://115.238.154.91:8085/kjcy-servicehall/";

const basetestURL = "http://localhost:56316/BigScreen";
//const testURL = "http://10.68.129.154:8115/";


//镇街大屏接口前缀
const streetbaseURL = "http://10.68.129.143/reporttest/dpzj/";

export const Api = {
        sc_list:baseURL+"/CenterBCManage1/GetLists",               //获得大屏列表
        //镇街大屏首页接口api
        dpzj:{
            rk:streetbaseURL+"/rk.ashx",               //人口
            fw:streetbaseURL+"/fw.ashx",               //房屋
            qy:streetbaseURL+"/qy.ashx",               //企业
            wg:streetbaseURL+"/wg.ashx",               //网格
            wxzb:streetbaseURL+"/wxzb.ashx",           //考核-五项指标
            kh:streetbaseURL+"/kh.ashx",               //职能部门考核
            gjzb:streetbaseURL+"/gjzb.ashx",           //关键指标
            rctx:streetbaseURL+"/rctx.ashx",           //日常提醒
            topevents:streetbaseURL+"/topevents.ashx", //今日事件
            wtjj:streetbaseURL+"/wtjj.ashx",           //问题聚焦
            dbsj:streetbaseURL+"/dbsj.ashx",           //待办事件
            tzgg:streetbaseURL+"/tzgg.ashx",           //待阅读通知
            orgname:streetbaseURL+"/orgname.ashx",     //获取组织名称
        },
        //郭栋-典型事件接口
        eventdx: {
            eventinfo: "http://10.68.129.143/reporttest/dpnew//eventinfo.ashx",              //事件详情接口
        },
        //廖红-相关接口
        lh: {
            dingtalk: "http://10.68.129.154:8119/BigScreen/Theme/GetDingTalkVideo",//钉钉视频连线接口
            eventinfo: "http://10.68.129.154:8119/BigScreen/Theme/GetCurEventADetail"//事件详情接口
        },
        video:"http://10.68.129.154:8119/BigScreen/Theme/GetVideoUrlPath",   //根据channelId获取监控视频播放地址
        videomarkerlist:"http://10.68.129.154:8119/BigScreen/Theme/GetVideoNearXYCOND",//根据XY轴获取附近监控点位

};
window.Api = Api;