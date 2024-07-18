<script setup lang="ts">

import {id, InitData} from "@/store/UserSrore";
import {Check, Plus} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {SERVICE_ROUT} from "../../../util/type";
import {HttpDelete, HttpPut} from "@/api/http";
import {ViewUserDynamicId} from "@/store/DataStore";
import route from '../../../router/router.js'

const Pop= defineProps({

  ConcernData:{
    type:Object,
    default:null,
  }
});



const edit=ref<boolean>(Pop.ConcernData.concernStart); // 是否显示 编辑资料





async function  OnClickConcern(){  //
  if(edit.value){
    // 取消关注
    edit.value=false
    try {
      console.log("取消关注：",Pop.ConcernData.userId)
      await HttpDelete(SERVICE_ROUT.USER_CONCERN_DELETE+"/"+Pop.ConcernData.userId)


    }catch (e){

    }
  }else {
    // 关注
    edit.value=true
    console.log("关注：",Pop.ConcernData.userId)
    await HttpPut(SERVICE_ROUT.USER_CONCERN_PUT+"/"+Pop.ConcernData.userId)
  }

  //await InitData()
}




function ToUser(){
  setTimeout(()=>{
    ViewUserDynamicId.value=Pop.ConcernData.userId

    route.push('/userDynamic') // 跳转用户信息修改

  },200)
}


</script>

<template>
  <div id="view-user-brief" v-if="ConcernData" @click="ToUser">
    <div id="view-user-brief-image">
      <van-image
          round
          width="12rem"
          height="12rem"
          fit="cover"

          :src="ConcernData.userImageSrc"
      />
    </div>


    <div id="view-user-body-user">
      <div class="user-name">{{ConcernData.userName}}

<!--        <el-icon :color="'#c8c9cc'" size="4.3rem"><EditPen /></el-icon>-->
      </div>
      <div class="user-massage">
        <div class="user-fan user-massage-item">
          {{ConcernData.userBrief}}
        </div>

        <div class="user-placeholding"></div>
      </div>

    </div>

    <div id="home-msg-chat-time">

      <el-button   :auto-insert-space="true"  style="height: 6rem;width: 22rem; margin-top: 1rem"  :color="edit?'#c8c9cc':'#1989fa'" type="primary" :icon="edit?Check:Plus" size="large" round  @click.stop="OnClickConcern"  >{{edit?'已关注':'关注'}}</el-button>
    </div>


  </div>
</template>

<style scoped>


@media screen  and (min-device-width: 200px) and (max-device-width:500px) {


  #view-user-body-user{
    margin-left: 2rem;

    flex: 0 1 55rem;
    display: flex;
    flex-direction: column;

  }

  .user-massage{
    font-size: 2rem;
    height: 8rem;
    display: flex;
  }

  .user-name{
    font-size: 4.6rem;
    height: 6rem;
    color: black;
  }
  .user-massage-item{
    margin-top: 0.8rem;
    color: #b1b3b8;
    font-size: 3.2rem;
    line-height: 6.6rem;

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
    height: 18rem;
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
    flex: 1 1 5rem;
    width: 10rem;
    margin-right: 0.1rem;
    /*background: #0bc15f;*/
    white-space: nowrap;

    color:  #c8c9cc;;
  }
  #view-user-brief-m{
    margin: 1.5rem 1.5rem;
    width: 100%;
    border-bottom: 1px solid #dedfe0;
  }
}
</style>