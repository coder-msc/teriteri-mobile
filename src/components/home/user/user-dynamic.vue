<script setup lang="ts">

import route from '../../../router/router.js'
import {showImagePreview, showToast} from 'vant';
import {onMounted, ref} from "vue";
import {
  userCommunity,
  userConcern,
  userVideoSize,
  userImage,
  id,
  userSomeone,
  userName,
  userBrief, InitData, userRole
} from "../../../store/UserSrore";
import {HomeViewCard, Response, SERVICE_ROUT, User, USER_Role, ViewUserCard} from "../../../util/type";
import {HttpGet, HttpDelete, HttpPut} from "@/api/http";
import SearchView from "@/components/home/search/search-view.vue";
import {Check, Plus} from "@element-plus/icons-vue";
import {ViewUserDynamicId} from "../../../store/DataStore";
import HomeSpace3 from "@/components/home/space/home-space3.vue";


onMounted(async ()=>{
  try {

    const rep:Response<ViewUserCard>= (await HttpGet(SERVICE_ROUT.USER_DYNAMIC_GET+"/"+ViewUserDynamicId.value)).data

    if(rep.status==200){
      user.value=rep.body.user
      userVideo.value=rep.body.userVideo
      list.value.push(rep.body.userVideo)
      console.log("播放数据：",userVideo.value)
      //if(id.value==user.value.id){ // 是本人
      edit.value= rep.body.concernState
      //  edit.value=true
    //  }
      //"http://zxp200405221.com:9000/video/4/e4894c53-0f93-44f2-934b-3682e9d5c306.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20240421%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240421T101933Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=0308d5e8bfd49cdcf902604e07f510f890e2feb0935aa5278511f4086a9e6f0c"
      console.log("返回数据：",rep)
    }
  }catch (e){
    console.error("error:",e)
  }



})


const visible=ref(true)
function OnClickBar(){
  visible.value=false
  setTimeout(()=>{

    route.back()
  },200)

}

// 看头像
function showImage(){
  showImagePreview([user.value.imageSrc]);
}


const user=ref<User>(undefined)
const userVideo=ref<HomeViewCard[]>(undefined) // 视频
const edit=ref<boolean>(false); // 是否显示 编辑资料



async function  OnClickConcern(){  //

  if(userRole.value==null||userRole.value==''||userRole.value==USER_Role.VISITOR){
    showToast({
      message: '账号未登录',
      position: 'top',
    });

    return;
  }

  if(edit.value){
    // 取消关注
    edit.value=false
    try {
      await HttpDelete(SERVICE_ROUT.USER_CONCERN_DELETE+"/"+user.value.id)

    }catch (e){

    }
  }else {
    // 关注
    edit.value=true
    await HttpPut(SERVICE_ROUT.USER_CONCERN_PUT+"/"+user.value.id)
  }

  await InitData()
}




const list = ref([]); // 播放列表
const page=ref<number>(1) // 分页数据
const loading = ref(false);
const finished = ref(false);

const onLoad =async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求

  try {
    page.value++;
    const rep:Response<ViewUserCard>=(await HttpGet(SERVICE_ROUT.USER_VIDEO_GET+"/"+user.value.id+'/'+page.value)).data;
    console.log("加载成功：",page.value," ",rep)
    if(rep.status==200){
      list.value.push(rep.body.userVideo)
      loading.value = false;
      if(rep.body.userVideo.length==0){
        finished.value = true;
        console.log("list 列表：",list.value)
        if(list.value.length>0){
          textShow.value="暂无更多"
        }

        return;
      }

    }

  }catch (e){
    console.error(e)
  }

};



// 设置用户信息
function ToUserStting(){
  setTimeout(()=>{
    // timeOrCollectionTitle.value='我的收藏'
    route.push('/userSetting') // 跳转用户信息修改
    // route.push('/timeView')
  },200)
}

const textShow=ref<string>("未发布视频")




// 标签页面
const Tap=ref(['动态','视频'])
const Tap_active=ref(0)
</script>

