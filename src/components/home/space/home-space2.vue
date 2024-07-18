<script setup lang="ts">

/**
 * 全站的动态
 */

// 卡片有两类

/**
 * 说说
 *
 * 视频投稿
 *
 *
 * // 分页
 */

import HomeSpaceVideoCard from "@/components/home/space/home-space-video-card.vue";
import {onMounted, ref} from "vue";
import {
  ViewSpaceCard,
  SPACE_TYPE,
  Response,
  Comments,
  COMMENTS_TYPE,
  SERVICE_ROUT,
  HomeViewCard, USER_Role
} from "../../../util/type";
import {SpaceInputComment, SpaceInputDom, SpaceInputShow, SpaceInputShowMsg} from "../../../store/DataStore";
import {showToast} from "vant";
import HomeSpaceShuoCard from "@/components/home/space/home-space-shuo-card.vue";
import route from '../../../router/router.js'

import {HttpGet, HttpPut} from "@/api/http";
import {userRole} from "@/store/UserSrore";

const IsNOLL=ref(false)
const spaceList=ref<ViewSpaceCard[]>(null)

onMounted(async ()=>{
  SpaceInputDom.value=inputDom.value // dom赋值
  const rep:  Response<ViewSpaceCard[]>=  (await  HttpGet(SERVICE_ROUT.SPACE_ALL_GET+"/1")).data

  if(rep.status==200){
    console.log("获得动态卡片数据:",rep.body)

    if(rep.body.length==0){
      IsNOLL.value=true
    }


    spaceList.value=rep.body
    list.value.push(rep.body)
  }
})


const InputPlaceholder=ref("小心翼翼的留下足迹.....")
const barrage=ref("");






const tt1=ref<ViewSpaceCard>({
  commentList: [],
  id:0,
  data: Date.now(),
  showImageList: [],
  title: " 求什么标题好呢求什么标题好呢求什么标题好呢求什么标题好呢求什么标题好呢求什么标题好呢求什么标题好呢求什么标题好呢求什么标题好呢 ",
  type: SPACE_TYPE.SHOW,
  upId: 0,
  upImageSrc: "http://zxp200405221.com:9000/user/e292b78d-7d28-42b8-8a1b-8ebe0a7f4fbd/dde3e1a4-095e-482f-bce7-24e00aa5a17b?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20240425%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240425T100536Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=8c192dc398c3562466f78c533cadf639a1842c4a01e575c52e0c61e29f035500",
  upName: "初音未来",
  videoId: 0,
  videoImagSrc:"http://zxp200405221.com:9000/video/4/9f0569cf-473f-4932-a289-c438c5734a33.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20240425%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240425T100536Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=a046281daa352b93e2541aa6177a9e44b82d0873357ac1ac1ac0523699b677f4"

})

const c1=ref<Comments>({
  commentsType: COMMENTS_TYPE.DYNAMIC, // 回复
  content: "我好开心呀好开心",
  date: 0,
  spaceId:0,
  deleted: 0,
  id: 0,
  likeNum: 0,
  parentId: 0,
  parentName: "",
  review: false,
  toCommentId: 0,
  userId: 1,
  userImageSrc: "",
  userName: "小红帽",
  videoId: 0,
  upload:true

})

const c2=ref<Comments>({
  commentsType: COMMENTS_TYPE.DYNAMIC_REPLY, // 回复的回怼
  content: "我也是",
  spaceId:0,
  date: 0,
  deleted: 0,
  id: 0,
  likeNum: 0,
  parentId: 1,   // 这里当成是用户 id -- 之前是当成评论 id
  parentName: "小红帽",
  review: false,
  toCommentId: 0,
  userId: 2,
  userImageSrc: "",
  userName: "小白",
  videoId: 0,
  upload:true

})


tt1.value.commentList.push(c1.value)
tt1.value.commentList.push(c2.value)



// 输入框
const inputDom=ref(null)

function jd(){
  try {
    console.error("唤起焦点")
    console.log("dom:",inputDom.value)
    inputDom.value.focus()
  }catch (e){
    console.error("唤起焦点错误")
  }

}




// 获得焦点
function  OnFocus(){

}


// 失去焦点
function OnBlur(){
  SpaceInputShowMsg.value="悄悄地留下足迹"
  //console.log("清空回复对象")
 // SpaceInputComment.value=null // 清空回复对象
//  SpaceInputShow.value=false; // 关闭显示
}


