<link rel="stylesheet" href="../../css/mobile/view.css">
<script setup lang="ts">

import V3Emoji from 'vue3-emoji'
import {computed, onMounted, ref, toRefs, watch, watchEffect} from "vue";
import Danmaku from "@nplayer/danmaku";
import {routerTo} from '../../util/util'
import ViewUser from "@/components/view/view-user.vue";
import route from "@/router/router";
import ViewComments from "@/components/view/view-comments.vue";
import {BulletOption} from "@nplayer/danmaku/dist/src/ts/danmaku/bullet";
import { showToast } from 'vant';
import {videoSocket, ViewCommentArray, ViewUpUserId} from '../../store/DataStore'
import {Assignment} from '../../util/util'

//import '../../store/RouterStore'
import {commentRoute, emojiShow, inputCommentTopShow, replyObject, shareShow, typeShow} from '../../store/DataStore'
import {Search} from "@element-plus/icons-vue";
import SearchView from "@/components/home/search/search-view.vue";
import CommentSection from "@/components/comment/comment-section.vue";
import CommentSectionReply from "@/components/comment/comment-section-reply.vue";
import InputComment from "@/components/comment/input-comment.vue";
import {HomeViewCard, Response, SERVICE_ROUT, ViewUserCard, ViewVideoCard} from '../../util/type'
import {HttpGet, HttpPut} from "../../api/http";
import {viewVideoId } from  '../../store/DataStore'
import {id} from "../../store/UserSrore";
//import {emoji} from '../../store/DataStore'
//import {hasKey} from "../../util/util";

const viewCard=ref<Response<ViewVideoCard>>()
// const playSrc=computed(()=>{
//   if(viewCard&&viewCard.value&&viewCard.value.body&&viewCard.value.body.videoSrc){
//     console.log("播放链接：", viewCard.value.body.videoSrc)
//     return viewCard.value.body.videoSrc
//   }
//   return ""
//
// })

const Src=ref<string>("")
const viewDom=ref(null)
onMounted( async ()=>{
  try {
    ViewCommentArray.value=[]
    console.log("播放对象：",player)
    console.log("请求的视频id:",viewVideoId.value)

    viewCard.value= ( await HttpGet(SERVICE_ROUT.VIDEO_GET+"/"+viewVideoId.value)).data
    console.log("需要播放的数据：",viewCard.value)
 list.value.push(viewCard.value.body.recommend)
  // const videoDome= document.getElementsByClassName("nplayer_video")[0]
   // Src.value=viewCard.value.body.videoSrc
        player.video.src=viewCard.value.body.videoSrc
    ViewUpUserId.value=viewCard.value.body.userId // 作者id
      if( player.danmaku.items){
        player.danmaku.items.push( ...viewCard.value.body.barrage)
        console.log("初始化弹幕")
      }else {
        console.error("初始化弹幕失败")
      }

    //videoDome.src=viewCard.value.body.videoSrc  // 改变播放列表

   // options.value.src=viewCard.value.body.videoSrc
    console.log("后端传世的评论数据：",viewCard.value.body)
    ViewCommentArray.value=  Assignment(viewCard.value.body.comment)
    ViewCommentArray.value.sort((a,b)=>b.likeSize-a.likeSize)  // 按热度
    console.log("评论数据：",ViewCommentArray.value)

    viewDom.value= document.getElementById('view')
    if(viewCard.value.status==404){
      console.error("home页面错误：404")
    }
  }catch (e){
    if(e.code === 'ECONNABORTED'){
      console.error("请求超时")
    }
    console.log("error:播放页面错误view:",e)
  }
  // try {
  //
  // }catch (e){
  //   console.error(e)
  // }
  // const view= document.getElementById('view')
  // console.log("view dom:",view)
  // const handleScroll = (e) => {
  //   let el = e.target
  //
  //
  //   if (Number(el.scrollTop + el.clientHeight).toFixed(0) == el.scrollHeight) {
  //     //console.log(currentPage.value, "yema");
  //     // currentPage.value++
  //     console.log("滚动到底部")
  //     //etchDatas()
  //   }
  // }
  // view.addEventListener('scroll', handleScroll );
})



//const emojiRef= ref<string[]>(emoji)
//  <----- 视频播放器相关

// 弹幕元素
const danmakuOptions = {
  items: [


  ]
}





