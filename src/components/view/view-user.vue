<!--
用户简介界面

-->

<script setup lang="ts">
import {ref, toRefs} from "vue";
import {shareShow, videoSocket, ViewUserDynamicId, viewVideoId} from '../../store/DataStore'
import {id, userRole} from '../../store/UserSrore'
import {formatDateTime3} from  '../../util/util'
import Search from "@/components/home/search/search-view.vue";
import {HttpDelete, HttpPut} from "@/api/http";
import {Response, SERVICE_ROUT, USER_Role} from "../../util/type";
import {showToast} from "vant";
import route from '../../router/router.js'
import {InitData} from "../../store/UserSrore";
import {Ws} from '../../api/WebSocket'
 //import {shareShow} from '../../store/RouterStore'


const activeNames = ref([]);


// 下面一排按钮  <---

const buttonLike=ref(false)  // 点赞
const buttonNoLike=ref(false)  // 不喜欢
const buttonFire=ref(false)  // 热度
const  buttonCollection=ref(false)  // 收藏
const buttonShare=ref(false)  // 转发

// 下面一排按钮  --->

// const { showShare } = defineProps({
//   showShare:{
//     type: Boolean, // 接收的参数类型
//     default: false, //默认值
//   }
//
// })



// const props = defineProps({
//   showShare: Boolean,
// })
// //使用父组件传递过来的值
// const {showShare} =toRefs(props)
//
// setInterval(()=>{
//   console.log("值数据：",props.showShare)
// })

const ProP=  defineProps({
  msg: {
    type: Boolean,	// 类型
    required: true,	// 是否必传
  },
  viewCardBody:{
    type:Object,
    default:null,
  }
});

const labe=ref([])

const labs= ProP.viewCardBody.label.split(';')
labe.value=labs

const userButton=ref<boolean>(ProP.viewCardBody.concern) // 关注状态
async function  OnClickConcern(){  //
  if(userRole.value==null||userRole.value==''||userRole.value==USER_Role.VISITOR){
    showToast({
      message: '账号未登录',
      position: 'top',
    });

    return;
  }

  if(userButton.value){
    // 取消关注
    userButton.value=false

    try {
      await HttpDelete(SERVICE_ROUT.USER_CONCERN_DELETE+"/"+ProP.viewCardBody.userId)

    }catch (e){

    }
  }else {
    // 关注
    userButton.value=true
    await HttpPut(SERVICE_ROUT.USER_CONCERN_PUT+"/"+ProP.viewCardBody.userId)
  }

 await InitData()
}


// 收藏
const collectionState=ref<Boolean>(ProP.viewCardBody.collectionState)
const collectionSize=ref<Number>(ProP.viewCardBody.collectionSize)
function OnClickCollection(){
    try {
      if (collectionState.value){
        // 取消点赞
        if(collectionSize.value>0){
          collectionSize.value--
          collectionState.value=false
          HttpDelete(SERVICE_ROUT.VIDEO_COLLECTION_DELETE+"/"+ProP.viewCardBody.videoId);
        }

      }else {
        // 点赞
        collectionState.value=true
        collectionSize.value++
        HttpPut(SERVICE_ROUT.VIDEO_COLLECTION_PUT+"/"+ProP.viewCardBody.videoId);
      }
    }catch (e){
      console.error(e)
    }
}



// 点赞
const likeState=ref<Boolean>(ProP.viewCardBody.likeState)
const likeSize=ref<Number>(ProP.viewCardBody.likeSize)
function OnClickLike(){
  try {
    if (likeState.value){
      // 取消点赞
      if(likeSize.value>0){
        likeSize.value--
        likeState.value=false
        HttpDelete(SERVICE_ROUT.VIDEO_LIKE_DELETE+"/"+ProP.viewCardBody.videoId);
      }

    }else {
      // 点赞
      likeState.value=true
      likeSize.value++
      HttpPut(SERVICE_ROUT.VIDEO_LIKE_PUT+"/"+ProP.viewCardBody.videoId);
    }
  }catch (e){
    console.error(e)
  }
}

// 点踩
const noLikeState=ref<Boolean>(ProP.viewCardBody.noLikeState)

function OnClickNoLike(){
  try {
    if (noLikeState.value){
      // 取消点菜
      noLikeState.value=false
        HttpDelete(SERVICE_ROUT.VIDEO_NOLIKE_DELETE+"/"+ProP.viewCardBody.videoId);


    }else {
      // 点踩
      noLikeState.value=true

      HttpPut(SERVICE_ROUT.VIDEO_NOLIKE_PUT+"/"+ProP.viewCardBody.videoId);
    }
  }catch (e){
    console.error(e)
  }
}


// 点火
const sparkleState=ref<Boolean>(ProP.viewCardBody.sparkleState)
const heatSize=ref<number>(ProP.viewCardBody.heatSize)
async function OnClickSparkle(){

  try {

  const sparkleStateRef=ref<Response<any>>()
    sparkleStateRef.value=  (await HttpPut(SERVICE_ROUT.VIDEO_SPARKLE_PUT+"/"+ProP.viewCardBody.videoId)).data;
    if(sparkleStateRef.value.status==404){
      console.error("火花数量不足")
      showToast({
        message: '火花数量不足2',
        position: 'top',
      });

    }else {
     if(sparkleState.value==false){
       sparkleState.value=true
     }
      heatSize.value+=2;
      await InitData();

    }
  }catch (e){
    console.error(e)
  }
}


/**
 * 连连接socket服务
 */
