<script setup lang="ts">
import animate from "animate.css";
import { HttpGet } from "@/api/http";
import { onMounted, ref, onActivated, onUnmounted, watch, reactive } from "vue";
import { SERVICE_ROUT, Response, Play, Video } from "../../util/type";
//import {formatTime, routerTo} from "../../util/util"
import route from "@/router/router";
import { TabsPaneContext } from "element-plus";
import * as http from "http";
import HomeMainHome from "@/components/home/main/home-main-home.vue";
import HomeUser from "@/components/home/user/home-main-manager-user.vue";
import {
    active,
    homeMessageList,
    homeMessageShowSize,
    SearchText,
} from "../../store/DataStore";
import HomeMsg from "@/components/home/msg/home-msg.vue";

import { userImage } from "../../store/UserSrore";
import HomeSpace from "@/components/home/space/home-space.vue";
import HomeSpaceSelect from "@/components/home/space/home-space-select.vue";
import HomeMsgHead from "@/components/home/msg/home-msg-head.vue";
import { showToast } from "vant";
import HomeMainHomeDm from "@/components/home/main/home-main-home-dm.vue";
import HomeMainHomeSh from "@/components/home/main/home-main-home-sh.vue";
import HomeMainHomeYs from "@/components/home/main/home-main-home-ys.vue";
import HomeMainHomeQt from "@/components/home/main/home-main-home-qt.vue";
import { HomeViewCard } from "@/api/video/video";
import { HomeInitResponse } from "@/api/response/Response";
const player = ref(null);
let url = ref("");
const streamUrl = ref("");
const progressBar = ref(null);

// 在页面跳转之前记录滚动位置
const beforeRouteLeave = (to, from, next) => {
    // 在路由元信息中添加需要记录滚动位置的标志，例如 meta: { scrollToTop: true }
    if (from.meta.scrollToTop) {
        from.meta.savedScrollY = window.scrollY;
    }
    next();
};

// 在页面返回时重新设置滚动位置
const afterEach = (to, from) => {
    if (to.meta.scrollToTop) {
        // 利用 setTimeout 确保页面已经渲染完毕
        setTimeout(() => {
            window.scrollTo(0, from.meta.savedScrollY || 0);
        }, 0);
    }
};

const play = ref<Response<HomeViewCard[]>>(null);
const to = () => {
    route.push("/login");
    console.log("跳转login");
};

// 下面导航卡片
const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
};

const textActive = ref(false);

//const active = ref(3);
//  动画控件
const fly = ref("");

watch(active, (newValue, oldValue) => {
    if (newValue > oldValue) {
        fly.value = "fly-inR";
    } else {
        fly.value = "fly-inL";
    }
});

// 输入框
const input = ref("");
const onSearch = () => {
    // 回车
    if (input.value.trim().length > 0) {
        SearchText.value = input.value;

        setTimeout(() => {
            route.push("/searchResult");
        }, 200);
    } else {
        showToast({
            message: "输入内容为空",
            position: "top",
        });
    }
};

const errorHandler = () => true;

//  骨架
const loading = ref(true);

// 标签页面
const Tap = ref(["推荐", "动漫", "生活", "影视", "其他"]);
const Tap_active = ref(0);

/// 下拉刷新
async function onRefresh() {
    console.log("清空");
    try {
        const rep: Response<HomeInitResponse> = (
            await HttpGet(SERVICE_ROUT.VIDEO_INIT_GET)
        ).data;
        console.log("下拉刷新信息:{}", rep);
        console.log("初始化数据是，{}", rep.data);
        if (rep.code == 200) {
        } else {
        }
    } catch (e) {
        console.log("清空");
        // console.error(e)
        // console.error(e);
    }

    // HomeInitResponse = (await HttpGet(SERVICE_ROUT.VIDEO_INIT_GET)).data;
    // play.value = [];
    // count.value++;
    // loading.value = false;
    // console.log("下拉刷新:", play.value);
}
const count = ref(0);
// https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png

function OnChear() {
    console.log("清空");
}
</script>

<template>
    <div id="home">
        <div id="home-head" v-if="active==0">
            <div id="home-user" @click="active=3">
                <van-image round height="10rem" width="10rem" :src="userImage" />
            </div>
            <van-search v-model="input" style="flex: 1 1 20rem" :right-icon="'aa'" shape="round" background="#ffffff" placeholder="请输入搜索关键词" @clear="OnChear" @click-right-icon="OnChear" @cancel="OnChear" :clearable="false" />
            <div id="home-search-font" @click.stop="onSearch"><span>搜索</span></div>
        </div>
        <van-tabs v-model:active="Tap_active" scrollspy sticky title-active-color="#1989fa" swipeable="false" v-show="active==0">
            <van-tab v-for="(item,index) in Tap" :title="item" :key="index">
            </van-tab>
        </van-tabs>
        <div id="home-main">
            <!--主页显示-->
            <home-main-home v-show="active==0&&Tap_active==0"></home-main-home>
            <home-main-home-dm v-show="active==0&&Tap_active==1"></home-main-home-dm>
            <home-main-home-sh v-show="active==0&&Tap_active==2"></home-main-home-sh>
            <home-main-home-ys v-show="active==0&&Tap_active==3"></home-main-home-ys>
            <home-main-home-qt v-show="active==0&&Tap_active==4"></home-main-home-qt>
            <!--        <view v-show="true"></view>-->
            <div id="home-main-qr" v-show="active==1">
                <home-space-select></home-space-select>
            </div>
            <div id="home-main-chat" v-if="active==2">
                <home-msg-head></home-msg-head>
            </div>
            <div id="home-main-manager" v-if="active==3">
                <home-user></home-user>
            </div>
        </div>

        <div id="home-bottom">
            <!-- 先关闭掉状态页面 -->
            <van-tabbar v-model="active">
                <van-tabbar-item icon="wap-home-o">主页</van-tabbar-item>
                <van-tabbar-item icon="qr">动态</van-tabbar-item>
                <van-tabbar-item icon="chat-o" :badge="homeMessageList&&homeMessageShowSize?homeMessageShowSize:''">消息</van-tabbar-item>
                <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>
<style  scoped >
@import "@/css/pc/home.css";
@import "@/css/mobile/home.css";
</style>