function findSpaceItem(spaceId:number){
  for (let i=0;i<list.value.length;i++){
   const finResult= list.value[i].find(item2=> item2.spaceId==spaceId)
    if(finResult){
      return finResult;
    }
  }
  return null
}
// 发送消息
async  function sendMsg(){  // 评论

  if(userRole.value==null||userRole.value==''||userRole.value==USER_Role.VISITOR){
    showToast({
      message: '账号未登录',
      position: 'top',
    });

    return;
  }

  console.log("发送消息")
  SpaceInputComment.value.content=barrage.value;
const temp= SpaceInputComment.value

  const findResult= findSpaceItem(SpaceInputComment.value.spaceId)
 // const findResult =list.value.find(item=> item.find(item2=> item2.spaceId==SpaceInputComment.value.spaceId) !=null )
  console.log("查找到的评论对象：",findResult," 需要添加的评论：",findResult)
  if(findResult){
    if(!findResult.commentList){
      findResult.commentList=[]
    }

    findResult.commentList.push(temp)
    const rep:Response<number>  =(await  HttpPut(SERVICE_ROUT.SPACE_APP_COMMENT_PUT,temp)).data;
    if(rep.status==200){
     // if()
      setTimeout(()=>{
        temp.upload=true
        temp.id=rep.body
        console.log("动态添加评论成功：",temp,"响应体：",rep)
      },1000)


    }


    // TODO 添加评论
  }

 // tt1.value.commentList.push(temp)

  //SpaceInputShowMsg.value="悄悄地留下足迹"
  console.log("清空回复对象")
  SpaceInputComment.value=null // 清空回复对象
  SpaceInputShow.value=false; // 关闭显示
  barrage.value=""


}



function OnInputDiv(){
  inputDom.value.focus()
}

function OnAppClick(){  // 清除冒泡
  SpaceInputShowMsg.value="悄悄地留下足迹"
  console.log("清空回复对象")
   SpaceInputComment.value=null // 清空回复对象
  SpaceInputShow.value=false; // 关闭显示
}


// 点击发布表
const onClick = () => {
 // showToast('点击气泡');
  setTimeout(()=>{

    route.push('/homeSpaceAdd')
  },200)
};











// 随机推荐

const list = ref([]); // 播放列表
const page=ref<number>(1) // 分页数据
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const onLoad =async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  page.value++;
  console.log("到达底部")
  try {
    if (refreshing.value) {
      list.value = [];
      page.value=1
      refreshing.value = false;
    }
    const rep:  Response<ViewSpaceCard[]>=  (await  HttpGet(SERVICE_ROUT.SPACE_ALL_GET+"/"+page.value)).data
    //const rep:Response<HomeViewCard[]>=(await HttpGet(SERVICE_ROUT.VIDEO_INIT_GET)).data;
    console.log("加载成功：",page.value," ",rep)
    if(rep.status==200){
      if(rep.body.length==0){
        finished.value = true;
        return;
      }
      if(rep.body.length>0&&IsNOLL.value){
        IsNOLL.value=false
      }

      list.value.push(rep.body)
      loading.value = false;
    }

  }catch (e){
    console.error(e)
  }

};



const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};


</script>

<template>
  <div id="home-space" @click="OnAppClick">

<!--    <home-space-video-card  v-for="i in 3" v-if="tt1" :Date2="tt1"></home-space-video-card>-->

    <van-pull-refresh   v-model="refreshing" @refresh="onRefresh">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
    >

      <van-cell v-for="item2 in list" :key="item2" >
        <div v-for="item in item2" :key="item.spaceId">
          <home-space-shuo-card  v-if="item.type==SPACE_TYPE.SHOW" :Date2="item"></home-space-shuo-card>
          <home-space-video-card  v-if="item.type==SPACE_TYPE.VIDEO"  :Date2="item"></home-space-video-card>
        </div>
      </van-cell>


    </van-list>
    </van-pull-refresh>
    <div v-if="IsNOLL">
      <van-empty description="暂无数据>_<" />
    </div>

    <div :style="{'font-size':'4rem' }"   @click.stop="OnInputDiv"  v-show="SpaceInputShow">
      <div @click.stop=""  id="input-comment-inputDm"  style="z-index: 9999;position: fixed;background: #E6E8EB; display: flex;align-items: center; bottom: 12rem;width: 100%;min-height:10rem">

        <!--      <input type="text" ref="inputCommentInputDmInput" :placeholder="InputPlaceholder" @keyup.enter="OnClickSend" id="input-comment-inputDm-input" v-model="barrage" @click="OnClickinputDmInput"    @focus="onInputFocus" @blur="onInputBlur" >-->

        <el-input

            v-model="barrage"
            style="width: 88rem; margin-right: 1rem"
            :autosize="{ minRows: 1, maxRows: 2 }"
            type="textarea"
            :placeholder="SpaceInputShowMsg"

            @focus="OnFocus"
            @blur="OnBlur"
            ref="inputDom"

            size="large"
            :input-style="{

                      'border': 'none',
        'outline': 'none',
        'flex': '0 0 86rem',
        'height': '7rem',
        'margin': '0 auto',

        'font-size': '3.8rem',
        'color': '#c8c9cc',
        'background': '#e9e9eb',
        'border-radius': '4rem',
        'padding-left': '6rem'
            }"

        />




        <van-icon   id="input-comment-inputDm-icon"  @click.stop="sendMsg"  size="9rem" class="input-comment-inputDm-icon2" name="guide-o" />
      </div>











    </div>
<!--    <van-floating-bubble style="margin-left: 8rem" gap="60" icon="plus" @click="onClick" />-->

  </div>

</template>

<style scoped>
@media screen  and (min-device-width: 200px) and (max-device-width:500px) {

  #home-space{
    width: 100vw;
    max-height: 95vh;
    background: #f1f1f2;;
    overflow: hidden;
    overflow-y: auto;

  }

}
</style>