const danmaku= new Danmaku(danmakuOptions);


// 播放数据
let player={
  src: "playSrc",

  plugins: [
    danmaku
  ],


}
//let player = null;
// 构造函数
const setPlayer= (p) => {
    p.on('DanmakuSend', (opts) => {
     console.log("接收的弹幕：",opts)
     });
  console.log("播放器属性：",p)
    //p.src=VideoSrc.value

    player = p;



}

// setInterval(()=>{
//   if(player&&('currentTime' in player)){
//     console.log("播放数据",player.currentTime)  // 当前的播放时间
//   }
//
// },1000)

const getPlayer=(p)=>{
  console.log("获取播放对象",p)
}
const options=ref(player)

//  -----> 视频播放器相关

//  <----- tab页面相关
const active=ref<0|1>(0)
const tab=ref(['简介','评论'])

const viewTabA=ref(true)  // 标签页面参数
const viewTabB=ref(false)  // 标签页面参数
function TabTo(to:number){
  active.value=to
  if(to==1){
    viewSelectColorA.value='black'
    viewSelectColorB.value='#0264e7'

    setTimeout(()=>{
      viewTabA.value=true
      viewTabB.value=false
    },1000)



    moveUnderline("A")
  }else {
    setTimeout(()=>{
      viewTabA.value=false
      viewTabB.value=true
    },1000)


    viewSelectColorA.value='#0264e7'
    viewSelectColorB.value='black'
    moveUnderline("B")
  }
}

const message=ref(`输入`)
const faoltInput=ref(null) // dom
function  moveInputAboveKeyboard() {
  // 将输入框移动到输入法上方
  const inputField = this.$refs.inputField;
  inputField.style.position = 'fixed';
  inputField.style.bottom = 'auto';
  inputField.style.zIndex = '9999';
  // 这里可以根据具体情况调整高度
  inputField.style.bottom = '50px';
}



// 弹出弹幕框
function Pl(){
  // 获得焦点
  faoltInput.value.focus()
}

const viewSelectButtonInput=ref(null)

function OnvViewSelectButtonInputClick(){
  OnTheBarrage() // 开启关闭弹幕
  // div.classList.toggle('expanded'); // 切换CSS类以触发动画
  console.log("点击输入弹幕")
  isExpanded.value = !isExpanded.value;
  inputMsg.value=''
  if(!isExpanded.value){
    inputMsg.value='点我发送弹幕'
  }

  // viewSelectButtonInput.value.classList.toggle('expanded');
}

const isExpanded=ref(false)
const inputMsg=ref('点我发送弹幕');
// 点击div时切换isExpanded的值，触发动画效果
const toggleSize = () => {
  isExpanded.value = !isExpanded.value;
};

const A=ref(null)
const B=ref(null)
const  underlineTransform=ref('translateX(7rem)') ; // 下划线的初始位置
// <--- 画线动
function moveUnderline(target) {
  if (target === 'B') {
    underlineTransform.value = 'translateX(7rem)'; // 移动到A下方
  } else if (target === 'A') {
    const offset =  B.value.offsetLeft; -  A.value.offsetLeft;
    underlineTransform.value = 'translateX(' + offset + 'px)'; // 移动到B下方
  }
}
// ---> 画线动画

const viewSelectColorA=ref('#0264e7')   // 选择的切换的颜色
const viewSelectColorB=ref('black')   // 选择的切换的颜色

//  -----> tab页面相关

// <---  切换动画
//const active = ref(0);
//  动画控件
const flyA=ref("")
const flyB=ref("")

watch(active,(newValue,oldValue)=>{
  if(newValue==1){
    flyA.value="fly-inR"

    flyB.value="fly-inLL"
  }else{
    flyA.value="fly-inL"

    flyB.value="fly-inRR"
  }

})

// --->  切换动画



// ---> 弹幕弹出框所需要的输入框

