<script setup lang="ts">
/**
 *  收藏的数据历史观看的数据
 */
import {timeOrCollectionTitle} from '../../../../store/DataStore'

//import TimeCard from
import route from "@/router/router";
import {onMounted, ref} from "vue";
import {HttpGet} from "@/api/http";
import {HomeViewCard, Response, SERVICE_ROUT, ViewUserCard} from "../../../../util/type";
import TimeCard from "@/components/home/user/time/time-card.vue";



const visible=ref(true)
const history=ref<Response<HomeViewCard[]>>()
onMounted( async ()=>{
  try {
    switch (timeOrCollectionTitle.value){
      case "历史记录":
        //history.value= (await HttpGet(SERVICE_ROUT.USER_HISTORY)).data
        const repHistory:Response<HomeViewCard[]>= (await HttpGet(SERVICE_ROUT.USER_HISTORY+"/0")).data

        history.value=repHistory
           if(repHistory.status==200){
             list.value.push( ...repHistory.body)

          }
        console.log("历史记录：",history.value)
        break;
      case "我的收藏":
        const repHistory2:Response<HomeViewCard[]>= (await HttpGet(SERVICE_ROUT.USER_COLLECTION+"/0")).data
        history.value=repHistory2
        if(repHistory2.status==200){
          list.value.push( ...repHistory.body)

        }
        console.log("我的收藏：",history.value)
        break;
    }


  }catch (e){
    console.error(e)
  }

})


function OnClickBar(){
  visible.value=false
  setTimeout(()=>{
    route.back()
  },200)

}



// 分页数据
const list = ref([]); // 播放列表
const page=ref<number>(0) // 分页数据
const loading = ref(false);
const finished = ref(false);

const onLoad =async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求

  try {
    page.value++;
    let rep:Response<HomeViewCard[]>
  //  const rep:Response<HomeViewCard[]>=(await HttpGet(SERVICE_ROUT.USER_VIDEO_GET+"/"+user.value.id+'/'+page.value)).data;
    if(timeOrCollectionTitle.value=="历史记录"){
       rep= (await HttpGet(SERVICE_ROUT.USER_HISTORY+"/"+page.value)).data
    }else {
      rep= (await HttpGet(SERVICE_ROUT.USER_COLLECTION+"/"+page.value)).data
    }



    console.log("加载成功：",page.value," ",rep)
    if(rep.status==200){
      if(rep.body.length==0){
        finished.value = true;
        return;
      }
      list.value.push(...rep.body)
      loading.value = false;
    }

  }catch (e){
    console.error(e)
  }

};



</script>

<template>
  <transition name="van-slide-right">

  <div id="time-view" v-show="visible"  v-if="history&&history.body">
    <div id="time-view-head">
      <van-nav-bar
          :title="timeOrCollectionTitle"
          left-text="返回"
          left-arrow
          @click-left="OnClickBar"

      />
    </div>

    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-cell v-for="(item,index ) in list" :key="item" >
        <time-card  :homeViewCard="item"  :key="index"></time-card>

<!--        <search-view   :recommend="item" ></search-view>-->
      </van-cell>
    </van-list>

<!--    <time-card  :homeViewCard="item" v-for="(item,index) in history.body" :key="index"></time-card>-->


  </div>
  </transition>

</template>

<style scoped>
@import "@/css/mobile/time-view.css";
</style>