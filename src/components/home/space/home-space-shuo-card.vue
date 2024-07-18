<script setup lang="ts">




import {ref} from "vue";
import {emojiShow} from "@/store/DataStore";
import {formatDateTime4} from "@/util/util";
import {Comments, COMMENTS_TYPE, SERVICE_ROUT} from "../../../util/type";
import route from '../../../router/router.js'
import {
  SpaceInputComment,
  SpaceInputDom,
  SpaceInputShow,
  SpaceInputShowMsg,
  UserSettingVideo, ViewUserDynamicId
} from "../../../store/DataStore";
import {id, InitData, userName} from "../../../store/UserSrore"
import {last} from "lodash";
import {closeToast, showConfirmDialog, showFailToast, showImagePreview, showLoadingToast, showSuccessToast} from "vant";
import {HttpDelete} from "@/api/http";

const Pop= defineProps({

  Date2:{
    type:Object,
    default:null,
  }
});




const ttRef=ref(Pop.Date2)

const InputPlaceholder=ref("小心翼翼的留下足迹.....")
const barrage=ref("");


//console.log("收到的值：",Pop.Date2)

const lsatTime=ref<number>(new Date().getTime()) // 点击时间
// 点击输入
function OnPutIn(){
  console.log("进入计时间")
  lsatTime.value=new Date().getTime()
}
function OnInput(item:Comments){
  //console.log("结束计时间")
  // const time=new Date().getTime()-lsatTime.value
  //console.log("时差：",time)


  try {
    console.log("唤起输入框") // 新加入的需要在那里添加
    SpaceInputShow.value=true // 输入框显示
    SpaceInputComment.value={
      commentsType:COMMENTS_TYPE.DYNAMIC , // 回复
      spaceId:Pop.Date2.spaceId, // 动态id
      userId: id.value,
      userName:userName.value,
      upload:false

    } // 需要回复的对象
    console.log("需要留言的对象：",SpaceInputComment.value)
    SpaceInputShowMsg.value="留言@"+Pop.Date2.upName  // 更正提示内容
    SpaceInputDom.value.focus()


  }catch (e){
    console.error("唤起输入框失败/出现错误：",e)
  }

}

// 回复人
function OnInputUser(item:Comments){
  try {
    console.log("唤起输入框") // 新加入的需要在那里添加
    SpaceInputShow.value=true // 输入框显示

    if(id.value==item.userId){
      // 自己回复自己
      SpaceInputComment.value={
        commentsType:COMMENTS_TYPE.DYNAMIC , // 回复
        spaceId:Pop.Date2.spaceId, // 动态id
        userId: id.value,
        userName:userName.value,
        upload:false
      }
      SpaceInputShowMsg.value="留言@"+Pop.Date2.upName   // 更正提示内容
    }else {
      SpaceInputComment.value={
        commentsType:COMMENTS_TYPE.DYNAMIC_REPLY , // 回复 回怼
        spaceId:Pop.Date2.spaceId, // 动态id
        userId: id.value,
        userName:userName.value,
        parentId:item.userId,
        parentName:item.userName,
        upload:false

      } // 需要回复的对象
      SpaceInputShowMsg.value="回复@"+item.userName  // 更正提示内容
    }




    SpaceInputDom.value.focus()

  }catch (e){
    console.error("唤起输入框失败/出现错误：",e)
  }
}





// 删除评论
 async function OnDelete(itemId:number,index:number){
   console.log("需要删除的评论 ：",czItem.value,"需要移除的评论位置：",index)
  // Pop.Date2.
// 删除
  Pop.Date2.commentList.splice(index,1)
 await HttpDelete(SERVICE_ROUT.SPACE_DELETE_COMMENT_DELETE+"/"+itemId)
  //
  // showConfirmDialog({
  //   title: '删除视频',
  //   message:
  //       '删除后无法恢复',
  //
  // }).then(async () => {
  //   console.log("确定")
  //
  //   showLoadingToast({
  //     message: '删除中...',
  //     forbidClick: true,
  //     duration: 100000
  //   });
  //   try {
  //   //  await HttpDelete(SERVICE_ROUT.USER_VIDEO_LIST_DELETE+"/"+videoId);
  //     closeToast(true)
  //     showSuccessToast('删除成功');
  //     try {
  //       Pop.Date2.splice(index,1)
  //     }catch (e) {
  //       console.log(e)
  //     }
  //
  //   }catch (e){
  //     closeToast(true)
  //     showFailToast('删除失败');
  //     console.error("error:",e)
  //   }
  // });

}



