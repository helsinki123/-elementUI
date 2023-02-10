import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/home/index'
// import projectConfig from "@/projectConfig";
// import cryptoAES from '@/utils/cryptoAES'
// import { setToken } from "@/utils/auth";

Vue.use(VueRouter)

const routes = [
    /** 登录页 */
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: "登录",
            keepAlive: false,
            id: 0
        },
        component: () => import('@/views/login/index'),
    },
    {
        path: '/testView',
        name: 'testView',
        meta: {
            title: "测试组件",
            keepAlive: false,
            id: 0
        },
        component: () => import('@/views/testView/index'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach((to, from, next) => {
//     try{
//         document.title = projectConfig.projectName + '--' + to.meta.title
//         if(to.query.t){
//             setToken(to.query.t)
//         }
//     }finally {
//         next()
//     }
// })

export default router