const InputState=ref(false) // 当前弹幕输入框的状态，是否处于输入状态
function onInputFocus() {
  console.log("获得焦点")
  inputDmInputState.value=false
  InputState.value=true
  window.addEventListener('resize', updateKeyboardHeight);



}
function onInputBlur() {
  InputState.value=false

  //this.isKeyboardVisible = false;

  window.removeEventListener('resize',updateKeyboardHeight);
}
function updateKeyboardHeight() {

  const inputDm= document.getElementById('inputDm')

  //this.gd=inputDm.getBoundingClientRect().top;

  inputDm.style.position='absolute;'
  inputDm.style.top= ''+inputDm.getBoundingClientRect().top+'px'
  inputDm.style.bottom=''

  const inputDmSelect= document.getElementById('inputDmSelect')
   inputDmSelect.style.background='#e9e9eb'
  inputDmSelect.style.position='absolute'

  const topTemp=inputDm.getBoundingClientRect().top+inputDm.getBoundingClientRect().height
  inputDmSelect.style.width='100%'
  inputDmSelect.style.top=topTemp+'px'
  inputDmSelect.style.height='999px'


}

// <--- 弹幕弹出框所需要的输入框

// 切换选择页面



// <--- 弹幕输入框
const inputDmIcon1Color=ref('rgba(0, 0, 0, 0.2)')
const inputDmIcon2Color=ref('rgba(0, 0, 0, 0.2)')

const checkedFont=ref('2') // 选择字号
const checkedLocation=ref('scroll') // 选择字体位置
const checkedColor=ref('#FFFFFF') // 选择字体颜色


const  inputDmInput=ref(null) // 真实弹幕输入框

// 点击输入弹幕
function InputBarrage(e){

  e.stopPropagation();
  inputMsg.value='正在输入弹幕'
  InputDomState.value=true  // 开启面板
  try {
    InputState.value=true
    const ShowFocus=()=>{
      setTimeout(()=>{
        try {
          inputDmInput.value.focus()
        }catch(e) {
          console.error("失败重试：",e)
          ShowFocus()

        }


      },10)
    }
    ShowFocus()




  //  inputDmInput.value.focus()
  }catch (E){
    console.error("点击弹幕输入虚拟框处：error:",E)
  }
}
// ---> 弹幕输入框


// 点击小红旗
const inputDmInputState=ref(false)

function  onClickComments(e){
  e.stopPropagation();


  console.log("当前是否亮：",inputDmInputState)
  // inputDmInput.value.focus()
  try {
    if(inputDmInputState.value){
      inputDmInputState.value=false
      inputDmInput.value.focus()
      console.log("亮")
    }else {
      inputDmInputState.value=true
    }



  }catch (e){
    console.error("点击弹幕选项设置按钮--小红旗：",e)
  }

}
// watch(inputDmInputState.value,(n)=>{
//   if(n){
//
//   }
// })

// 点击 弹幕输入框
function OnClickinputDmInput(e){
  e.stopPropagation();
}
// 点击下面的弹幕控件
function OnClickInputDmSelect(e){
  e.stopPropagation();
}

// 点击页面的其他地方
// 面板收起
const  InputDomState=ref(false)  // 弹幕设置组件显示控件--1
function AppOnClick(){
  emojiShow.value=false // 关闭表情框--控件2
  inputCommentTopShow.value=false // 输入框是否需要悬浮在背景框
  InputDomState.value=false // 关闭
  replyObject.value=null
  console.log("清空：",replyObject)
  inputMsg.value='点我输入弹幕'
  console.log("页面有点击",inputCommentTopShow.value)
}

/**
 弹幕对象

 interface BulletOption {
  color?: string; // 弹幕颜色
  text: string; // 弹幕文字
  time: number; // 弹幕出现时间
  type?: 'top' | 'bottom' | 'scroll'; // 弹幕类型，默认为滚动类型
  isMe?: boolean; // 是否是当前用户发送的
  force?: boolean; // 是否强制展示该弹幕（弹幕较多，并且是防碰撞模式时，可能会丢弃一部分弹幕）
}
 * @constructor
 */

const barrage=ref<BulletOption>({
  color:'white',
  text:'',
  time:0,
  type:'scroll',
  isMe:'true'
});

