
import {createRouter, createWebHashHistory, onBeforeRouteLeave} from "vue-router";
import home from "../components/home/home.vue";
import   login from "../components/login/login.vue";
import view from "@/components/view/view.vue";
import search from "@/components/home/search/search-view.vue"

import ommentSection from "@/components/comment/comment-section.vue"
import timeView from "@/components/home/user/time/time-view.vue";
import homeMsgHead from "@/components/home/msg/home-msg-head.vue";
import userVideoUploder from "@/components/home/user/user-video-uploder.vue";
import router  from "@/components/view/router.vue";
import {onActivated} from "vue";
import userSetting from "@/components/home/user/user-setting.vue";
import userDynamic from "@/components/home/user/user-dynamic.vue";
import userSettingVideo from "@/components/home/user/user-setting-video.vue";
import userSettingVideoSetting from "@/components/home/user/user-setting-video-setting.vue";
import homeSpaceAdd from "@/components/home/space/home-space-add.vue";
import homeSpaceSelect from "@/components/home/space/home-space-select.vue";
import userConcern from "@/components/home/user/user-concern.vue";
import userSomeone from "@/components/home/user/user-someone.vue";
import searchResult from "@/components/home/search/search-result.vue";
import loginChange from "@/components/login/login-change.vue";
import loginEnroll from "@/components/login/login-enroll.vue";



const routes=[
    {
        path:'/home',
        name:'home',
        component:home, // 主页面
        meta: { keepAlive: true }
    },

    {
        path:'/login',
        component:login,    // 登录页面
        name:'login'
    },
    {
        path: '/view',
        component: view,    // 视频详情也页面
        name:'view',
        meta: { keepAlive: false }
    },
    {
        path: '/search',
        component: search,  // 搜索页面
        name:'search'
    },
    {
        path: '/ommentSection',
        component: ommentSection,    // 视频评论页面
        name:'ommentSection',
        meta: { keepAlive: false }
    },
    {
        path: '/timeView',
        component: timeView,
        name:'timeView'
    },
    {
        path: '/homeMsgHead',
        component: homeMsgHead, // 消息通知页面
        name:'homeMsgHead'
    },
    {
        path: '/userVideoUploder',
        name:'userVideoUploder',
        component: userVideoUploder // 视频投稿页面
    },
    {
      path: '/route',
        name: 'route',
        meta: { keepAlive: false },
        component: router  // 中转路由
    },
    {
        path: '/userSetting',
        component: userSetting  // 用户信息设置页面-- 信息修改
    },
    {
        path: '/userDynamic',
        component: userDynamic  // 用户动态页面
    },
    {
        path: '/userSettingVideo',
        component: userSettingVideo // 稿件编辑列表
    },
    {
        path: '/userSettingVideoSetting',
        component: userSettingVideoSetting  // 稿件修改编辑
    },
    {
        path: '/homeSpaceAdd',
        component: homeSpaceAdd  // 添加动态
    },
    {
        path: "/homeSpaceSelect",
        component: homeSpaceSelect   // 动态
    },
    {
        path: '/userConcern',
        component: userConcern   // 关注列表
    },
    {
        path: '/userSomeone', // 粉丝列表页面
        component: userSomeone
    },
    {
        path: '/searchResult',
        component: searchResult // 搜索结果页面
    },
    {
        path: '/loginChange',  //修改密码
        component: loginChange
    },
    {
        path: '/loginEnroll', // 注册
        component: loginEnroll
    }
]

let route =createRouter({
    history:createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
})



// const router = createRouter({
//     history: createWebHistory(baseUrl),
//     routes: [...],
//     scrollBehavior(to, from, savedPosition) {
//         if (savedPosition) {
//             return savedPosition;
//         } else {
//             return { top: 0 };
//         }
//     },
// })


// // 跳转路由守卫
// onBeforeRouteLeave((to, from, next) => {
//     // 将当前位置进行一个状态保存
//     cars.remeberScroll = document.documentElement.scrollTop
//     next()
// })
// //   组件激活
// onActivated(() => {
//     if (cars.remeberScroll != null && cars.remeberScroll > 0) {
//         console.log(111)
//         document.documentElement.scrollTop = cars.remeberScroll
//         document.body.scrollTop = cars.remeberScroll
//     }
// })

export default route;