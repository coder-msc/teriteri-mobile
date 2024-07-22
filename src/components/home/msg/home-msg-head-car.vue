<script setup lang="ts">
import {MSG_HEAD_TYPE,MsgCard} from '../../../util/type'
import {computed, ref} from "vue";
import {formatDateTime2} from "@/util/util";

const tt=ref<MsgCard>({
  id:0, // 消息id,
  imageShow:false ,// 消息：类型，
  commentShow:false,
  userName:"初音未来", // 用户的名字
  userComment:"你好",// 用户的评论
  myComment: "收到", // 我的评论内容
  time:Date.now(),// 消息时间
  videoImageSrc:"public/interlude_Miku_in_Museland_5.png",// 图片路径


})

 const  props= defineProps({
   type:{
     type:String,
     default:MSG_HEAD_TYPE.LIKE
   },
   content:{
     type:Object,
     default:{
       id:0, // 消息id,
       imageShow:false ,// 消息：类型，
       commentShow:true,
       userName:"初音未来", // 用户的名字
       userComment:"你好",// 用户的评论
       myComment: "收到", // 我的评论内容
       time:Date.now(),// 消息时间
       videoImageSrc:"public/interlude_Miku_in_Museland_5.png",// 图片路径
     }

   }
})
const head=computed(()=>{
  switch (props.type){
    case MSG_HEAD_TYPE.REPLY_VIDE:
      return "评论了我的视频"
    case MSG_HEAD_TYPE.LIKE_COMMENTS:
      return "点赞了我的评论"
    case MSG_HEAD_TYPE.LIKE_VIDE:
      return "点赞了我的视频"
    case MSG_HEAD_TYPE.NOTICE:
      return ""
    case MSG_HEAD_TYPE.REPLY_COMMENTS:
      return "回复了我的评论"
  }
  return props.type
})
</script>

<template>
  <div id="view-user-brief">
    <div id="view-user-brief-image">
      <van-image
          round
          width="12rem"
          height="12rem"
          fit="cover"

          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </div>


    <div id="view-user-body-user">
      <div class="user-name">{{ content.userName }} <span  style="font-size: 3.8rem;color: #b1b3b8;"> {{head}}</span>

        <!--        <el-icon :color="'#c8c9cc'" size="4.3rem"><EditPen /></el-icon>-->
      </div>
      <div class="user-massage">
        <div class="user-fan user-massage-item" >
          {{content.userComment}}
          我不理解
        </div>

        <div class="user-placeholding"></div>
      </div>
      <div class="user-massage-time">
        {{formatDateTime2(content.time)}}
      </div>

    </div>

    <div id="home-msg-chat-time">
      <span v-if="!content.imageShow"  >
        {{content.myComment}}
      </span>
      <van-image
          v-if="content.imageShow"

          width="25rem"
          height="20rem"
          :src="content.videoImageSrc"
      />
    </div>


  </div>
</template>

<style scoped>
/*@media screen  and (min-device-width: 200px) and (max-device-width:500px) {*/
@media screen    {

  .user-massage-time{
    color: #b1b3b8;
    font-size: 3.2rem;

  }

  #view-user-body-user{
    margin-left: 2rem;

    flex: 0 1 55rem;
    display: flex;
    flex-direction: column;

  }

  .user-massage{
    font-size: 2rem;

    display: flex;
  }

  .user-name{
    font-size: 4rem;

    color: black;

  }
  .user-massage-item{

    color: #b1b3b8;
    font-size: 3.2rem;


    overflow: hidden; /* 溢出隐藏 */
    text-overflow: ellipsis; /* 显示省略号 */

    display: -webkit-box;
    -webkit-box-orient: vertical;
    /*两行后省略*/
    -webkit-line-clamp: 1;
  }
  .user-placeholding{
    flex: 1 1 1rem;
  }

  #view-user-brief{
    /*background: blue;*/
    flex: 1 0 35rem;
    /*margin-left: 4rem;*/
    display: flex;
    height: 22rem;
    align-items: center;
    padding-left: 3rem;

    transition: background-color 0.3s ease; /* 添加过渡效果 */

    /*background: yellow;*/
    border-bottom: 1px solid #dedfe0;
    /*border-top: 1px solid #dedfe0;*/
    /*margin-bottom: 3rem;*/
  }
  #view-user-brief:active{
    background-color: #e9e9eb; /* 点击后改变背景颜色 */
  }
  #view-user-brief-image{
    display: flex;
    align-items: center;
  }
  #home-msg-chat-time{
    font-size: 3.2rem;
    flex: 1 1 25rem;
    width: 10rem;
    margin-right: 0.1rem;
    /*background: #0bc15f;*/
    margin-top: -7rem;
    color:  #c8c9cc;
    height: 20rem;
    //background: blue;
    margin: 0 auto;
    height: 16rem;

    overflow: hidden; /* 溢出隐藏 */
    text-overflow: ellipsis; /* 显示省略号 */

    display: -webkit-box;
    -webkit-box-orient: vertical;
    /*两行后省略*/
    -webkit-line-clamp: 3;
    margin-left: 2rem;
    margin-right: 2rem;
    border-radius: 2rem;

  }
  #view-user-brief-m{
    margin: 1.5rem 1.5rem;
    width: 100%;
    border-bottom: 1px solid #dedfe0;
  }
}
</style>
