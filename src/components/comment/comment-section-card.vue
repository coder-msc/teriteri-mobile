<script setup lang="ts">

import {
  commentRoute,
  headObject,
  commentSectionReplyShow,
  ViewUpUserId,
  replyObject,
  ViewCommentArray, ViewUserDynamicId
} from "../../store/DataStore";
import {id} from '../../store/UserSrore'
import {computed, ref} from "vue";
import {COMMENTS_TYPE, Response, SERVICE_ROUT, ViewComment} from "../../util/type";
import {DeleteComment, formatDateTime} from "@/util/util";
import {showToast} from "vant";
import {HttpDelete, HttpPut} from "@/api/http";
import route from '../../router/router.js'
//import {ref} from "vue/dist/vue";


const cardData= defineProps({
  childShow:{  // 是否显示回复框的内容
    type:Boolean,
    default:true
  },
  testData:{
    type:Boolean,
    default:true
  },
  itemData:{
    type:Object,
    default:undefined

  }


})


console.log("收到的数据A：",cardData.itemData)
console.log("收到的数据B：",cardData.childShow)

//const popupShow=ref(false)

const noticeText=ref("那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己")  // 最后一定要是\n

// 三个评论区
//const child=ref<ViewComment[]>([])

// 测式数据   <----
// const comment=ref<ViewComment>({
//   deleteShow: true,
//   likeSize: 0,
//   videoId: 0,
//
//   child: [], content: noticeText.value, id: 0, parentId: 0, time: Date.now(), userImageSrc: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", userName: "足下可识武安君否"
//
// })

const comment=computed(()=>{
  return cardData.itemData
})

    //ref<ViewComment>(cardData.itemData)
 //child.value=comment.value.child
// if(!cardData.testData){
//   // 不是测试数据
//   comment.value=  commentRoute.value
// }
//
// function test(){
//   for(let i=0;i<getIndex();i++){
//     const comment2=ref<ViewComment>({
//       deleteShow: true,
//       likeSize: 0,
//       videoId: 0,
//       child: [], content: `${i}`+ noticeText.value, id: 0, parentId: 0, time: Date.now(), userImageSrc: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", userName: "足下可识武安君否"+i
//
//     })
//     comment.value.child.push(comment2.value)
//
//   }
//   if( comment.value.child.length>=3){
//     for (let i=0;i< 3;i++){
//       child.value.push( comment.value.child[i])
//     }
//   }else {
//     child.value=comment.value.child
//   }
//   console.log("得到的数据：",comment.value)
// }


//test()

const childTemp=computed(()=>{
  if(!(cardData.itemData&&cardData.itemData.child)){
    return []
  }
  if(cardData.itemData.child.length<=3){
        return cardData.itemData.child
  }
  if (cardData.itemData.child.length>3){
    return [cardData.itemData.child[0],cardData.itemData.child[1],cardData.itemData.child[2]]
  }

})

// 测式数据   ---->

function getIndex():number{
  // console.log(randomNum); // 输出随机整数
  return Math.floor(Math.random() * 10)
}

const i=ref(getIndex())

const h=ref(' <span>回复</span>')



// 跳转评论区的评论区
function OnClickToReply(item:ViewComment){
  //e.stopPropagation();
  commentRoute.value=item
  headObject.value=item
  console.log("发送的值：",commentRoute.value)
  setTimeout(()=>{
    commentSectionReplyShow.value=true
  },100)




}

// 输入回复
const  inputCommentInputDmInput=ref(null) // 真实弹幕输入框

function inputComment(item:ViewComment){




  replyObject.value=item
  console.log("回复对象：",replyObject.value)
  try {
    const inputCommentInputDmInput=document.getElementById('input-comment-inputDm-input')  // 输入框
    inputCommentInputDmInput.focus()  // 唤醒输入框
  }catch (e){
    console.error("唤醒输入框失败：",e)
  }

}
function OnClickTextEllipsis(e){
  e.stopPropagation();
}




// 点击按时间或是按风景
const fontColor=ref<"#2c3e50"|"#1989fa">("#2c3e50")
const OnTime=ref(false)
function OnClickHortOrTime(upload:boolean){ // 换颜色
 // e.stopPropagation();
  if(!upload){
    // 处于加载状态
    showToast({
      message: '此评论处于与添加中',
      position: 'top',
    });
    return;
  }

  inputComment(cardData.itemData)
  OnTime.value=!OnTime.value
  fontColor.value="#1989fa"
  setTimeout(()=>{
    fontColor.value="#2c3e50"
  },200)
}

//comment.likeSize
console.log("当前状态值：",cardData.itemData)
const likeState=ref<boolean>(cardData.itemData.likeState)
console.log("id:",cardData.itemData.id,"点赞状态：",cardData.itemData.likeState)
const likeSize=ref<boolean>(cardData.itemData.likeSize)
async function OnClickLike(upload:boolean,id:number){
  if(!upload){
    // 处于加载状态
    showToast({
      message: '此评论处于与添加中',
      position: 'top',
    });
    return;
  }
  if(likeState.value){
    // 取消点赞
    likeState.value=false
    likeSize.value--;
    HttpDelete(SERVICE_ROUT.VIDEO_COMMENTS_LIKE_DELETE+"/"+id)
  }else {
    // 点赞
    likeState.value=true
    likeSize.value++;
    HttpPut(SERVICE_ROUT.VIDEO_COMMENTS_LIKE_PUT+"/"+id)
  }

}

