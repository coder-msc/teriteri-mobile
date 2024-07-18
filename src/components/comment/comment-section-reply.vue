<script setup lang="ts">
/**
 * 评论回复的展示
 *
 * 评论的评论
 */
import {
  commentRoute,
  commentSectionReplyShow,
  emojiShow,
  headObject,
  inputCommentTopShow,
  replyObject, ViewCommentArray
} from '../../store/DataStore'
import CommentSectionCard from "@/components/comment/comment-section-card.vue";
import {ref, watch} from "vue";
import {COMMENTS_TYPE, ViewComment} from "../../util/type";

// commentRoute.value={
//   deleteShow: true,
//   likeSize: 0,
//   videoId: 0,
//
//   child: [], content: '消息传递测试', id: 0, parentId: 0, time: Date.now(), userImageSrc: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", userName: "足下可识武安君否",
//   type:COMMENTS_TYPE.VIDEO
// }




const testDate=ref<ViewComment>(commentRoute.value)
// watch(commentRoute,(newValue)=>{
//   if(newValue){
//     testDate.value=commentRoute.value
//     commentRoute.value.child.sort((a,b)=>b.likeSize-a.likeSize)
//     replyObject.value=testDate.value // 添加回复对象
//     console.log("回复区展开",replyObject.value)
//   }
// })

watch(commentSectionReplyShow,(newValue)=>{
  //console.log("commentSectionReplyShow的值有改变",commentSectionReplyShow.value)
  if( newValue){
  // commentRoute.value.child.sort((a,b)=>b.likeSize-a.likeSize)
    console.log("接收到的值：",commentRoute.value)
     testDate.value=commentRoute.value
    commentRoute.value.child.sort((a,b)=>b.likeSize-a.likeSize)
     replyObject.value=testDate.value // 添加回复对象
    console.log("回复区展开",replyObject.value)
    console.log("评论区区回复收到的值：",commentRoute.value)
  }else {
    commentSectionReplyShow.value
    replyObject.value=null
    headObject.value=null
    console.log("回复区关闭--清除headObject和headObject")
  }
})

// function test(){
//   const childA=ref<ViewComment>({
//     content: "我支持你",
//     deleteShow: true,
//     id: 2,
//     likeSize: 20,
//     parentId: 0,
//     time: Date.now(),
//     userImageSrc: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
//     userName: "小王",
//     videoId: 0,
//     type:COMMENTS_TYPE.VIDEO_REPLY
//   })
//
//   const childB=ref<ViewComment>({
//     content: "我不不支持他",
//     deleteShow: true,
//     id: 3,
//     likeSize: 211,
//     parentId: 0,
//     time: Date.now(),
//     userImageSrc: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
//     userName: "小红",
//     videoId: 0,
//     type:COMMENTS_TYPE.VIDEO_REPLY
//
//   })
//   const childC=ref<ViewComment>({
//     content: "同。",
//     deleteShow: true,
//     toComment:childA.value,
//     id: 4,
//     likeSize: 30,
//     parentId: 0,
//     time: Date.now(),
//     userImageSrc: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
//     userName: "小里",
//     videoId: 0,
//     type:COMMENTS_TYPE.VIDEO_REFUTATION
//
//   })
//
//
//   testDate.value.child.push(childA.value)
//   testDate.value.child.push(childB.value)
//   testDate.value.child.push(childC.value)
// }
//
// try {
//   //test()
// }catch {
//
// }
// 点击按时间或是按风景
const fontColor=ref<"#b1b3b8"|"#1989fa">("#b1b3b8")
const OnTime=ref(false)
function OnClickHortOrTime(){ // 换颜色
  OnTime.value=!OnTime.value

  if(OnTime.value){
    // TODO 评论排序
    commentRoute.value.child.sort((a,b)=>b.time-a.time)
  }else {
    commentRoute.value.child.sort((a,b)=>b.likeSize-a.likeSize)
  }

  fontColor.value="#1989fa"
  setTimeout(()=>{
    fontColor.value="#b1b3b8"
  },200)
}


function OnClickfonStop(){
  // 清除浮动
  emojiShow.value=false // 关闭表情框--控件2
  inputCommentTopShow.value=false // 输入框是否需要悬浮在背景框

}

function OnClickPopup(){
  commentSectionReplyShow.value=!commentSectionReplyShow.value
  OnClickfonStop()
}
</script>

<template>
    <div id="comment-section-reply"  v-if="commentRoute" @click.stop="OnClickfonStop">
      <van-popup
          @click-close-icon="OnClickPopup"
          @click-overlay="OnClickPopup"
          v-model:show="commentSectionReplyShow"
          duration="0.3"
          position="bottom"
          id="comment-section-reply-popup"
      >
        <div id="comment-section-popup-content">
          <div id="comment-section-popup-content-user">
          <comment-section-card  :itemData="commentRoute" :childShow="false"  :testData="false"></comment-section-card>
          </div>
          <div id="comment-section-popup-content-main" v-if="commentRoute&&commentRoute.child">
<!--             评论头-->
            <div class="comment-section-popup-content-main-size">相关回复共{{commentRoute.child.length}}条</div>
            <div class="comment-section-popup-content-main-m"></div>
            <div class="comment-section-popup-content-main-font" @click="OnClickHortOrTime" :style="{color:fontColor}" ><van-icon :color="fontColor" name="list-switch" /> {{OnTime?'按时间':'按热度'}}</div>
          </div>
          <div id="comment-section-popup-content-child" v-if="commentRoute&&commentRoute.child">
            <comment-section-card   v-for="(item,index) in commentRoute.child" :itemData="item"  :childShow="false"  :testData="false" :key="item.id"></comment-section-card>
          </div>
        </div>
      </van-popup>
    </div>
</template>

<style scoped>
@import "@/css/mobile/comment-section-reply.css";

</style>