const showShare = ref(false);
let options = [
  { name: '回复', icon: 'chat',className: 'aaa' },
  { name: '删除', icon: 'delete' },

];

// 删除或者回复操作
const operateId=ref<number>(-1)
const operateIndex=ref<number>(-1)
function OnclickSheet(videoId:number,index:number){
  showShare.value = true
  operateId.value=videoId;
  operateIndex.value=index;
  console.log("需要修改的视频：",videoId," 占位：",index);
}

const onSelect = (option) => {
  // showToast(option.name);

  showShare.value = false;
  // "".trim()
  console.log("唤起",option.name)
  if(option.name.trim()=='回复'){
    console.log("执行")

    setTimeout(()=>{
      OnInputUser(czItem.value)
    },500)

    return;
  }

  if(option.name.trim()=='删除'){
    OnDelete(czItem.value.id,czIndex.value)
    return;
  }
};


const czItem=ref<Comments>(null)  // 需要操作的内容
const czIndex=ref<Comments>(null) // 需要操作的 评论占位

// 点击评论
function OnClickCommtent(item:Comments,index:number){

  if(!item.upload){
    closeToast(true)
    showFailToast('当前评论处于加载中');
    return;
  }

  czItem.value=item;
  czIndex.value=index
  console.log("唤起功能框")

  if(item.userId==id.value||Pop.Date2.upId==id.value){
    // 是本人的回复 或者是本人的动态
    options = [
      { name: '回复', icon: 'chat',className: 'aaa' },
      { name: '删除', icon: 'delete' },

    ];
  }else {
    options = [
      { name: '回复', icon: 'chat',className: 'aaa' },


    ];
  }


  showShare.value=true
}


// 跳转用户主页
function  ToUser(userId:number){
  console.log("跳转userId:",userId)
  setTimeout(()=>{
    ViewUserDynamicId.value=userId
    // timeOrCollectionTitle.value='我的收藏'
    route.push('/userDynamic') // 跳转用户信息修改
    // route.push('/timeView')
  },200)

}


function OnImageClick(url:string){
  showImagePreview([url]);
}


// 删除动态
const showSpace=ref<boolean>(true)
function SpaceDelete(spaceId:number){
  showConfirmDialog({
    title: '是否删除',
    message:
        '删除后无法回复',

  }).then(async ()=>{
    console.log("确定")

    showLoadingToast({
      message: '删除中……',
      forbidClick: true,
      duration:10000
    });


    try {
      await HttpDelete(SERVICE_ROUT.SPACE_DELETE+"/"+spaceId)
      closeToast(true)
      showSuccessToast('删除成功');
      showSpace.value=false
      await InitData()
    }catch (e){
      closeToast(true)
      showFailToast('删除失败');
      console.error(e)
    }



  }).catch(()=>{
    console.log("取消")
  })
}

</script>

