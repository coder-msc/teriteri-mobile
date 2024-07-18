<script setup lang="ts">
// 评论区
//import {commentSectionReplyShow} from '../../store/DataStore'


import {ref, watch} from "vue";
import CommentSectionCard from "@/components/comment/comment-section-card.vue";
import {Comments, COMMENTS_TYPE, SERVICE_ROUT, ViewComment} from "../../util/type";
import {
  addOrDeleteNumber,
  addOrDeleteObject,
  headObject,
  replyObject,
  typeShow,
  ViewCommentArray, viewVideoId
} from "../../store/DataStore";

import {id, userImage, userName} from '../../store/UserSrore'
import {HttpPut} from "@/api/http";
// import CommentSectionReply from "@/components/comment/comment-section-reply.vue";
// import CommentSectionCard from "@/components/comment/comment-section-card.vue";


const popupShow=ref(false)

const noticeText=ref("那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己")  // 最后一定要是\n


function getIndex():number{
  // console.log(randomNum); // 输出随机整数
  return Math.floor(Math.random() * 4)
}

const i=ref(2)




const testViewComment= ref<ViewComment>({
      deleteShow: true,
      likeSize: 0,
      videoId: 0,

      child: [], content: '那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己',
  id: 0, parentId: 0, time: Date.now(), userImageSrc: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", userName: "足下可识武安君否",
      type:COMMENTS_TYPE.VIDEO
    }
)

//const ViewCommentArray= ref<ViewComment[]>([testViewComment.value])

watch(addOrDeleteNumber,(newValue,oldValue)=>{
  const AddOrDelete=addOrDeleteObject.value
  if(newValue>oldValue){
    // 添加数据--复杂



    //ViewCommentArray.value.push(AddOrDelete)
    CommentService(AddOrDelete)
    if( ! (headObject&& headObject.value)){  // 评论状态的话
      replyObject.value=headObject.value
    }
  //  replyObject.value=null
  }else if(newValue<oldValue){
    // 删除数据
  }
})

//
// // 自己评论自己--不在这-在构建输入时候
// function UserMyCommentService(item: ViewComment){
//   const type=item.type
//   switch (type){
//     case COMMENTS_TYPE.VIDEO:
//       // 添加评论
//       ViewCommentArray.value.push(item)
//       break;
//     case COMMENTS_TYPE.VIDEO_REPLY:
//       // 对回复添加回复
//       // console.log("收到评论 或者是")
//       const findResult= ViewCommentArray.value.find(temp=>temp.id==item.parentId);
//       if(!findResult){
//         return;
//       }
//       if(("child" in findResult.child)&&!findResult.child){
//         findResult.child=[]
//       }
//
//       findResult.child.push(item);
//       console.log("添加评论的评论后：",ViewCommentArray.value)
//       replyObject.value=null
//       break;
//     case COMMENTS_TYPE.VIDEO_REFUTATION:
//
//       if(!(item&&item.toComment)){
//         return;
//       }
//       console.log("回队评论",item)
//       const findResult2= ViewCommentArray.value.find(temp=>temp.id==item.toComment.parentId);
//       if(!findResult2){
//         return;
//       }
//       if(("child" in findResult2.child)&&!findResult2.child){
//         findResult2.child=[]
//       }
//
//       findResult2.child.push(item);
//       console.log("添加评论的评论后：",ViewCommentArray.value)
//       replyObject.value=null  //发送成功--对象重置
//       // ViewCommentArray
//       break;
//   }
// }


// 添加评论
function CommentService(item: ViewComment){

  console.log("需要处理的评论：",item)

  if(!item){
    return ;
  }
  console.log("需要处理的评论：",item)
  const type=item.type


  switch (type){
    case COMMENTS_TYPE.VIDEO:
      // 添加评论
        // {comments={commentsType=VIDEO, content=asd , date=1713197678917, likeNum=0, parentId=-1, review=false, toCommentId=-1, userId=null, userImageSrc=undefined, userName={__v_isShallow=false, __v_isRef=true, _rawValue=undefined, _value=undefined}, videoId=0}}


      ViewCommentArray.value.push(item)

      try {
        const comments:Comments={

          videoId:viewVideoId.value,
          toCommentId: -1,
          userId:id.value,

          userName:userName.value,
          userImageSrc:userImage.value,
          commentsType:COMMENTS_TYPE.VIDEO,
          content:item.content,
          parentId:-1,
          likeNum:0,
          date:Date.now(),

        }

        HttpPut(SERVICE_ROUT.VIDEO_COMMENTS_PUT,comments).then((d)=>{
          try {
            if(d.data.status==200){
              item.id=d.data.body;
              item.upload=true
            }
          }catch (e){

          }

          console.log("响应体:",d.data)
        }).catch(e=>{
          console.error("error:",e)
        })
      }catch (e){
        console.error(e)
      }

      break;
    case COMMENTS_TYPE.VIDEO_REPLY:
      // 对回复添加回复
     // console.log("收到评论 或者是")


      const findResult= ViewCommentArray.value.find(temp=>temp.id==item.parentId);
      if(!findResult){
        return;
      }
      if(("child" in findResult.child)&&!findResult.child){
        findResult.child=[]
      }



      findResult.child.push(item);
      try {
        const comments2={

          videoId:viewVideoId.value,
          toCommentId: item.toComment.id,
          userId:id.value,

          userName:userName.value,
          userImageSrc:userImage.value,
          commentsType:COMMENTS_TYPE.VIDEO_REPLY,
          content:item.content,
          parentId:item.parentId,
          likeNum:0,
          date:Date.now(),

        }
        HttpPut(SERVICE_ROUT.VIDEO_COMMENTS_PUT,comments2).then((d)=>{
          try {
            if(d.data.status==200){
              item.id=d.data.body;
              item.upload=true
            }
          }catch (e){

          }

          console.log("响应体:",d.data)
        }).catch(e=>{
          console.error("error:",e)
        })
      }catch (e){
        console.error(e)
      }

      console.log("添加评论的评论后：",ViewCommentArray.value)
     //replyObject.value=null
      break;
    case COMMENTS_TYPE.VIDEO_REFUTATION:

      if(!(item&&item.toComment)){
        return;
      }
      console.log("回怼评论",item)
      const findResult2= ViewCommentArray.value.find(temp=>temp.id==item.toComment.parentId);
      if(!findResult2){
        return;
      }
      if(("child" in findResult2.child)&&!findResult2.child){
        findResult2.child=[]
      }



      findResult2.child.push(item);
      try {
        const comments3:Comments={

          videoId:viewVideoId.value,
          toCommentId: item.toComment.id,
          userId:id.value,

          userName:userName.value,
          userImageSrc:userImage.value,
          commentsType:COMMENTS_TYPE.VIDEO_REFUTATION,
          content:item.content,
          parentId:item.parentId,
          likeNum:0,
          date:Date.now(),

        }
        HttpPut(SERVICE_ROUT.VIDEO_COMMENTS_PUT,comments3).then((d)=>{
          try {
            if(d.data.status==200){
              item.id=d.data.body;
              item.upload=true
            }
          }catch (e){

          }

          console.log("响应体:",d.data)
        }).catch(e=>{
          console.error("error:",e)
        })
      }catch (e){
        console.error(e)
      }

      console.log("添加评论的评论后：",ViewCommentArray.value)
   //   replyObject.value=null  //发送成功--对象重置
     // ViewCommentArray
      break;
  }

}



