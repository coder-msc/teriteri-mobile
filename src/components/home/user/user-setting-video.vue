<script setup lang="ts">
import route from '../../../router/router.js'

import {onMounted, ref} from "vue";
import {HomeViewCard, Response, SERVICE_ROUT, Video, ViewUserCard} from "../../../util/type";
import {HttpGet} from "@/api/http";
import UserSettingVideoCard from "@/components/home/user/user-setting-video-card.vue";
import {ViewUserDynamicId,UserSettingVideo} from "@/store/DataStore";






const visible=ref(true)
function OnClickBar(){
  visible.value=false
  setTimeout(()=>{

    route.back()
  },200)

}

const userVideo=ref<HomeViewCard[]>(undefined) // 视频

const pageLoade=ref<boolean>(false)
onMounted(async ()=>{
  try {

    const rep:Response<HomeViewCard[]>= (await HttpGet(SERVICE_ROUT.USER_VIDEO_LIST_GET+"/1")).data
    if(rep.body.length>=11){
      pageLoade.value=true
    }
    if(rep.status==200){

      userVideo.value=rep.body
      list.value.unshift(rep.body)
      console.log("播放数据：",userVideo.value)

      console.log("返回数据：",rep)
    }
  }catch (e){
    console.error("error:",e)
  }



})


const list = ref([]); // 播放列表
const page=ref<number>(1) // 分页数据
const loading = ref(false);
const finished = ref(false);
const textShow=ref<string>("未发布视频")
const onLoad =async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求

  try {
    page.value++;
    const rep:Response<HomeViewCard[]>=(await HttpGet(SERVICE_ROUT.USER_VIDEO_LIST_GET+'/'+page.value)).data;
    console.log("加载成功：",page.value," ",rep)
    if(rep.status==200){
      list.value.push(rep.body)
      loading.value = false;
      if(rep.body.length==0){
        finished.value = true;
        console.log("list 列表：",list.value," 个数：",list.value.length)
        if(list.value.length>0){
          textShow.value="暂无更多"
        }

        return;
      }


    }

  }catch (e){
    console.error(e)
  }



};


</script>

<template>
  <transition name="van-slide-right">
      <div  id="user-setting-video" v-if="visible">
        <van-nav-bar
            title="稿件管理"
            left-text="返回"
            left-arrow
            @click-left="OnClickBar"

        />
        <van-list
            v-model:loading="loading"
            :finished="finished"
            :finished-text="textShow"
            @load="onLoad"
        >

          <van-cell v-for="item in list" :key="item" >
            <user-setting-video-card   :recommend="item" ></user-setting-video-card>
          </van-cell>
        </van-list>
      </div>
  </transition>



</template>

<style scoped>
#user-setting-video{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
}
</style>