// 弹幕数据发送 TODO
const show = ref(false); // 消息控件
async function  OnClickSend(){
  barrage.value.color=checkedColor.value // 弹幕颜色
 // barrage.value.text=''  // 弹幕文字
  if(player&&('currentTime' in player)){
    barrage.value.time=player.currentTime // 弹幕出现时间
  }
 // barrage.value.time=player.currentTime // 弹幕出现时间
  barrage.value.type=checkedLocation.value  // 'top' | 'bottom' | 'scroll'; // 弹幕类型，默认为滚动类型
  barrage.value.isMe=true  //  // 是否是当前用户发送的
  console.log("发送消息:",barrage.value)
  //sendDanmakuItem(barrage.value)

  if(player&&('danmaku' in player)){
    const danmakuTemp=  player.danmaku
    if (danmakuTemp && ('send' in  danmakuTemp)){
      danmakuTemp.send(barrage.value)

      console.log("发送弹幕：",barrage.value)

      try {
        const barrageItem={  //构建弹幕对象
          videoId:viewVideoId.value,
          userId:id.value,
          time: barrage.value.time,
          type: barrage.value.type,
          color:barrage.value.color,
          text:barrage.value.text,
        }
        await HttpPut(SERVICE_ROUT.VIDEO_BULLETOPTION_PUT,barrageItem)
        showToast({

          message: '发送成功',
          position: 'top',
        });
        // 弹幕数据+1
        barrage.value.text=''
      }catch (e){
        //ToastPosition
        showToast({

          message: '网络错误',
          position: 'top',
        });
      }


      show.value=true;
      setTimeout(()=>{
        show.value=false;
      },1000)
    }
  }


}


// 禁用或开启弹幕
function OnTheBarrage(){
  if(player&&('danmaku' in player)){
    const danmakuTemp=  player.danmaku
    if(danmakuTemp&&("enabled" in danmakuTemp)&& danmakuTemp.enabled){
      // 启用状态 -- 禁用
    //  danmakuTemp. enabled=false
      danmakuTemp.disable()
      console.log("关闭弹幕")
    }else {
   //   danmakuTemp. enabled=true
      danmakuTemp. enable() // 启用
      console.log("开启弹幕")
    }
  }
}

let i=0
let time=0

function sendDanmakuItem() {
  if (player && ('danmaku' in player)) {
    const danmakuTemp = player.danmaku
    i++;
    console.log("进入发送")
    if (player && ('currentTime' in player)) {
      console.log("进入发送--时间")
      time = player.currentTime // 弹幕出现时间
    }
    const item: BulletOption = {
      color: 'red',
      text: '测试' + i,
      time: time,
      type: 'scroll',
      isMe: true,
      force: false
    }
    if (danmakuTemp && ('send' in danmakuTemp)) {
      console.log("进入发送--方法")
      //player && ('send' in  player)
      danmakuTemp.send(item)




    }
  }
}


//
// setInterval(()=>{
//   if(player&&('danmaku' in player)){
//     const danmakuTemp=  player.danmaku
//     i++;
//     console.log("进入发送")
//     if(player&&('currentTime' in player)){
//       console.log("进入发送--时间")
//       time=player.currentTime // 弹幕出现时间
//     }
//     const item:BulletOption={
//       color: 'red',
//       text: '测试'+i,
//       time:time,
//       type:'scroll',
//       isMe: true,
//       force: false
//     }
//     if (danmakuTemp && ('send' in  danmakuTemp)){
//       console.log("进入发送--方法")
//       //player && ('send' in  player)
//       danmakuTemp.send(item)
//       console.log("发送弹幕：",item)
//     }
//
//   }




// },1000)


// 分享弹出框
const showShare=ref(false)

// setInterval(()=>{
//   console.log("分享状态：",showShare.value)
// },1000)


// 分享按钮     <---

//const showShare = ref(false);
const optionsSheet = [
  { name: '复制链接', icon: 'font' },

];

const onSelect = (option) => {
  if(option.name=="复制链接"){
    // 创建一个虚拟的下载链接
   //  var link = document.createElement("a");
   //  // 设置链接的 href 属性为文件的路径
   //  link.href = viewCard.value.body.videoSrc; // 替换为实际文件的路径
   //
   //  // 设置下载文件的名称
   //  link.download =''+ Date.now()+'.mp4'; // 替换为实际文件的名称
   //
   //  // 将链接添加到页面中
   // // document.body.appendChild(link);
   //
   //  // 模拟点击链接进行下载
   //  link.click();
   //
   //  // 删除链接，避免在页面中显示
   //  document.body.removeChild(link);



    const text =viewCard.value.body.videoSrc;

    navigator.clipboard.writeText(text)
        .then(function() {
          showToast("已复制链接");
          console.log('已复制链接');
          showShare.value = false;
        })
        .catch(function(error) {
          showShare.value = false;
          console.error('复制已复制链接:', error);
        });


  }
 // showToast(option.name);
  showShare.value = false;
};


