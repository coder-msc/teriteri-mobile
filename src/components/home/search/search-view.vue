<script setup lang="ts">

import {ref} from "vue";
import {formatDateTime, formatTime} from '../../../util/util'

import {routerTo} from '../../../util/util'
import {viewVideoId} from '../../../store/DataStore'
import route from '../../../router/router.js'

const imageSrc=ref('src/public/interlude_Miku_in_Museland_3.png')


//  defineProps({
//   searchSize: {
//     type:Number,
//     default:10
//   }
// })

const ProP=  defineProps({

  recommend:{
    type:Object,
    default:null,
  }
});

function toView(videoId:number){
  console.log("跳转o:",videoId)
  viewVideoId.value=videoId

    routerTo("/view")

}

</script>

<template>

  <div id="view-search">
    <div class="view-search-item" v-for="item in recommend" @click="toView(item.videoId)">
      <div class="view-search-item-image">
        <van-image

            width="100%"
            height="100%"
            :src="item.imageSrc"
        />
        <div class="view-search-item-image-m"> </div>
<!--        <div class="view-search-item-view"><van-icon name="play-circle-o" /> 27.9万</div>-->
        <div class="view-search-item-time">{{formatTime(item.time)}}</div>
      </div>
      <div class="view-search-item-content">
        <div  class="view-search-item-content-title">
          {{item.title}}
        </div>
        <div>
          <div class="view-search-item-view" ><van-icon name="user-circle-o" /> {{item.userName}}</div>
          <div class="view-search-item-size"><van-icon name="play-circle-o" />  {{item.playback}} • {{formatDateTime(item.date)}} </div>
        </div>
        <van-divider />
      </div>

    </div>

  </div>
  <div style="height:1px; margin-top:-1px;clear: both;overflow:hidden;"></div>

</template>

<style scoped>
@import "@/css/mobile/search.css";
</style>