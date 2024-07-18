<script setup lang="ts">


///

import {computed, onMounted, ref, watch} from "vue";
import {SearchText, timeOrCollectionTitle, videoSocket} from "@/store/DataStore";
import route from "@/router/router.js";
import {HttpGet, HttpPost} from "@/api/http";
import {HomeViewCard, Response, SERVICE_ROUT, ViewSearchCard} from "@/util/type";
import TimeCard from "@/components/home/user/time/time-card.vue";
import {compact} from "lodash";
import UserConcernCard from "@/components/home/user/user-concern-card.vue";

const visible=ref(true)


const Tap=ref(['视频','用户'])
const Tap_active=ref(0)



function ToHome(){

  try {
    videoSocket.value.close();
  }catch (e){
    console.error("video-socket：",e)
  }

  visible.value=false
  setTimeout(()=>{

    route.push('/home')
  },200)

}



const searchDate=ref<ViewSearchCard>(null)
onMounted(async ()=>{

  const a= {keyWord:"你好"}
  const rep:Response<ViewSearchCard>= (await HttpGet(SERVICE_ROUT.SEARCH_RESULT_GET,{keyWord:SearchText.value})).data

  console.log("响应结果：",rep)
  if(rep.status==200){
    list.value.push(...rep.body.videoList)
    userList.value.push(...rep.body.userList)
  }

})




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

      rep= (await HttpGet(SERVICE_ROUT.SEARCH_VIDEO_GET+"/"+page.value,{keyWord:SearchText.value})).data

    console.log("视频加载成功：",page.value," ",rep)
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




// 相关用户列表
 const userList =ref([])

</script>

<template>

  <transition name="van-slide-right">
      <div    id="search-result" v-show="visible">
        <van-nav-bar

            title="搜索结果"
            left-text="返回"
            left-arrow
            @click-left="ToHome"
        />

        <van-tabs v-model:active="Tap_active" scrollspy sticky title-active-color="#1989fa" swipeable="false"  >
          <van-tab v-for="(item,index) in Tap" :title="item" :key="index">

          </van-tab>

        </van-tabs>





        <div  id="search-result-video"      v-show="Tap_active==0">
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
        </div>

        <div id="search-result-user" >
          <div v-show="userList&&userList.length"  v-for="item in userList" :key="item.userId" >
            <user-concern-card :ConcernData="item"></user-concern-card>
          </div>
        </div>


<!--        <van-list-->
<!--            v-model:loading="loading"-->
<!--            :finished="finished"-->
<!--            finished-text="没有更多了"-->
<!--            @load="onLoad"-->
<!--        >-->
<!--          <van-cell v-for="(item,index ) in list" :key="item" >-->
<!--            <time-card  :homeViewCard="item"  :key="index"></time-card>-->

<!--            &lt;!&ndash;        <search-view   :recommend="item" ></search-view>&ndash;&gt;-->
<!--          </van-cell>-->
<!--        </van-list>-->

      </div>
  </transition>

</template>

<style scoped>
@media screen  and (min-device-width: 200px) and (max-device-width:5000px) {

#search-result{
  width: 100vw;
  height: 100vh;

  overflow: hidden;

}
}

#search-result-video,#search-result-user{

  width: 100vw;
  height: 90vh;
  overflow: hidden;
  overflow-y: auto;
}

</style>