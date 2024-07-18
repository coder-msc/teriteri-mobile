<script setup lang="ts">

//  粉丝列表
import route from '../../../router/router.js'

import {onMounted, ref} from "vue";
import UserConcernCard from "@/components/home/user/user-concern-card.vue";
import {Response, SERVICE_ROUT, ViewUserConcern} from "../../../util/type";
import {HttpGet} from "@/api/http";
import {InitData} from "@/store/UserSrore";



const concernList=ref<ViewUserConcern[]>(null)
onMounted(async ()=>{

  const rep:Response<ViewUserConcern[]>=   (await HttpGet(SERVICE_ROUT.USER_SOMEONE_GET)).data

  if(rep.status==200){
    concernList.value=rep.body
    console.log("获得关注列表：",rep)
  }
})


function OnClickBar(){
  visible.value=false
  InitData()  // 更新个人信息
  setTimeout(()=>{

    route.back()
  },200)

}

const visible=ref(true)
</script>

<template>
  <transition name="van-slide-right">
    <div  id="user-concern" v-show="visible">
      <van-nav-bar
          title="粉丝列表"
          left-text="返回"
          left-arrow
          @click-left="OnClickBar"


      />

    <div v-if="concernList"  v-for="item in concernList" :key="item.userId" >
      <user-concern-card :ConcernData="item"></user-concern-card>
    </div>

    </div>
  </transition>

</template>

<style scoped>
@media screen  and (min-device-width: 200px) and (max-device-width:5000px) {

  #user-concern{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    overflow-y: auto;

  }

}
</style>