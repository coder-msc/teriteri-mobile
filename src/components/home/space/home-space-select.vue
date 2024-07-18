<script setup lang="ts">

import {active} from "@/store/DataStore.js";
import HomeSpace from "@/components/home/space/home-space.vue";
import {ref} from "vue";
import HomeSpace2 from "@/components/home/space/home-space2.vue";

import route from '../../../router/router.js'
import {userRole} from "@/store/UserSrore";
import {USER_Role} from "@/util/type";
import {showToast} from "vant";


// 标签页面
const Tap=ref(['关注','全站'])
const Tap_active=ref(0)


// 点击发布表
const onClick = () => {

  if(userRole.value==null||userRole.value==''||userRole.value==USER_Role.VISITOR){
    showToast({
      message: '账号未登录',
      position: 'top',
    });

    return;
  }

  // showToast('点击气泡');
  setTimeout(()=>{

    route.push('/homeSpaceAdd')
  },200)
};


</script>

<template>
  <div>

  <van-tabs v-model:active="Tap_active" scrollspy sticky title-active-color="#1989fa" swipeable="false"  >
    <van-tab v-for="(item,index) in Tap" :title="item" :key="index">

    </van-tab>

  </van-tabs>

  <home-space v-show="Tap_active==0"></home-space>
  <home-space2 v-show="Tap_active==1"></home-space2>

    <van-floating-bubble  v-if="active===1" style="margin-left: 15rem" gap="90" icon="plus" @click="onClick" />

  </div>

</template>

<style scoped>

</style>