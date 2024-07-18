<script setup lang="ts">

import {onMounted, ref} from "vue";
import {id, InitData} from './store/UserSrore'
import {routerTo} from './util/util'
import {Response, SERVICE_ROUT, ViewMessage} from "./util/type";
import {homeMessageList, homeMessageShowSize, videoSocket, viewVideoId} from "@/store/DataStore";
import * as wasi from "wasi";

//import axios from "axios";
//import {HttpFile} from "@/api/http";
onMounted( async ()=>{
  //TokenLogin()
  await InitData()
  await OnWs();
  console.log("跳转home")
  try {
   // routerTo('/userDynamic')
  routerTo('/home')
  // routerTo('/loginChange')
  // routerTo('/login')
  // routerTo('/searchResult')
   //routerTo('/userConcern')
   //routerTo('/homeSpaceAdd')
  //  routerTo('/userSettingVideo')
  // routerTo('/userSetting')
   // route.push('/home')
  }catch (e){
    console.error("error:",e)
  }


})





async function OnWs(){
  try {
    // const ws: Ws<string> =new Ws(SERVICE_ROUT.SERVER_SOCKET+"/"+
    //     SERVICE_ROUT.VIDEO_SOCKET+"/"+viewVideoId.value+"/"+id.value)
    // ws.onMessage(rep=>{
    //   console.log("socket收到的消息：",rep)
    // })

    const root=SERVICE_ROUT.SERVER_SOCKET+
        SERVICE_ROUT.MASSAGE_SOCKET+"/"+id.value

    console.log("ws地址：",root)

    videoSocket.value=new WebSocket(root);

    videoSocket.value.onopen = function() {
      console.log('WebSocket 连接已打开');
    };

    videoSocket.value.onmessage = function(event) {
      console.log('接收到消息:', event.data);
      const Data:Response<ViewMessage[]|ViewMessage> =  JSON.parse( event.data)
      if(Data.status==200){
        console.log("登录成功--获得消息：{}",Data.body)
        if(Array.isArray(Data.body)){


       // const t11=   {
       //   id: 70,
       //   myComment: "微软",
       //   spaceId: null,
       //   spaceTitle: null,
       //   time: 1714390727259,
       //   type: "COMMENTS_LIKE",
       //   userComment: null,
       //   userId: 21,
       //   userImageSrc: "http://zxp200405221.com:9000/user/111111/avatar6ed591af-d21c-46c5-b299-91cac2bd7f84.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20240429%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240429T115015Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=323c2c06b6980b8721a0709816b0ca9608ce3596a9a6cba4e0318c08cf1c8160"
       //   ,userName: "是初音未来呢",
       //   videoId: null,
       //   videoImageSrc: null,
       //   view: false}



          homeMessageList.value=Data.body.sort((a,b)=>b.time-a.time)
          const remList=  homeMessageList.value.filter(item=>!item.view)
          homeMessageShowSize.value=remList.length

        }else if("type" in Data.body) {
         // console.log("类型",typeof Data.body)

         // arr.unshift(1)
          homeMessageList.value.unshift(Data.body)
          homeMessageShowSize.value++;

        }

        console.log("消息列表", homeMessageList.value)
      }
     // Data.body
      console.log("收到的消息",Data.body)
    };


  }catch (e){
    console.error("socket:",e)
  }

}

</script>

<template>


<!--  <div class="common-layout">-->
<!--    <el-container>-->
<!--      <el-header>Header</el-header>-->
<!--      <el-main>Main</el-main>-->
<!--      <el-footer>Footer</el-footer>-->
<!--    </el-container>-->
<!--  </div>-->
  <!-- <input type="file" ref="fileInput" @change="handleFileSelect"> 视频
  <input type="file" ref="imagefileInput" @change="handleFileSelectImage"> 封面
  <button @click="uploadFile">上传</button>
  <div v-if="progress > 0">
    上传进度：{{ progress }}%
  </div>
  <video src></video> -->
<!--<div>-->
<!--  按钮-->
<!--  <el-button>按钮</el-button>-->
<!--</div>-->

  <div >
<!--    <keep-alive>-->
<!--      <router-view></router-view>-->
<!--    </keep-alive>-->


      <!-- vue3.0配置 keep-alive-->
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"  v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <component :is="Component"  v-if="!$route.meta.keepAlive"/>
      </router-view>


  </div>


</template>
<style >
*{
  margin: 0;
  padding: 0;
  user-select: none;
}
html{
  background: #0264e7;
  width: 100%;
  height: 100%;
  font-size: 1vw;
  overflow: hidden;
  position: fixed;
  font-family: HYKaiti;
}
@keyframes opacityAnimation {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
@keyframes backgroundColorChange {
  0% { background:  #ffffff;
  }
  50% { background: #b0d3f696; }
  100% { background: #ffffff; }
}
</style>
