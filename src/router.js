import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
 
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'index',
      component: () => import("./views/Index.vue"),
      children:[
        {
          path:"",
          redirect:"/home"
        },
        {
          path:"/home",
          name:"home",
          component:() => import("./views/Home.vue")
        },
        {
          path:"/order",
          name:"order",
          component:() => import("./views/Order.vue")
        },
        {
          path:"/me",
          name:"me",
          component:() => import("./views/Me.vue")
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("./views/Login.vue")
    }
  ]
})

// 路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.ele_login ? true : false
  if(to.path == '/login'){
        next()
  }else{
    //  判断是否在登录状态下 如果是正常跳转 || 否则跳转到登录页
    isLogin ? next() : next("/login")
  }
})
export default router