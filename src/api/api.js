
//测试环境
//http://10.68.129.154:8119/BigScreen/CenterBCManage1/GetLists
const baseURL = process.env.VUE_APP_BASE_URL_DD;
//const baseURL="http://18.125.71.1:10011/hj-server/";
//const baseURL_FWDT = "http://115.238.154.91:8085/kjcy-servicehall/";

//const basetestURL = "http://localhost:56316/BigScreen";
//const testURL = "http://10.68.129.154:8115/";


//镇街大屏接口前缀
const streetbaseURL1 = process.env.VUE_APP_BASE_URL;//主业务接口地址
const _dpzj = process.env.VUE_APP_dpzj;//dpzj
const streetbaseURL =streetbaseURL1+_dpzj;

const _dpnew =  process.env.VUE_APP_dpnew;//dpnew
const _dpnewbaseurl = streetbaseURL1+_dpnew;

export const Api = {
        sc_list:baseURL+"/CenterBCManage1/GetLists",               //获得大屏列表
        //镇街大屏首页转发接口api
        dpzj:{
            rk:baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpzj/rk.ashx",      //人口
            fw:baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpzj/fw.ashx",      //房屋
            qy:baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpzj/qy.ashx",      //企业
            wg:baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpzj/wg.ashx",      //网格
            wxzb:baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpzj/wxzb.ashx",  //考核-五项指标
            kh:baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpzj/kh.ashx",      //职能部门考核
            gjzb:baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpzj/gjzb.ashx",  //关键指标
            rctx:baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpzj/rctx.ashx",  //日常提醒
            topevents:baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpzj/topevents.ashx", //今日事件
            wtjj:baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpzj/wtjj.ashx",           //问题聚焦
            dbsj:baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpzj/dbsj.ashx",           //待办事件
            tzgg:baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpzj/tzgg.ashx",           //待阅读通知
            orgname:baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpzj/orgname.ashx",     //获取组织名称

        },
        // dpzj:{
        //     rk:streetbaseURL+"/rk.ashx",               //人口
        //     fw:streetbaseURL+"/fw.ashx",               //房屋
        //     qy:streetbaseURL+"/qy.ashx",               //企业
        //     wg:streetbaseURL+"/wg.ashx",               //网格
        //     wxzb:streetbaseURL+"/wxzb.ashx",           //考核-五项指标
        //     kh:streetbaseURL+"/kh.ashx",               //职能部门考核
        //     gjzb:streetbaseURL+"/gjzb.ashx",           //关键指标
        //     rctx:streetbaseURL+"/rctx.ashx",           //日常提醒
        //     topevents:streetbaseURL+"/topevents.ashx", //今日事件
        //     wtjj:streetbaseURL+"/wtjj.ashx",           //问题聚焦
        //     dbsj:streetbaseURL+"/dbsj.ashx",           //待办事件
        //     tzgg:streetbaseURL+"/tzgg.ashx",           //待阅读通知
        //     orgname:streetbaseURL+"/orgname.ashx",     //获取组织名称
        // },
        //郭栋-典型事件接口
        eventdx: {
            eventinfo: baseURL+"/Theme/ForwardFun?urlStr=/reporttest/dpnew/eventinfo.ashx",      //事件详情接口
        },
        //eventdx: {
        //     eventinfo: _dpnewbaseurl+"/eventinfo.ashx",           //事件详情接口
        //},
        //廖红-相关接口
        lh: {
            dingtalk: baseURL+"/Theme/GetDingTalkVideo",//钉钉视频连线接口
            eventinfo: baseURL+"/Theme/GetCurEventADetail",//事件详情接口
            eventtype:baseURL+'/Theme/GetEventTypeData',//事件类型接口
            getzjzx:baseURL+'/Theme/GetZHZXInfo',//获得指挥中心用户编号
            getddb:baseURL+'/Theme/GetRemindAllData',//获得待督办的数据
            log:baseURL+'/Theme/AddUserLogInfo',//添加访问日志
            themestatic:baseURL+'/Theme/GetThemeStatic',//获得专题的数据
            getorgcode:'http://10.19.181.154/gridws2/gisApi/urp/getOrgByUserId',//baseURL+'/Theme/GetZHZXOrguid',//获得组织编号
            getwgfbinfo: baseURL+'/Theme/GetZJDPWGInfo' ,//获得网格分布情况
            getuserlogoutlog: baseURL+'/Theme/AddUserLogoutInfo' ,//添加用户登录登出日志
            getuseroptlog: baseURL+'/Theme/AddUserOptInfo' ,//添加用户操作日志
            getqxinfo: 'http://10.68.132.104/jsmap_rest_api/jsmap_xianshi' ,//获得区县信息
            getjdinfo:'http://10.68.132.104/jsmap_rest_api/jsmap_jiedao',//获得镇街信息
        },
        video:baseURL+"/Theme/GetVideoUrlPath",   //根据channelId获取监控视频播放地址
        videomarkerlist:baseURL+"/Theme/GetVideoNearXYCOND",//根据XY轴获取附近监控点位
        wgyposition:'http://10.19.181.154/gridws2/gisApi/base/gridPpl',     //获得网格员定位

};
window.Api = Api;