import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: process.env.VUE_APP_BASE_URL,
    //baseURL:"http://124.202.145.102:8097/wastesort/",
    timeout: 0
});

// 添加请求拦截器
service.interceptors.request.use(
    config => {
        // config.headers
        // config.headers="{'Content-Type':'application/x-www-form-urlencoded'}";
        // config.baseURL="http://124.202.145.102:8097/wastesort/";


        //console.log("-----config.data:",config.data);
        if (config.method === 'post') {
            //普通post请求参数处理
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            config.data = qs.stringify(config.data,{ indices: false });
            config.paramsSerializer = params => {
                //params = params['_'] = (new Date()).getTime();
                return qs.stringify(params, { arrayFormat: 'repeat' })
            }
        } else if (config.method === 'post-json') {
            //post-json请求
            config.method = 'post';
            config.headers['Content-Type'] = 'application/json';
        } else if (config.method === 'post-img') {
            //post-文件上传请求
            config.method = 'post';
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        else if(config.method === 'get'){
            config.method ='get';
            config.baseURL='';

            if(config.url.indexOf('ForwardFun')>0){

                let urlparams="";
                if(config.params!==null){
                    //console.log("[params]++++++++++:",config.params);

                    for(let key in config.params){
                        //console.log(key+":"+config.params[key]);
                        urlparams+="|"+key+"="+config.params[key];
                    }
                    config.url=config.url+urlparams;
                    config.params=null;
                }
            }



            // console.log("[替换前request]-----config:",config);
            // config.url=config.url.replace('?','|').replace('&','|');
            // console.log("[替换后request]-----config:",config);


        }else if(config.method === 'get_cross'){
            config.method ='get';
            config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild';
            config.baseURL='';
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    response => {

       // console.log();

       // console.log("+++++++++++++response:",JSON.stringify(response));
        console.log("+++++++++++++response.config.url:",response.config.url);
        if(response.config.url.indexOf('GetVideoUrlPath')>0
            ||response.config.url.indexOf('GetVideoNearXYCOND')>0
            ||response.config.url.indexOf('GetEventTypeData')>0
            ||response.config.url.indexOf('GetCurEventADetail')>0
            ||response.config.url.indexOf('GetDingTalkVideo')>0
            ||response.config.url.indexOf('GetZHZXInfo')>0
            ||response.config.url.indexOf('AddUserLogInfo')>0
            ||response.config.url.indexOf('GetThemeStatic')>0
            ||response.config.url.indexOf('GetZHZXOrguid')>0
            ||response.config.url.indexOf('getOrgByUserId')>0
            ||response.config.url.indexOf('rctx')>0
            ||response.config.url.indexOf('GetRemindAllData')>0
            ||response.config.url.indexOf('gridPpl')>0
            ||response.config.url.indexOf('GetZJDPWGInfo')>0//网格分布情况
            ||response.config.url.indexOf('AddUserLogoutInfo')>0//登录登出日志
            ||response.config.url.indexOf('AddUserOptInfo')>0//操作日志
            ||response.config.url.indexOf('jsmap_xianshi')>0//县
            ||response.config.url.indexOf('jsmap_jiedao')>0//街道
        )
        {
            return response.data;
        }
        else{
            if(response.status === 200){
                if (response.data.code == 200||response.data.code == 0) {
                    return response.data;
                }
                else{
                   // Message.error('['+JSON.stringify(response.config.url)+']接口返回错误,错误内容：'+response.data.msg);
                    return Promise.reject();
                }
               // console.log("+++++++++++++response:",JSON.stringify(response));
            }
        }``


        //console.log("响应拦截器状态位：",response.status);
        // if () {
        //     return response.data;
        //     if (response.data.code == 200) {
        //         return response.data;
        //     } else {
        //         return Promise.reject();
        //     }
        // } else {
        //     Message.error('接口返回错误');
        //     return Promise.reject();
        // }
        //Message.error('['+JSON.stringify(response.config.url)+'] 接口返回错误');
        // Message.error(JSON.stringify(response));
        //return Promise.reject("接口错误");
    },
    error => {
        console.log(error);
        Message.error('接口返回错误');
        return Promise.reject();
    }
);

export default service;