const msg=ref(true)
// 分享按钮     --->

//const shareShow =RouterStore().shareShow

const userShow =ref(true)
const commentsShow =ref(false)
//
watch(active,(newValue,oldValue)=>{
  commentsShow.value=true
  userShow.value=true
  typeShow.value=newValue
  if(newValue==0){


    setTimeout(()=>{
      commentsShow.value=false
    },200)
  }else if (newValue==1){
    setTimeout(()=>{
      userShow.value=false
    },200)

  }
})



// 推荐
const imageSrc=ref('src/public/interlude_Miku_in_Museland_3.png')
const searchSize=ref(8)


// 弹出层
const popupShow=ref(false)


// setInterval(()=>{
//   console.log("当前tab的值：",active.value)
// },1000)
//

// 点击按时间或是按风景
const fontColor=ref<"#b1b3b8"|"#1989fa">("#b1b3b8")
const OnTime=ref(false)
function OnClickHortOrTime(){ // 换颜色
  OnTime.value=!OnTime.value
  fontColor.value="#1989fa"
  setTimeout(()=>{
    fontColor.value="#b1b3b8"
  },200)
}

//
const visible=ref(true)
function ToHome(){

  try {
    videoSocket.value.close();
  }catch (e){
    console.error("video-socket：",e)
  }

  visible.value=false
  setTimeout(()=>{

    route.push('/home')
  },200)

}


// 随机推荐

const list = ref([]); // 播放列表
const page=ref<number>(0) // 分页数据
const loading = ref(false);
const finished = ref(false);

const onLoad =async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  page.value++;
  console.log("到达底部")
  try {

    const rep:Response<HomeViewCard[]>=(await HttpGet(SERVICE_ROUT.VIDEO_INIT_GET)).data;
    console.log("加载成功：",page.value," ",rep)
    if(rep.status==200){
      if(rep.body.length==0){
        finished.value = true;
        return;
      }
      list.value.push(rep.body)
      loading.value = false;
    }

  }catch (e){
    console.error(e)
  }

};



// 假设 el 是你要监听滚动事件的 DOM 元素



</script>

<template>
  <transition name="van-slide-right">
    <div id="view"   v-show="visible" @click="AppOnClick">
<!--      <van-toast v-model:show="show" style="padding: 0;top:10rem;height:8rem">-->
<!--        <template #message>-->
<!--          <div>发送成功</div>-->
<!--        </template>-->
<!--      </van-toast>-->

      <div id="view-head">
        <van-nav-bar
            title="视频详情"
            left-text="返回"
            left-arrow
            @click-left="ToHome"
        />
      </div>


<!--
      视频组件

-->
      <div>
        <NPlayer
            :options="options"
            :set="setPlayer"

        />
      </div>


<!--

        Tab 页面切换按钮
-->
      <div id="view-select-1">
        <div id="view-select">

          <div id="view-select-button-body">
            <div class="view-select-button" ref="A" @click="TabTo(0)" :style="{color:viewSelectColorA}" ><span class="view-select-button-font">简介</span></div>
            <div class="view-select-button" ref="B" @click="TabTo(1)" :style="{color:viewSelectColorB}"><span class="view-select-button-font" >评论</span></div>
            <div id="underline" :style="{ transform: underlineTransform }"></div>
          </div>


<!--
          弹幕输入虚拟框-- 上下顺序相反 左右
-->
          <div class="view-select-button-input-body">


            <div  class="view-select-button-input"  ref="viewSelectButtonInput"  :class="{ 'expanded': isExpanded }" >

<!--
    “弹” 字
-->
              <div class="view-select-button-input-dan"    @click="OnvViewSelectButtonInputClick">

                <span class="view-select-button-input-font">弹</span>
                <el-icon   size="6rem" color="#0264e7" v-if="!isExpanded" class="view-select-button-input-font-icon"><Check /></el-icon>
                <el-icon   size="6rem" color="rgba(0, 0, 0, 0.2)" v-if="isExpanded" class="view-select-button-input-font-icon"><Close /></el-icon>
              </div>
