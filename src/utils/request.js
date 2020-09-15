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

        //console.log("-----config:",config);
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

// {
//     data:[],
//      msg:'',
//     code:200
// }


// 添加响应拦截器
service.interceptors.response.use(
    response => {
       // console.log();
        if(response.status === 200){
            if (response.data.code == 200||response.data.code == 0) {
                return response.data;
            }
            else{
                Message.error('['+JSON.stringify(response.config.url)+']接口返回错误,错误内容：'+response.data.msg);
                return Promise.reject();
            }
           // console.log("+++++++++++++response:",JSON.stringify(response));
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
