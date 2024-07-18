<script setup lang="ts">
// 观看历史的展示卡片
import SearchView from "@/components/home/search/search-view.vue";
import {ref} from "vue";
import {HomeViewCard} from "@/util/type";
import {formatDateTime2, formatTime} from "@/util/util";
import {viewVideoId} from "../../../../store/DataStore";

import route from '../../../../router/router.js'
const imageSrc=ref('src/public/interlude_Miku_in_Museland_3.png')


const Popos= defineProps({
  homeViewCard: {
    type:Object,
    default:null
  }
})


function ToView(videoId:number){
 // console.log("历史记录传递的id页面外部：",videoId)
  setTimeout(()=>{

   // console.log("历史记录传递的id页面：",Popos.homeViewCard)
    viewVideoId.value=videoId
    route.push('/view')
  },200)
}

</script>



<template>
<!--    <div id="time-card">-->
<!--      -->
<!--    </div>-->

  <div id="time-view" v-if="homeViewCard" @click="ToView(homeViewCard.videoId)">
    <div class="time-view-item" >
      <div class="time-view-item-image">
        <van-image

            width="100%"
            height="100%"
            :src="homeViewCard.imageSrc"
        />
        <div class="time-view-item-image-m"> </div>
        <!--        <div class="time-view-item-view"><van-icon name="play-circle-o" /> 27.9万</div>-->
        <div class="time-view-item-time">{{formatTime(homeViewCard.time)}}</div>
      </div>
      <div class="time-view-item-content">
        <div  class="time-view-item-content-title">
          {{homeViewCard.title}}
        </div>
        <div>
          <div class="time-view-item-view"><van-icon size="4rem" name="user-circle-o" /> <span class="time-view-item-size-time1" >{{homeViewCard.userName}}</span> </div>
          <div class="time-view-item-size">   <el-icon size="4rem"><Clock /></el-icon> <span class="time-view-item-size-time"> {{formatDateTime2(homeViewCard.date)}}</span></div>
        </div>
        <van-divider />
      </div>

    </div>

  </div>
  <div style="height:1px; margin-top:-1px;clear: both;overflow:hidden;"></div>

</template>

<style scoped>
@import "@/css/mobile/time-card.css";
</style>