const viewSize=ref<string>(""+ProP.viewCardBody.viewSize)
async function OnWs(){
  try {
    // const ws: Ws<string> =new Ws(SERVICE_ROUT.SERVER_SOCKET+"/"+
    //     SERVICE_ROUT.VIDEO_SOCKET+"/"+viewVideoId.value+"/"+id.value)
    // ws.onMessage(rep=>{
    //   console.log("socket收到的消息：",rep)
    // })

    const root=SERVICE_ROUT.SERVER_SOCKET+
        SERVICE_ROUT.VIDEO_SOCKET+"/"+viewVideoId.value+"/"+id.value

    console.log("ws地址：",root)

     videoSocket.value=new WebSocket(root);

    videoSocket.value.onopen = function() {
      console.log('WebSocket 连接已打开');
    };

    videoSocket.value.onmessage = function(event) {
      console.log('接收到消息:', event.data);
     const Data:Response<string>=  JSON.parse( event.data)
      viewSize.value=Data.body
      console.log("解析后的websocket消息",Data)
    };


  }catch (e){
    console.error("socket:",e)
  }

}

OnWs();



// 跳转到用户详情
function ToUser(){
  setTimeout(()=>{
    ViewUserDynamicId.value=ProP.viewCardBody.userId
    // timeOrCollectionTitle.value='我的收藏'
    route.push('/userDynamic') // 跳转用户信息修改
    // route.push('/timeView')
  },200)
}
</script>

<template>
  <div id="view-user">
    <div id="view-user-body">
      <div id="view-user-brief">
        <div id="view-user-brief-image" @click.stop="ToUser">
          <van-image
              round
              width="10rem"
              height="10rem"
              fit="cover"

              :src="viewCardBody.userImage"
          />
        </div>


        <div id="view-user-body-user">
          <div class="user-name">{{viewCardBody.userName}}</div>
          <div class="user-massage">
            <div class="user-fan user-massage-item">{{viewCardBody.userSomeone?viewCardBody.userSomeone:0}}粉丝</div>
            <div class="user-video user-massage-item2">{{viewCardBody.userVideoSize?viewCardBody.userVideoSize:0}}视频</div>
            <div class="user-placeholding"></div>
          </div>

        </div>

<!--        <el-icon><Check /></el-icon>-->
<!--        <el-icon><Plus /></el-icon>-->
<!--        <van-icon name="success" />-->
<!--        <el-button   size="small" :color="userButton?'#0264e7': '#e9e9eb'" auto-insert-space="true"  @click="userButton=!userButton" type="primary" :icon="userButton? Plus:Check"> {{userButton?'已关注':'关注'}} {{" "}}  </el-button>-->


        <van-button  style="white-space:pre; transition: background-color 0.3s ease;" size="mini"   v-show="id!=viewCardBody.userId" @click="OnClickConcern" :icon="userButton?'success':'plus'"  :color="userButton?'#e9e9eb': '#0264e7'" type="primary"> {{userButton?'已关注':` 关  注 `}} </van-button>

<!--        按钮 -->

      </div>
      <div id="view-user-unfold">
        <van-collapse v-model="activeNames"  :border="false">
          <van-collapse-item name="1" >
            <template #title >
              <div style="white-space:pre" class="view-user-unfold-title">
              <span style=" white-space: normal;">{{viewCardBody.title}}</span>
                <div id="view-user-unfold-attribute">
                  <div class="view-user-unfold-attribute-item"><van-icon name="play-circle-o" /> {{viewCardBody.playback}}</div>
                  <div class="view-user-unfold-attribute-item"><van-icon name="other-pay" /> {{viewCardBody.barrage.length}}</div>
                  <div class="view-user-unfold-attribute-item"><van-icon name="clock-o" />  {{formatDateTime3(viewCardBody.date)}}</div>
                  <div class="view-user-unfold-attribute-item"><van-icon name="friends-o" /> {{viewSize}}</div>
                </div>

              </div>
            </template>
            <span>
                       {{viewCardBody.brief}}

            </span>

            <div id="view-user-unfold-tag" v-if="labe">
              <van-tag round color="rgb(228 230 236)"  v-for="item in labe" text-color="#606266" :style="{'font-size':'3.4rem'}"  size="large" type="success" class="view-user-unfold-tag-item">{{item}}</van-tag>


            </div>

          </van-collapse-item>

        </van-collapse>
      </div>
      <div id="view-user-like">

        <div  class="view-user-like-item">
          <van-icon :color="likeState?'#0264e7':''" @click="OnClickLike" size="7rem" name="good-job" />
          <div class="view-user-like-item-font">{{likeSize}}</div>
        </div>

        <div class="view-user-like-item">
          <van-icon  :color="noLikeState?'#0264e7':''" @click="OnClickNoLike" id="view-user-like-item-buttonNoLike"  size="7rem" name="good-job" />
          <div class="view-user-like-item-font">不喜欢</div>
        </div>

        <div class="view-user-like-item">
          <van-icon :color="sparkleState?'#0264e7':''" @click="OnClickSparkle" size="7rem"  name="fire" />
          <div class="view-user-like-item-font">{{heatSize}}</div>
        </div>

        <div class="view-user-like-item">

          <van-icon :color="collectionState?'#0264e7':''" @click="OnClickCollection" size="7rem"  name="star" />
          <div class="view-user-like-item-font">{{collectionSize}}</div>
        </div>

        <div class="view-user-like-item">
          <van-icon  @click="(buttonShare=!buttonShare)&(shareShow = !shareShow)" size="7rem" name="descending" />
          <div class="view-user-like-item-font">下载</div>
        </div>

      </div>
      <van-divider />
    </div>
<!--    <search :searchSize="8"></search>-->

  </div>

</template>

<style scoped>
@import "@/css/mobile/view-user.css";




</style>