<!--
        控件--请输入文字
 -->
              <div class="view-select-button-input-body-msg"  @click="InputBarrage"><span class="view-select-button-input-body-msgFont">{{inputMsg}}</span></div>

            </div>


          </div>
        </div>


<!--

        用户简介页面
        评论输入界面
-->
        <div id="view-select-context">

          <div class="view-select-user" :class="flyA"  v-show="userShow">
            <view-user v-if="viewCard&&viewCard.body" :viewCardBody="viewCard.body"  v-model:msg="msg"></view-user>

<!--            <search-view v-if="viewCard&&viewCard.body"  :recommend="viewCard.body.recommend"  id="view-select-user-search"></search-view>-->

            <div v-if="viewCard&&viewCard.body"  id="view-select-user-search">
              <van-list
                  v-model:loading="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  error-text="请求失败，点击重新加载"
                  @load="onLoad"
                  :scroller="viewDom"
              >

                <van-cell v-for="item in list" :key="item" >
                  <search-view   :recommend="item" ></search-view>
                </van-cell>
              </van-list>
            </div>

          </div >
          <div class="view-select-comments"  :class="flyB"  v-show="commentsShow">

            <comment-section ></comment-section  >

          </div>
          <comment-section-reply ></comment-section-reply>

        </div>
        <input-comment v-show="commentsShow&&active==1"></input-comment>
      </div>

<!--
          弹幕输入框

-->
      <div :style="{'font-size':'4rem', 'z-index': '9999'}"  v-show="InputDomState" >
        <div  id="inputDm"  :style="{position: 'fixed', bottom: 0,width: '100%',height:'10rem'}">
          <van-icon   @click="onClickComments"  :color="inputDmInputState?'#0264e7':'#e9e9eb'" size="9rem" class="inputDm-icon1" name="flag-o" />
          <input type="text" ref="inputDmInput"  @keyup.enter="OnClickSend" id="inputDm-input" v-model="barrage.text" @click="OnClickinputDmInput"    @focus="onInputFocus" @blur="onInputBlur" placeholder="点击输入框弹出键盘">
          <van-icon :color="inputDmIcon2Color"  @click="OnClickSend"  size="9rem" class="inputDm-icon2" name="guide-o" />
        </div>
 
<!--
          弹幕字号选择--舍弃
-->
        <div    class="keyboard-overlay" id="inputDmSelect" @click="OnClickInputDmSelect" >
            <div class="inputDm-body"  v-if="false">
              <div class="inputDm-body-font">弹幕字号</div>
              <div>

                <van-radio-group v-model="checkedFont"  direction="horizontal" checked-color="red">
                  <van-radio name="1" :style="{'--van-radio-label-color':checkedFont=='1'?' #0264e7 ':' black '}">
                    大字号
                    <template #icon="props">
                   </template>
                  </van-radio>
                  <van-radio name="2"  :style="{'--van-radio-label-color':checkedFont=='2'?' #0264e7 ':' black '}">
                    中字号
                    <template #icon="props">
                     </template>
                  </van-radio>
                  <van-radio name="3"  :style="{'--van-radio-label-color':checkedFont=='3'?' #0264e7 ':' black '}">
                    小字号
                    <template #icon="props">
                     </template>
                  </van-radio>
                </van-radio-group>
              </div>

            </div>

<!--
        弹幕位置选择
        // 'top' | 'bottom' | 'scroll'; // 弹幕类型，默认为滚动类型
-->
          <div class="inputDm-body">
            <div class="inputDm-body-font">弹幕位置</div>
            <div>

              <van-radio-group v-model="checkedLocation"  direction="horizontal" checked-color="red">
                <van-radio name="top" :style="{'--van-radio-label-color':checkedLocation=='top'?' #0264e7 ':' black '}">
                  顶部
                  <template #icon="props">
                  </template>
                </van-radio>
                <van-radio name="scroll"  :style="{'--van-radio-label-color':checkedLocation=='scroll'?' #0264e7 ':' black '}">
                  滚动
                  <template #icon="props">
                  </template>
                </van-radio>
                <van-radio name="bottom"  :style="{'--van-radio-label-color':checkedLocation=='bottom'?' #0264e7 ':' black '}">
                  底部
                  <template #icon="props">
                  </template>
                </van-radio>
              </van-radio-group>
            </div>
          </div>


<!--
          弹幕颜色选择