<template >
  <transition name="van-slide-right">
    <div id="user-dynamic" v-if="visible&&user" >
      <van-nav-bar
          title="用户详情"
          left-text="返回"
          left-arrow
          @click-left="OnClickBar"

      />

      <div id="user-show-car">
        <div id="user-car">
          <div id="view-user-brief-image" @click="showImage">
            <van-image
                round
                width="20rem"
                height="20rem"
                fit="cover"

                :src="user.imageSrc"
            />
          </div>
          <div id="user-select">
            <div id="home-main-manager-user-car">
              <div class="home-main-manager-user-car-item">

                <div class="home-main-manager-user-car-item-size">
                  {{user.someone}}
                </div>
                <div style=" color: #c8c9cc;" class="home-main-manager-user-car-item-font">
                  粉丝
                </div>
              </div>

              <div class="home-main-manager-user-car-item home-main-manager-user-car-item2">
                <div class="home-main-manager-user-car-item-size">
                  {{user.concern}}
                </div>
                <div style=" color: #c8c9cc;" class="home-main-manager-user-car-item-font">
                  关注
                </div>
              </div>

              <div class="home-main-manager-user-car-item">
                <div class="home-main-manager-user-car-item-size">
                  {{user.videoSize}}
                </div>
                <div style=" color: #c8c9cc;" class="home-main-manager-user-car-item-font">
                  视频
                </div>
              </div>
            </div>
            <el-button v-if="id==user.id" style="height: 8rem;margin-top: 1rem" :color="black" size="large" round  @click="ToUserStting">编辑资料</el-button>

            <!--            <el-icon><Check /></el-icon>-->
            <el-button    v-if="id!=user.id"  style="height: 8rem;margin-top: 1rem"  :color="edit?'#c8c9cc':'#1989fa'" type="primary" :icon="edit?Check:Plus" size="large" round  @click="OnClickConcern"  >{{edit?'已关注':'关注'}}</el-button>
<!--            <el-icon><Plus /></el-icon>-->
<!--            <el-button style="height: 8rem;margin-top: 1rem"  color="#c8c9cc" type="primary" :icon="Plus" size="large" round></el-button>-->

          </div>


        </div>

        <div id="user-msg-name-brif">
          <div class="user-msg-name-brif-name"><span>{{ user.name }}</span>  <el-icon v-if="user.gender=='女'" color="#c8c9cc" size="3.5rem"><Female /></el-icon> <el-icon  v-if="user.gender=='男'" color="#c8c9cc" size="3.5rem"><Male /></el-icon></div>
          <div  class="user-msg-name-brif-brif"><span>{{user.brief}}</span></div>
        </div>
<!--        <van-divider />-->
      </div>



      <div id="user-show-car-m">

      </div>

<!--      <search-view  :recommend="item"  v-for="item in userVideo" :key="item.videoId"></search-view>-->
<!--    -->


      <div>
        <van-tabs v-model:active="Tap_active" scrollspy sticky title-active-color="#1989fa" swipeable="false"  >
          <van-tab v-for="(item,index) in Tap" :title="item" :key="index">

          </van-tab>

        </van-tabs>

        <home-space3 v-if="Tap_active==0"></home-space3>
        <div  id="user-video-list" v-if="(Tap_active==1)&&userVideo">

          <van-list
              v-model:loading="loading"
              :finished="finished"
              :finished-text="textShow"
              @load="onLoad"
          >

            <van-cell v-for="item in list" :key="item" >
              <search-view   :recommend="item" ></search-view>
            </van-cell>
          </van-list>
        </div>

      </div>



    </div>
  </transition>
</template>

<style scoped>
@media screen  and (min-device-width: 200px) and (max-device-width:5000px) {
  #user-video-list{
    //margin-top: 4rem;
    background: white;
    overflow: hidden;
    height: 65vh;
    overflow-y: auto;

  }

  #user-show-car-m{
    width: 100%;
    height: 5rem;
    background: white;
  }
  #user-show-car{
    width: 100%;
    background: white;
  }

  .user-msg-name-brif-brif{
    font-size: 3.5rem;
    color: #c8c9cc;
  }
  .user-msg-name-brif-name{
    font-size: 4.5rem;
  }

  #user-msg-name-brif{
    margin-left: 6rem;
    margin-top: 4rem;
  }
  #view-user-brief-image{
    margin: 0 auto;
  }

  #user-select{
    margin: 0 auto;
    width: 55%;
    display: flex;
    flex-direction: column;
    height: 20rem;
  }

  #user-car{
    //margin-top: 5rem;
    padding-top: 5rem;
    width: 100%;
    display: flex;
    //background: #0bc15f;
  }

  #user-dynamic{
    overflow: hidden;

    width: 100vw;
    height: 100vh;
    background: #e9e9eb;
  }

  #home-main-manager-user-car{
    width: 100%;
    flex: 0 0 10rem;
    height: 12rem;
    /*background: #0264e7;*/
    display: flex;
  }
  .home-main-manager-user-car-item{
    background: white;
    flex: 1 1 33rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    transition: background-color 0.3s ease; /* 添加过渡效果 */


  }


  .home-main-manager-user-car-item:active{
    background: #e9e9eb;
  }
  .home-main-manager-user-car-item-size{
    font-size: 4rem;
    text-align: center;



  }
  .home-main-manager-user-car-item-font{
    font-size: 3.5rem;
  }
  .home-main-manager-user-car-item2{
    border-right: 1px solid #e9e9eb;
    border-left: 1px solid #e9e9eb;

  }


}
</style>