<template>
  <div id="home-space-video-card"  v-if="Date2&&showSpace">
    <div>
      <div id="view-user-brief">
        <div id="view-user-brief-image" @click.stop="ToUser(Date2.upId)">
          <van-image
              round
              width="10rem"
              height="10rem"
              fit="cover"

              :src="ttRef.upImageSrc"
          />
        </div>




        <div id="view-user-body-user">
          <div class="user-name"><span>{{Date2.upName}}</span> <van-icon v-if="id==Date2.upId" @click="SpaceDelete(Date2.spaceId)" class="view-user-body-user-delete" style="float: right" name="delete-o" /> </div>

          <div class="user-massage">
            <div class="user-fan user-massage-item">{{formatDateTime4(Date2.data)}} • 发布了动态</div>

            <div class="user-placeholding"></div>
          </div>

        </div>
      </div>

      <div>

        <div id="home-space-video-card-title">
          {{ttRef.title}}
        </div>
        <div  id="home-space-video-card-image"  >
          <div class="home-space-video-card-image-item" v-for="item in Date2.showImageList" @click.stop="OnImageClick(item)">
            <van-image

                fit="cover"
                width="28rem"
                height="28rem"
                :src="item"
            />
          </div>



        </div>



        <div class="home-space-video-comment"  v-for="(item,index) in Date2.commentList"  :style="{animation:item.upload?'':'opacityAnimation 1s infinite'}" >

          <!--          普通回复类型-->
          <div v-if="item.commentsType==COMMENTS_TYPE.DYNAMIC" class="home-space-video-comment-item"  @click.prevent="OnClickCommtent(item,index)">
            <span class="home-space-video-comment-name"  @click.stop="ToUser(item.userId)" >{{item.userName}} ：</span>
            <span  class="home-space-video-comment-connten"   >{{item.content}}

            </span>

          </div>

          <!--          回复类型-->
          <div v-if="item.commentsType==COMMENTS_TYPE.DYNAMIC_REPLY"  class="home-space-video-comment-item" @click.prevent="OnClickCommtent(item,index)">
            <span class="home-space-video-comment-name"  @click.stop="ToUser(item.userId)">{{item.userName}} </span>
            <span> 回复 </span>
            <span class="home-space-video-comment-name" @click.stop="ToUser(item.parentId)">{{item.parentName}} ：</span>
            <span  class="home-space-video-comment-connten"   >{{item.content}}</span>



          </div>
        </div>

        <div id="home-space-video-input-m" @click.stop="OnInput">
          说点什么吧
        </div>



      </div>

    </div>

    <van-share-sheet
        :overlay-style="{'background': 'rgba(0,0,0,0.1)'}"
        style="font-size: 8rem"
        v-model:show="showShare"
        title="操作"
        :options="options"
        @select="onSelect"
    />
    <div style="width: 100%; height: 3rem">

    </div>
  </div>


</template>

<style scoped>

@media screen  and (min-device-width: 200px) and (max-device-width:5000px) {

  .home-space-video-card-image-item{
    margin: 1rem 1rem;
  }

  #home-space-video-card{
    background: white;
    margin-bottom: 3rem;
    padding-top: 2rem;
  }

  .home-space-video-comment-name{
    color: black;
    transition: color 0.1s ease;
  }
  .home-space-video-comment-name:active{
    color:  #0264e7;
  }

  .home-space-video-comment-item{
    background: white;
    transition: background-color 0.5s ease;
  }
  .home-space-video-comment-item:active{
    background: #c8c9cc;
  }


  .user-video-setting-card-font{

  }

  .input-comment-inputDm-icon2{
    color: black;
    transition: color 0.1s ease;
  }
  .input-comment-inputDm-icon2:active{
    color: #0264e7;
  }

  .home-space-video-comment-name{
    display: inline-block;
    font-weight: bold;
  }

  .home-space-video-comment-connten{
    display: inline-block;
  }



  .home-space-video-comment{
    width: 90%;
    margin: 2rem auto;
  }

  #home-space-video-input-m{
    margin: 2rem auto;
    height: 7rem;
    font-size: 3.5rem;
    width: 90%;
    line-height: 7rem;
    text-indent: 2rem;
    color:#b1b3b8;
    background: #e7e7e7;
    border-radius: 1.2rem;
  }

  #home-space-video-card-title{
    width: 90%;
    font-size: 4.3rem;
    margin: 2rem auto;
    font-weight: bold;
  }

  #home-space-video-card-image{
    width: 90%;
    height: 73%;

    overflow: hidden;
    margin: 2rem auto;
    flex-wrap: wrap;
    display: flex;

  }

  #view-user-brief-image{
    width: 10rem;
    height: 10rem;
    margin: 2rem 2rem;
  }

  #view-user-brief{
    /*background: blue;*/
    flex: 0 0 15rem;
    display: flex;
    align-items: center;
    padding-left: 3rem;
  }


  #view-user-body-user{
    margin-left: 2rem;

    flex: 0 1 75rem;
    display: flex;
    flex-direction: column;
  }

  .view-user-body-user-delete{
    transition: color 0.4s ease;
  }

  .view-user-body-user-delete:active{
    color: #0264e7;
  }

  .user-name{
    font-size: 4rem;
    flex: 0 0 6rem;
    color: black;
  }

  .user-massage{
    font-size: 3.5rem;
    height: 6rem;
    display: flex;
    color:  #c8c9cc ;
  }
}

</style>