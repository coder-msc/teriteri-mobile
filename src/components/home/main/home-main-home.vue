<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
    Response,
    SERVICE_ROUT,
    Video,
    HomeViewCard,
    ViewUserCard,
    SPACE_TYPE,
    ViewSpaceCard,
} from "../../../util/type";
import { HttpGet } from "@/api/http";
import { viewVideoId } from "../../../store/DataStore";
import { formatTime } from "../../../util/util";
import route from "../../../router/router.js";
import { showToast } from "vant";
import HomeSpaceShuoCard from "@/components/home/space/home-space-shuo-card.vue";
import HomeSpaceVideoCard from "@/components/home/space/home-space-video-card.vue";
import { HomeInitResponse } from "@/api/response/Response";

const play = ref<Response<HomeViewCard[]>>();
console.log("进入home-main");
//初始化
function InitPlay(): void {
    play.value = { body: [], status: 0 };
    for (let i = 0; i < 11; i++) {
        let video: HomeViewCard = {};

        play.value.body.push(video);
    }
}
InitPlay();
//  骨架
const gjloading = ref(true);
const loading = ref(true);

onMounted(async () => {
    InitPlay();
    console.log("组件home激活");
    try {
        play.value = (await HttpGet(SERVICE_ROUT.VIDEO_INIT_GET)).data;

        console.log("获得数据：HomeViewCard123：", play.value);

        if (play.value.status == 200) {
            loading.value = false;
            gjloading.value = false;
            list.value.push(...play.value.body);
        }
        if (play.value.status == 404) {
            console.error("home页面错误：404");
        }

        // await EnrollInit()
    } catch (e) {
        if (e.code === "ECONNABORTED") {
            console.error("请求超时");
        }
        console.error("home页面错误：", e);
    }
});

function toViewVideo(id: number) {
    viewVideoId.value = id;
    route.push("/view");
}

async function EnrollInit() {
    // 注册shij

    try {
        const handleScroll = async (e) => {
            let el = e.target;
            console.log("滚动");

            if (
                Number(el.scrollTop + el.clientHeight).toFixed(0) ==
                el.scrollHeight
            ) {
                console.log("滚动到底部");
                const rep: Response<HomeViewCard[]> = await (
                    await HttpGet(SERVICE_ROUT.VIDEO_INIT_GET)
                ).data;

                if (rep.status == 200) {
                    rep.body.pop(); // 只要10 条数据
                    console.log("添加新数据：", rep.body);
                    play.value.body.push(...rep.body);
                }
            }
        };
        const homeMainDom = document.getElementById("home-main-home");
        console.log("dom:", homeMainDom);
        homeMainDom.addEventListener("scroll", handleScroll);
    } catch (e) {
        console.error(e);
    }
}

const onRefresh = async () => {
    gjloading.value = true;
    refreshing.value = true;
    await onLoad();
    refreshing.value = false;
    gjloading.value = false;
    showToast("刷新成功");
};

// 随机推荐

const list = ref([]); // 播放列表
const page = ref<number>(1); // 分页数据
//const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const onLoad = async () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    page.value++;
    console.log("到达底部");
    let pp = { nm: 1 };
    try {
        if (refreshing.value) {
            list.value = [];
            page.value = 1;
            pp = null;
        }

        const rep: Response<HomeInitResponse[]> = (
            await HttpGet(SERVICE_ROUT.VIDEO_INIT_GET, pp)
        ).data;
        console.log("到达底部console.lo ");
        //const rep:Response<HomeViewCard[]>=(await HttpGet(SERVICE_ROUT.VIDEO_INIT_GET)).data;
        console.log("加载成功：", page.value, " ", rep);
        if (rep.code == 200) {
            // if (rep.body.length == 0) {
            //     finished.value = true;
            //     return;
            // }
            list.value.push(...rep.data);
            loading.value = false;
        }
    } catch (e) {
        console.error(e);
    }
};
</script>

<template>
    <div id="home-main-home2">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" error-text="请求失败，点击重新加载" @load="onLoad">
            <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh" style="min-height: 81vh;">
                <div id="home-main-home">
                    <div class="home-main-home-item" v-for="(item,index )  in list" @click="toViewVideo(item.videoId)">
                        <van-skeleton :row="3" :loading="gjloading" class="home-main-home-loading" title-width="90%">
                            <template #template>
                                <div :style="{ flex: 1, marginLeft: '16px' }">
                                    <van-skeleton-paragraph row-width="60%" :style="index==0? 'width: 124%;height: 73%; margin-left: -5rem;background: white;':  'width: 124%;height: 61%; margin-left: -5rem;background: white;'" />
                                    <van-skeleton-paragraph />
                                    <van-skeleton-paragraph />
                                </div>
                            </template>
                            <div class="home-main-home-image">
                                <!--            图片当作背景-->
                                <van-image width="100%" height="100%" :src="item.video.coverUrl" />
                                <!--          <img class="home-main-home-image-url" :src="item.coverImageUrl">-->
                                <div class="home-main-home-image-url-m"> </div>
                                <div class="home-main-home-item-font">
                                    <el-icon :size="index==0?'7rem':'5rem'" style="margin-right: 1rem" color="white">
                                        <VideoPlay />
                                    </el-icon>
                                    <span class="home-main-home-item-viwe"> {{item.playback}}</span>
                                    <div class="home-main-home-item-font-time">
                                        <!--                时间-->
                                        <span>{{formatTime(item.time)}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="home-main-home-item-title">
                                <!--            标题-->
                                <div class="home-main-home-item-title-conter">
                                    {{item.video.title}}
                                </div>
                                <!--            作者-->
                                <div class="home-main-home-item-title-user">
                                    <el-icon :size="index==0?'5rem':'4rem'">
                                        <User />
                                    </el-icon>
                                    <div class="home-main-home-item-title-user-name">
                                        {{item.user.nickname}}
                                    </div>
                                </div>
                            </div>
                            <!--            标题-->
                            <!--            作者-->
                        </van-skeleton>
                    </div>
                    <!--      </van-cell>-->
                </div>
            </van-pull-refresh>
        </van-list>
    </div>

</template>

<style scoped>
@import "@/css/mobile/home-main-home.css";
</style>