-->

            <div class="inputDm-body" id="inputDm-body-color-select">
              <div class="inputDm-body-font"  id="inputDm-body-font-select">弹幕颜色</div>
              <div>

                <van-radio-group v-model="checkedColor"  direction="horizontal" checked-color="red">
                  <van-radio name="#337ecc" >
                    <div class="inputDm-body-font-color" :style="{'border': checkedColor=='#337ecc'?' 2px solid #0264e7':' 0px solid #0264e7',background:'#337ecc'}" ></div>
                    <template #icon="props">
                    </template>
                  </van-radio>
                  <van-radio name="#79bbff" >
                    <div class="inputDm-body-font-color" :style="{'border': checkedColor=='#79bbff'?' 2px solid #0264e7':' 0px solid #0264e7',background:'#79bbff'}"></div>
                    <template #icon="props">
                    </template>
                  </van-radio>
                  <van-radio name="#529b2e"  >
                    <div class="inputDm-body-font-color" :style="{'border': checkedColor=='#529b2e'?' 2px solid #0264e7':' 0px solid #0264e7',background:'#529b2e'}"></div>
                    <template #icon="props">
                    </template>
                  </van-radio>


                  <van-radio name="#95d475"  >
                    <div class="inputDm-body-font-color" :style="{'border': checkedColor=='#95d475'?' 2px solid #0264e7':' 0px solid #0264e7',background:'#95d475'}"></div>
                    <template #icon="props">
                    </template>
                  </van-radio>
                  <van-radio name="#b88230"  >
                    <div class="inputDm-body-font-color" :style="{'border': checkedColor=='#b88230'?' 2px solid #0264e7':' 0px solid #0264e7',background:'#b88230'}"></div>
                    <template #icon="props">
                    </template>
                  </van-radio>
                  <van-radio name="#eebe77"  >
                    <div class="inputDm-body-font-color" :style="{'border': checkedColor=='#eebe77'?' 2px solid #0264e7':' 0px solid #0264e7',background:'#eebe77'}"></div>
                    <template #icon="props">
                    </template>
                  </van-radio>
                  <van-radio name="#c45656" >
                    <div class="inputDm-body-font-color" :style="{'border': checkedColor=='#c45656'?' 2px solid #0264e7':' 0px solid #0264e7',background:'#c45656'}"></div>
                    <template #icon="props">
                    </template>
                  </van-radio>
                  <van-radio name="#f89898"  >
                    <div class="inputDm-body-font-color" :style="{'border': checkedColor=='#f89898'?' 2px solid #0264e7':' 0px solid #0264e7',background:'#f89898'}"></div>
                    <template #icon="props">
                    </template>
                  </van-radio>
                  <van-radio name="#73767a"  >
                    <div class="inputDm-body-font-color" :style="{'border': checkedColor=='#73767a'?' 2px solid #0264e7':' 0px solid #0264e7',background:'#73767a'}"></div>
                    <template #icon="props">
                    </template>
                  </van-radio>
                  <van-radio name="#b1b3b8"  >
                    <div class="inputDm-body-font-color" :style="{'border': checkedColor=='#b1b3b8'?' 2px solid #0264e7':' 0px solid #0264e7',background:'#b1b3b8'}"></div>
                    <template #icon="props">
                    </template>
                  </van-radio>
                  <van-radio name="#000000"  >
                    <div class="inputDm-body-font-color" :style="{'border': checkedColor=='#000000'?' 2px solid #0264e7':' 0px solid #0264e7',background:'#000000'}"></div>
                    <template #icon="props">
                    </template>
                  </van-radio>
                  <van-radio name="#FFFFFF"  >
                    <div class="inputDm-body-font-color" :style="{'border': checkedColor=='#FFFFFF'?' 2px solid #0264e7':' 0px solid #0264e7',background:'#FFFFFF'}"></div>
                    <template #icon="props">
                    </template>
                  </van-radio>
                </van-radio-group>
              </div>
            </div>

<!--
        占位置控件
-->
            <div id="inputDm-bottom"></div>

        </div>
      </div>
      <van-share-sheet
          v-model:show="shareShow"
          title="下载"
          :options="optionsSheet"
          @select="onSelect"
      />

    </div>
  </transition>
</template>

<style scoped>
@import "@/css/mobile/view.css";
@import "@/css/pc/view.css";
</style>

