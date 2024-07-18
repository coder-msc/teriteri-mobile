<script setup lang="ts">
import {MSG_HEAD_TYPE, MsgCard, ViewMessage} from '../../../util/type'
import {computed, ref} from "vue";
import {formatDateTime2} from "@/util/util";
import route from '../../../router/router'
import {commentSectionReplyShow, ViewUserDynamicId} from "@/store/DataStore";
/**
 * 对动态的评论
 */

// const Obj=ref<ViewMessage>({
//   id:0, // 消息id,
//   type:"VIDEO_LIKE",
//   userName:"初音未来", // 用户的名字
//   userComment:"你好",// 用户的评论
//   userImageSrc:"https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",  // 用户头像
//   myComment: "收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到", // 我的评论内容
//   time:Date.now(),// 消息时间
//   userId:2,
//
//   spaceId:1, // 动态id
//   spaceTitle:"好的", // 动态标题
//   videoImageSrc:"public/interlude_Miku_in_Museland_5.png",// 图片路径
// })


const Pop= defineProps({
  Obj: {
    type:Object,
    default:null,
  }
})


const reMore=ref<boolean>(Pop.Obj.view)
function ToUser(){
  commentSectionReplyShow.value=false
  setTimeout(()=>{
    ViewUserDynamicId.value=Pop.Obj.userId
    // timeOrCollectionTitle.value='我的收藏'
    route.push('/userDynamic') // 跳转用户信息修改
    // route.push('/timeView')
  },200)
}


</script>

<template>
  <div id="view-user-brief"   :style="{ animation: (reMore==false)?' backgroundColorChange 3s infinite':''}"    @click="reMore=true">
    <div id="view-user-brief-image">
      <van-image
          round
          width="12rem"
          height="12rem"
          fit="cover"
          @click="ToUser"
          :src="Obj.userImageSrc"
      />
    </div>


    <div id="view-user-body-user">
      <div class="user-name">{{ Obj.userName }} <span  style="font-size: 3.8rem;color: #b1b3b8;"> 评论了我的动态</span>

        <!--        <el-icon :color="'#c8c9cc'" size="4.3rem"><EditPen /></el-icon>-->
      </div>
      <div class="user-massage">
        <div class="user-fan user-massage-item" >
          {{Obj.userComment}}
        </div>
        <div class="user-placeholding"></div>
      </div>
      <div class="user-massage-time">
        {{formatDateTime2(Obj.time)}}
      </div>

    </div>

    <div id="home-msg-chat-time" >
      <span  >
        {{Obj.spaceTitle}}
      </span>

    </div>


  </div>
</template>

<style scoped>
@media screen  and (min-device-width: 200px) and (max-device-width:500px) {

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
    background: white;
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
    padding: 1rem 1rem;
    font-size: 3.2rem;
    flex: 1 1 25rem;
    width: 10rem;
    margin-right: 0.1rem;
    /*background: #0bc15f;*/
    margin-top: -7rem;
    color:  #b1b3b8;
    background: #e9e9eb;
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