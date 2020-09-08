
//测试环境
//http://10.68.129.154:8119/BigScreen/CenterBCManage1/GetLists
const baseURL = "http://10.68.129.154:8119/BigScreen";
//const baseURL="http://18.125.71.1:10011/hj-server/";
//const baseURL_FWDT = "http://115.238.154.91:8085/kjcy-servicehall/";

const basetestURL = "http://localhost:56316/BigScreen";


export const Api = {
        sc_list:baseURL+"/CenterBCManage1/GetLists",               //获得大屏列表
};
window.Api = Api;