const childA=ref<ViewComment>({
  content: "我支持你",
  deleteShow: true,
  id: 2,
  likeSize: 20,
  parentId: 0,
  time: Date.now(),
  userImageSrc: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  userName: "小王",
  videoId: 0,
  type:COMMENTS_TYPE.VIDEO_REPLY
})

const childF=ref<ViewComment>({
  content: "话说得真好听，爱了！爱了！",
  deleteShow: true,
  id: 6,
  likeSize: 320,
  parentId: 0,
  time: Date.now(),
  userImageSrc: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  userName: "小周",
  videoId: 0,
  type:COMMENTS_TYPE.VIDEO_REPLY
})

const childB=ref<ViewComment>({
  content: "我不不支持他",
  deleteShow: true,
  id: 3,
  likeSize: 211,
  parentId: 0,
  time: Date.now(),
  userImageSrc: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  userName: "小红",
  videoId: 0,
  type:COMMENTS_TYPE.VIDEO_REPLY

})
const childC=ref<ViewComment>({
  content: "同。",
  deleteShow: true,
  toComment:childA.value,
  id: 4,
  likeSize: 30,
  parentId: 0,
  time: Date.now(),
  userImageSrc: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  userName: "小里",
  videoId: 0,
  type:COMMENTS_TYPE.VIDEO_REFUTATION

})


testViewComment.value.child.push(childA.value)
testViewComment.value.child.push(childB.value)
testViewComment.value.child.push(childF.value)
testViewComment.value.child.push(childC.value)




const ProP=  defineProps({
  recommend:{
    type:Object,
    default:null,
  }
});




console.log("评论数据：",ProP.recommend)
//ViewCommentArray.value= Assignment(ProP.viewCardBody.Comment)
//console.log("评论数据：",ViewCommentArray.value)

// 点击按时间或是按风景
const fontColor=ref<"#b1b3b8"|"#1989fa">("#b1b3b8")
const OnTime=ref(false)
function OnClickHortOrTime(){ // 换颜色
  OnTime.value=!OnTime.value
  if(OnTime.value){
    // TODO 评论排序
    ViewCommentArray.value.sort((a,b)=>b.time-a.time)
  }else {
    ViewCommentArray.value.sort((a,b)=>b.likeSize-a.likeSize)
  }
  fontColor.value="#1989fa"
  setTimeout(()=>{
    fontColor.value="#b1b3b8"
  },200)
}


</script>

<template>
  <van-notice-bar
      scrollable

      left-icon="volume-o"

      :text='noticeText'
      v-if="typeShow==1"
  />
    <div id="comment-section">








      <div id="comment-section-content" >
        <div id="comment-section-popup-content-main">
          <!--             评论头-->
          <div class="comment-section-popup-content-main-size">{{OnTime?'最新评论':'热门评论'}}</div>
          <div class="comment-section-popup-content-main-m"></div>
          <div class="comment-section-popup-content-main-font" @click="OnClickHortOrTime" :style="{color:fontColor}" ><van-icon :color="fontColor" name="list-switch" /> {{OnTime?'按时间':'按热度'}}</div>
        </div>
        <comment-section-card :itemData="item"  v-for="(item,index) in ViewCommentArray" :key="item.id" ></comment-section-card>

        <div v-if="!(ViewCommentArray&&ViewCommentArray.length!=0)">
          <van-empty description="暂无数据>_<" />
        </div>

        <div class="comment-section-popup-content-main-zw"></div>
      </div>

    </div>
</template>

<style scoped>
@import "@/css/mobile/comment-section.css";




</style>