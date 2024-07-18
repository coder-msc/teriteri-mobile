<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import route from "@/router/router.js";
import HomeMsgHeadCar from "@/components/home/msg/home-msg-head-car.vue";

import {MESSAGE_TYPE, MSG_HEAD_TYPE, MsgCard, Response, SERVICE_ROUT} from '../../../util/type'
import HomeMsgVideoLike from "@/components/home/msg/home-msg-video-like.vue";
import HomeMsgVideoCollection from "@/components/home/msg/home-msg-video-collection.vue";
import HomeMsgVideoComment from "@/components/home/msg/home-msg-video-comment.vue";
import HomeMsgCommentLike from "@/components/home/msg/home-msg-comment-like.vue";
import HomeMsgCommentReply from "@/components/home/msg/home-msg-comment-reply.vue";
import HomeMsgSpaceComment from "@/components/home/msg/home-msg-space-comment.vue";
import {homeMessageList, homeMessageShowSize} from "@/store/DataStore";
import {HttpPost} from "@/api/http";
const visible=ref(true)

function OnClickBar(){
  visible.value=false
  setTimeout(()=>{
    route.back()
  },200)

}


const  props= defineProps({
  type:{
    type:String,
    default:MSG_HEAD_TYPE.LIKE
  }
})
const title=computed(()=>{
  return props.type
})

const tt=ref<MsgCard>({
  id:0, // 消息id,
  imageShow:true ,// 消息：类型，
  commentShow:false,
  userName:"初音未来2", // 用户的名字
  userComment:"你好",// 用户的评论
  myComment: "收到", // 我的评论内容
  time:Date.now(),// 消息时间
  videoImageSrc:"public/interlude_Miku_in_Museland_5.png",// 图片路径
})




async function messageRemove(){
  const remList=  homeMessageList.value.filter(item=>!item.view).map(item=>item.id)
  if(homeMessageShowSize.value>0){
    homeMessageShowSize.value=homeMessageShowSize.value- remList.length;
  }

  const rep:Response<number>= (await HttpPost(SERVICE_ROUT.MESSAGE_REMOVE,remList)).data

  if(rep.status==200){
    console.log("消息查阅完成：",remList)
  }

}

onMounted( async ()=>{
  await messageRemove();
})



const reMore=ref(false)


function  mm(){
  reMore.value=true
  console.log("停止山")
}
</script>

<template>
  <transition name="van-slide-right">

    <div id="time-view" v-show="visible&&homeMessageList">
      <div id="time-view-head">
        <van-nav-bar
            title="收到的消息"



        />
      </div>
<!--      <home-msg-head-car :content="tt" :type="MSG_HEAD_TYPE.LIKE_VIDE"></home-msg-head-car>-->

      <div     v-if="homeMessageList&&homeMessageList.length" v-for="(item,index) in homeMessageList" :key="item.id">

        <!--    视频点赞-->
        <home-msg-video-like           :Obj="item"  v-if="item&&item.type==MESSAGE_TYPE.VIDEO_LIKE"></home-msg-video-like>
        <!--      视频收藏-->
        <home-msg-video-collection          :Obj="item"  v-else-if="item&&item.type==MESSAGE_TYPE.VIDEO_COLLECTION"></home-msg-video-collection>
        <!--      视频评论-->
        <home-msg-video-comment            :Obj="item"  v-else-if="item&&item.type==MESSAGE_TYPE.VIDEO_COMMENTS"></home-msg-video-comment>
        <!--      评论点赞-->
        <home-msg-comment-like             :Obj="item"  v-else-if="item&&item.type==MESSAGE_TYPE.COMMENTS_LIKE"> </home-msg-comment-like>
        <!--    评论回复  -->
        <home-msg-comment-reply             :Obj="item"  v-else-if="item&&item.type==MESSAGE_TYPE.COMMENTS_REPLY"></home-msg-comment-reply>
        <!--    动态回复  -->
        <home-msg-space-comment             :Obj="item"  v-else-if="item&&item.type==MESSAGE_TYPE.SPACE_COMMENTS"></home-msg-space-comment>
      </div>
      <div>
        <van-empty description="暂无数据>_<" />
      </div>

<!--      <home-msg-comment-like  :Obj="homeMessageList[1]"  > </home-msg-comment-like>-->
<!--      <home-msg-comment-reply @click="mm"  :style="{ animation: (reMore==false)?' backgroundColorChange 3s infinite':''}" :Obj="homeMessageList[0]"></home-msg-comment-reply>-->


      <!--      <home-msg-comment-like  :Obj="homeMessageList[0]"  > </home-msg-comment-like>-->
<!--    -->
    </div>
  </transition>

</template>

<style scoped>


@media screen  and (min-device-width: 200px) and (max-device-width:500px) {



  .element {
    animation: backgroundColorChange 5s infinite alternate;
  }

  #time-view{
    width: 100vw;
    height: 94vh;
    overflow-y: auto;
    /*background: #0bc15f;*/
  }
  #time-view-head{
    /*background: yellow;*/
    flex: 0 0 11rem;
    /*display: ;*/
    top: 0;
    position: sticky;
    z-index: 999;
  }

}
</style>