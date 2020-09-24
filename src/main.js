import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';//引用字体css
//v-viewer 图片放大组件
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css';



Vue.config.productionTip = false;
//将饿了么ui层级设置从1000开始
Vue.use(ElementUI, { zIndex: 1000 });
Vue.use(Vant);
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
var vm = new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