// 删除评论id
const isNoDelete=ref(true)
async function Delete(upload:boolean,commetId:number,parentId:number){

  console.log("当前全部评论：",ViewCommentArray.value)
  if(!upload){
    // 处于加载状态
    showToast({
      message: '此评论处于与添加中',
      position: 'top',
    });
    return;
  }
  console.log("需要删除的评论id:",commetId," 视频作者id：",ViewUpUserId.value," 当前本人用户id:",id.value)
  try {
  const rep:Response<string>=  (await HttpDelete(SERVICE_ROUT.VIDEO_COMMENTS_DELETE+"/"+commetId)).data
  if(rep.status==200){
    showToast({
      message: '评论删除成功',
      position: 'top',
    });
   // isNoDelete.value=false;
    if(parentId==-1){
      // 点击头部 -- 关闭
      commentSectionReplyShow.value=false
    }

    DeleteComment(commetId,parentId)

  }else {
    showToast({
      message: '评论删除失败',
      position: 'top',
    });
  }
  }catch (e){
    showToast({
      message: '评论删除失败',
      position: 'top',
    });
    isNoDelete.value=true;
  }



}



// 跳转 用户
function ToUser(){
  commentSectionReplyShow.value=false
  setTimeout(()=>{
    ViewUserDynamicId.value=cardData.itemData.userId
    // timeOrCollectionTitle.value='我的收藏'
    route.push('/userDynamic') // 跳转用户信息修改
    // route.push('/timeView')
  },200)
}
</script>

<template>
  <div class="comment-section-content-item" :style="{animation:itemData.upload?'':'opacityAnimation 1s infinite'}"  v-if="itemData&&isNoDelete">
    <van-divider />
    <div class="comment-section-content-item-image" @click.stop="ToUser">
      <van-image
          round
          width="9rem"
          height="9rem"
          fit="cover"

          :src="itemData.userImageSrc"
      />
    </div>
    <div class="comment-section-content-item-card">
      <div class="comment-section-content-item-card-user">
        <div class="comment-section-content-item-card-user-name">{{itemData.userName}}</div>
        <div  class="comment-section-content-item-card-user-time">{{formatDateTime(itemData.time)}}</div>
      </div>
      <div class="comment-section-content-item-card-comment">
<!--        <div   @click ="inputComment(comment)" class="comment-section-content-item-card-comment-title">-->
        <div    class="comment-section-content-item-card-comment-title">

        <span v-if="itemData&&itemData.type==COMMENTS_TYPE.VIDEO_REFUTATION&&itemData.toComment">回复：<span style="color: #1989fa">@{{itemData.toComment.userName}}:</span></span>

           <van-text-ellipsis
            @click-action="OnClickTextEllipsis"
              rows="6"
              :content="comment.content+'\n'"
              :expand-text="'\n'+'展开'"
              collapse-text="收起"
              dots=""


          />


        </div>
        <div class="comment-section-content-item-card-comment-fonts">
          <div class="comment-section-content-item-card-comment-font"  @click.stop="OnClickLike(itemData.upload,itemData.id)"><van-icon :color="likeState?'#0264e7':''" size="5rem" name="good-job-o" /> <span style="text-indent: 1rem;">{{likeSize}}</span></div>
          <div class="comment-section-content-item-card-comment-font" @click.stop ="OnClickHortOrTime(itemData.upload)"><van-icon size="5rem" :color="fontColor" name="chat-o" /></div>
          <div class="comment-section-content-item-card-comment-font-m"> </div>
          <div class="comment-section-content-item-card-comment-font-last" v-if="itemData.deleteShow" @click.stop="Delete(itemData.upload,itemData.id,itemData.parentId)"><van-icon size="5rem" name="delete-o" /></div>
        </div>

      </div>
      <div class="comment-section-content-item-card-reply"  @click.stop="OnClickToReply(itemData)"  v-if="itemData&&itemData.type==COMMENTS_TYPE.VIDEO&&childShow&&itemData.child.length>0">
        <div class="comment-section-content-item-card-reply-item" >
          <div class="comment-section-content-item-card-reply-name" v-for="(item,index) in childTemp" :key="index">
            <template v-if="item.type==COMMENTS_TYPE.VIDEO_REPLY">
              <span>{{item.userName}}：</span>
              <span class="comment-section-content-item-card-reply-name-pl">{{item.content}}</span>

            </template>
            <template v-else>
              <span>{{item.userName}}<span style="color: black"> 回复 </span> @{{item.toComment.userName}}：</span>
              <span class="comment-section-content-item-card-reply-name-pl">{{item.content}}</span>

            </template>
          </div>



        </div>
        <div v-if="itemData.child.length>3"   @click="commentSectionReplyShow=true" class="comment-section-content-item-card-reply-more">共{{itemData.child.length}}条回复 <van-icon name="arrow" /></div>
      </div>

    </div>

  </div>

</template>

<style scoped >
@import "@/css/mobile/comment-section-card.css";
</style>