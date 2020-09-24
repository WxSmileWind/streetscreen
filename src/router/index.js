import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/:orgid",
    name: "index",
    component: index
  },
  {
    path: "/index/:orgid",
    name: "index",
    component: index
  },
  {
    path: '/Tiandt',
    component: ()=> import("../components/tiandt.vue")
  },
  {
    path: '/Tiandt_new',
    component: ()=> import("../components/tiandt_new.vue")
  },
  {
    path: '/eventinfo',
    component: ()=> import("../components/eventinfo.vue")
  },
  {
    path: '/404',
    component: ()=> import("../components/NotFound.vue")
  },
  {
    path:'/nineSquared',
    component: ()=> import("../views/NineSquared.vue")
  }
  ,{
    path: '/NineSquaredChild/:url',
    component: ()=> import("../components/NineSquaredChild.vue")
  }
];

const router = new VueRouter({
  mode:'hash',
  routes
  /*mode: 'history',*/
  /*routes*/
});
/*路由守卫拦截器*/
router.beforeEach((to, from, next) => {
  if (to.matched.length !== 0) {
    next()
  } else {
    next({ path: '/404' })
  }
});
export default router;
