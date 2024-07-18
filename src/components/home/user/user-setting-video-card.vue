<script setup   lang="ts">

import {ref} from "vue";
import {viewVideoId} from "@/store/DataStore";
import {routerTo} from "@/util/util";

import {UserSettingVideo} from '../../../store/DataStore'
import {formatDateTime, formatTime} from "../../../util/util";
import {closeToast, showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast, showToast} from "vant";
import {HttpDelete} from "@/api/http";
import {SERVICE_ROUT} from "@/util/type";

import route from '../../../router/router.js'
import {InitData} from "@/store/UserSrore";

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

function toView(videoId:number,item:any){
  if(item&&('review' in item)&& item.review==false){
    // 视频审核中
    showToast({
      message: '视频审核中',
      position: 'top',
    });

    return
  }


  if(item&&('showVideo' in item)&& item.showVideo==false){
    // 视频审核中
    showToast({
      message: '视频审核未通过',
      position: 'top',
    });

    return
  }

  console.log("跳转o:",videoId)
  viewVideoId.value=videoId

  routerTo("/view")

}

 async function  DeleteVideo(videoId:number,index:number) {
  console.log("需要删除的视频Id:", videoId)

  showConfirmDialog({
    title: '删除视频',
    message:
        '删除后无法恢复',

  }).then(async () => {
    console.log("确定")

    showLoadingToast({
      message: '删除中...',
      forbidClick: true,
      duration: 100000
    });
    try {
      await HttpDelete(SERVICE_ROUT.USER_VIDEO_LIST_DELETE+"/"+videoId);
      closeToast(true)
      showSuccessToast('删除成功');
      await InitData();
      try {
        ProP.recommend.splice(index,1)
      }catch (e) {
        console.log(e)
      }

    }catch (e){
      closeToast(true)
      showFailToast('删除失败');
      console.error("error:",e)
    }
  });





}


// 分享数据

const showShare = ref(false);
const options = [
  { name: '修改', icon: 'records',className: 'aaa' },
  { name: '删除', icon: 'delete' },

];


// 点击详情框
const operateId=ref<number>(-1)
const operateIndex=ref<number>(-1)
function OnclickSheet(videoId:number,index:number){
  showShare.value = true
  operateId.value=videoId;
  operateIndex.value=index;
  console.log("需要修改的视频：",videoId," 占位：",index);
}

const onSelect = (option) => {
 // showToast(option.name);

  showShare.value = false;
  if(option.name=='删除'){
    DeleteVideo(operateId.value,operateIndex.value)
    return;
  }

  if(option.name=='修改'){
    UserSettingVideo.value=operateId.value
    route.push("/userSettingVideoSetting")
    return;
  }
};

</script>

<template>

  <div id="view-search">
    <div class="view-search-item"   :key="item.videoId" v-for="(item,index) in recommend" @click="toView(item.videoId,item)">
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
          <div class="view-search-item-view"  v-if="item.showVideo==false" style="color:red"> {{item.reviewMsg}}</div>
          <div class="view-search-item-size" style="position: relative">{{formatDateTime(item.date)}}  <van-icon   @click.stop="OnclickSheet(item.videoId,index)" class="user-video-setting-card-font"  size="5rem" name="ellipsis" /></div>

        </div>
        <van-divider />
      </div>

    </div>

  </div>
  <div style="height:1px; margin-top:-1px;clear: both;overflow:hidden;"></div>


  <van-share-sheet
      style="font-size: 8rem"
      v-model:show="showShare"
      title="操作"
      :options="options"
      @select="onSelect"
  />
</template>

<style scoped>
@import "@/css/mobile/search.css";

.user-video-setting-card-font{
    position: absolute;
  right: 4rem;
  transition: color 0.3s ease;
}
.user-video-setting-card-font:active{
  color: #0264e7;;
}

.user-video-setting-card-font2{
  position: absolute;
  right: 4rem;
  transition: color 0.3s ease;
}
.user-video-setting-card-font2:active{
  color: #0264e7;;
}

.aaa{
  color: #0bc15f;
  font-size: 6rem;
}
</style>