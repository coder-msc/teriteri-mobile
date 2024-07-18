<script setup lang="ts">

import {ref} from "vue";
import {active, typeShow, ViewUserDynamicId} from '../../../store/DataStore'
import route from '../../../router/router.js'
import {timeOrCollectionTitle} from '../../../store/DataStore'
import {
  userName,
  userImage,
  userConcern,
  userSomeone,
  userSparkle,
  userCommunity,
  id,
  userRole, UserDataClear, userVideoSize
} from "../../../store/UserSrore";
import {USER_Role} from "@/util/type";
import {showToast} from "vant";

const visible=ref(true)

function OnClickUserOut(){  // 退出登录
  visible.value=false
  setTimeout(()=>{
    UserDataClear()
    active.value=0
  },200)

}
function OnClickBar(){
  visible.value=false
  setTimeout(()=>{
    active.value=0
  },200)
}

function ToHistory(){

  if(userRole.value==null||userRole.value==''||userRole.value==USER_Role.VISITOR){
    showToast({
      message: '账号未登录',
      position: 'top',
    });

    return;
  }


  setTimeout(()=>{
    timeOrCollectionTitle.value='历史记录'
    route.push('/timeView')
  },200)

}

function ToCollection(){

  if(userRole.value==null||userRole.value==''||userRole.value==USER_Role.VISITOR){
    showToast({
      message: '账号未登录',
      position: 'top',
    });

    return;
  }


  setTimeout(()=>{
    timeOrCollectionTitle.value='我的收藏'
    route.push('/timeView')
  },200)
}

function ToUserStting(){

  if(userRole.value==null||userRole.value==''||userRole.value==USER_Role.VISITOR){
    showToast({
      message: '账号未登录',
      position: 'top',
    });

    return;
  }


  setTimeout(()=>{
   // timeOrCollectionTitle.value='我的收藏'
    route.push('/userSetting') // 跳转用户信息修改
   // route.push('/timeView')
  },200)
}

function ToUser(){
  if(userRole.value==null||userRole.value==''||userRole.value==USER_Role.VISITOR){
    showToast({
      message: '账号未登录',
      position: 'top',
    });

    return;
  }


  setTimeout(()=>{
    ViewUserDynamicId.value=id.value

    route.push('/userDynamic') // 跳转用户信息修改

  },200)
}

function ToVideoUpload(){

  if(userRole.value==null||userRole.value==''||userRole.value==USER_Role.VISITOR){
    showToast({
      message: '账号未登录',
      position: 'top',
    });

    return;
  }


  setTimeout(()=>{

    route.push('/userVideoUploder') // 视频投稿
    // route.push('/timeView')
  },200)
}


function ToUserSettingVideo(){


  if(userRole.value==null||userRole.value==''||userRole.value==USER_Role.VISITOR){
    showToast({
      message: '账号未登录',
      position: 'top',
    });

    return;
  }



  setTimeout(()=>{

    route.push('/userSettingVideo') // 视频投稿--修改
    // route.push('/timeView')
  },200)
}


// 跳转 关注列表
function TouserConcern(){




  if(userRole.value==null||userRole.value==''||userRole.value==USER_Role.VISITOR){
    showToast({
      message: '账号未登录',
      position: 'top',
    });

    return;
  }

  setTimeout(()=>{

    route.push('/userConcern') // 关注列表
    // route.push('/timeView')
  },200)
}
// 跳转 关注列表 粉丝列表
function TouserSomeone(){

  if(userRole.value==null||userRole.value==''||userRole.value==USER_Role.VISITOR){
    showToast({
      message: '账号未登录',
      position: 'top',
    });

    return;
  }


  setTimeout(()=>{

    route.push('/userSomeone') // 粉丝列表
    // route.push('/timeView')
  },200)
}



function ToLogin(){ // 跳转登录
  // 登录
  setTimeout(()=>{

    route.push('/login') // 登录
    // route.push('/timeView')
  },200)
}

function ToEnroll(){ // 跳转注册

  setTimeout(()=>{

    route.push('/loginEnroll')
    // route.push('/timeView')
  },200)
}


</script>

