import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";
Vue.use(VueRouter);
import users from "./modules/user"
const routes = [
  {
    path: "/",
    name: "index",
    component: index,
    meta: { root:true }
  },
  {
    path: "/fabu",
    name: "fabu",
    meta: { root:true },
    component: () => import("../views/fabu.vue"),
  },
  {
    path: "/home",
    name: "home",
    meta: { root:true },
    component: () => import("../views/home.vue"),
  },
  {
    path: "/xiangqing",
    name: "xiangqing",
    
    component: () => import("../views/xiangqing.vue"),
  },
  {
    path: "/search",
    name: "search",
    
    component: () => import("../views/search.vue"),
  },
  {
    path: "/mysend",
    name: "mysend",
    meta: { auth:true },
    
    component: () => import("../views/mysend.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: { auth:true },
    
    component: () => import("../views/history.vue"),
  },
  {
    path: "/change",
    name: "change",
    
    component: () => import("../views/change.vue"),
  },
  {
    path: "/genggai",
    name: "genggai",
    meta: { auth:true },
    
    component: () => import("../views/genggai.vue"),
  },
  {
    path: "/forget",
    name: "forget",
    meta: { auth:true },
    
    component: () => import("../views/forget.vue"),
  },{
    path: "/modify",
    name: "modify",
    meta: { auth:true },
    
    component: () => import("../views/modify.vue"),
  },
  

  ...users

  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// router.beforeEach((to, from, next) => {
//  if(to.meta.auth){
//       let islogin=true
//       if(islogin){
//         next()
//       }else{
//         setTimeout(v=>{
//               next("./login")
//         },1000)
//       }
//  }else{
//   next
//  }
  
// })
export default router;