<template>

  <transition name="van-slide-right">

    <div id="home-main-manager-user" v-show="visible">
      <van-nav-bar
          title="个人中心"

      />

      <div id="view-user-brief">
        <div id="view-user-brief-image"  @click="ToUser">
          <van-image
              round
              width="20rem"
              height="20rem"
              fit="cover"

              :src="userImage"
          />
        </div>


        <div id="view-user-body-user">
          <div class="user-name">
            <span v-if="USER_Role.VISITOR==userRole" style="color: #1989fa">游客/</span>
            {{userName}}

            <el-icon @click="ToUserStting"  class="user-setting-font"  size="4.3rem"><EditPen /></el-icon>
          </div>
          <div class="user-massage">
            <div class="user-fan user-massage-item">火花：{{userSparkle}}</div>

            <div class="user-placeholding"></div>
          </div>

        </div>


      </div>
      <div id="home-main-manager-user-car">
        <div class="home-main-manager-user-car-item"  @click="TouserConcern">

          <div class="home-main-manager-user-car-item-size">
            {{userConcern}}
          </div>
          <div class="home-main-manager-user-car-item-font">
            关注
          </div>
        </div>

        <div class="home-main-manager-user-car-item home-main-manager-user-car-item2" @click="TouserSomeone">
          <div class="home-main-manager-user-car-item-size">
            {{userSomeone}}
          </div>
          <div class="home-main-manager-user-car-item-font">
            粉丝
          </div>
        </div>

        <div class="home-main-manager-user-car-item" @click="ToUser">
          <div class="home-main-manager-user-car-item-size">
            {{userVideoSize}}
          </div>
          <div class="home-main-manager-user-car-item-font">
            稿件
          </div>
        </div>
      </div>

      <div id="home-main-manager-user-list">

        <div class="home-main-manager-user-list-item" @click="ToHistory">
          <el-icon color="#1989fa" size="5.3rem"><Clock /></el-icon>
          <div class="home-main-manager-user-list-item-font">
            观看历史
          </div>
          <div  class="home-main-manager-user-list-item-m"></div>
          <div class="home-main-manager-user-list-item-icon">
            <el-icon color="#1989fa" size="5.3rem"><ArrowRight /></el-icon>
          </div>

        </div >

        <div class="home-main-manager-user-list-item" @click="ToCollection" >
          <el-icon color="#1989fa" size="5.3rem"><Star /></el-icon>
          <div class="home-main-manager-user-list-item-font">
            我的收藏
          </div>
          <div class="home-main-manager-user-list-item-m"></div>
          <div class="home-main-manager-user-list-item-icon">
            <el-icon color="#1989fa" size="5.3rem"><ArrowRight /></el-icon>
          </div>


        </div>

        <div class="home-main-manager-user-list-item" @click="ToUserStting">
          <el-icon color="#1989fa" size="5.3rem"><Edit /></el-icon>
          <div class="home-main-manager-user-list-item-font">
            信息修改
          </div>
          <div class="home-main-manager-user-list-item-m"></div>
          <div class="home-main-manager-user-list-item-icon">
            <el-icon color="#1989fa" size="5.3rem"><ArrowRight /></el-icon>
          </div>

        </div>
        <div class="home-main-manager-user-list-item" @click="ToVideoUpload">
          <el-icon color="#1989fa" size="5.3rem"><Upload /></el-icon>
          <div class="home-main-manager-user-list-item-font">
            视频投稿
          </div>
          <div class="home-main-manager-user-list-item-m"></div>
          <div class="home-main-manager-user-list-item-icon">
            <el-icon color="#1989fa" size="5.3rem"><ArrowRight /></el-icon>
          </div>

        </div>
        <div class="home-main-manager-user-list-item" @click="ToUserSettingVideo">
          <el-icon color="#1989fa" size="5.3rem"><DocumentAdd /></el-icon>
          <div class="home-main-manager-user-list-item-font">
            稿件管理
          </div>
          <div class="home-main-manager-user-list-item-m"></div>
          <div class="home-main-manager-user-list-item-icon">
            <el-icon color="#1989fa" size="5.3rem"><ArrowRight /></el-icon>
          </div>

        </div>

      </div>

      <div   v-if="userRole==USER_Role.ROOT||userRole==USER_Role.USER"  class="home-main-manager-user-out">
        <el-button @click="ToLogin" size="large" round>切换账号</el-button>
        <el-button @click="OnClickUserOut" size="large" id="user-out" type="danger" round>退出登录</el-button>
      </div>

      <div    v-else-if="userRole==''||userRole==USER_Role.VISITOR"  class="home-main-manager-user-out">
        <el-button   @click="ToEnroll"  size="large" round>注册</el-button>
        <el-button @click="ToLogin"  color="#1989fa"  size="large" id="user-out" type="danger" round>登录</el-button>
      </div>

    </div>

  </transition>
</template>

<style scoped>
@import "@/css/mobile/home-main-manager-user.css";
</style>