<script setup lang="ts">
// 评论输入框

// 点击小红旗
import {ref, watch} from "vue";
import {
  addOrDeleteNumber,
  addOrDeleteObject,
  emoji,
  emojiShow,
  inputCommentTopShow,
  replyObject,
  viewVideoId
} from '../../store/DataStore'
import {COMMENTS_TYPE, USER_Role, ViewComment} from "../../util/type";
import {getCOMMENTS_TYPE} from "../../util/util";
import {userImage, id, userName, userRole} from "../../store/UserSrore";
import {showToast} from "vant";


// 表情元素
const emojiRef= ref<string[]>(emoji)

// 输入框提示内容
const InputPlaceholder=ref("小心翼翼的留下足迹.....")

const empInputDmInputState=ref(false)

const  inputCommentInputDmInput=ref(null) // 真实弹幕输入框

function  onClickComments(e){
  e.stopPropagation();
  RecordPosition()

  console.log("当前是否亮：",empInputDmInputState)
  // input-comment-inputDmInput.value.focus()
  try {
    if(empInputDmInputState.value){
      empInputDmInputState.value=false

      inputCommentInputDmInput.value.focus()
      console.log("亮")
    }else {
      empInputDmInputState.value=true
    }



  }catch (e){
    console.error("点击弹幕选项设置按钮--小红旗：",e)
  }

}


// 记录上一次光标位置
const InputNextPosition=ref(0)
function RecordPosition(){
 try {
   console.log("当前光标位置：",inputCommentInputDmInput.value.selectionStart)
   InputNextPosition.value = inputCommentInputDmInput.value.selectionStart;
 }catch (e){
   console.error("InputNextPosition-error:",e)
 }

 // var endPos = inputBox.selectionEnd;
}

// 插入表情
function InsertEmote(emo){
  try {
   // const emo= emojiRef.value[i]
    // .substring(0, startPos) + emoji +text.slice(a);
    barrage.value=barrage.value.substring(0, InputNextPosition.value)+emo+barrage.value.slice(InputNextPosition.value);
    InputNextPosition.value+=emo.length
  }catch (e){
    console.error("InsertEmote--error:",e)
  }

}


// 弹幕数据发送 TODO
const show = ref(false); // 消息控件
function OnClickSend(e){




  emojiShow.value=false // 关闭表情框--控件2
  inputCommentTopShow.value=false // 输入框是否需要悬浮在背景框


  if(userRole.value==null||userRole.value==''||userRole.value==USER_Role.VISITOR){
    showToast({
      message: '账号未登录',
      position: 'top',
    });

    return;
  }

 // InputDomState.value=false // 关闭
  e.preventDefault()
  e.stopPropagation();
  if(barrage.value.trim().length<=0){
    console.log("输入内容为空")
    return;
  }
   let sendObj:ViewComment

  console.log("需要回复的评论",replyObject," value:",replyObject.value)
  if(replyObject&&replyObject.value){


    const typeTemp=getCOMMENTS_TYPE(replyObject.value.type)
    let parentIdTemp=-1;
    console.log("父评论类型：",replyObject.value.type)

    //if()
    if(replyObject.value.id==40){
      // 自己对自己的评论处理 TODO
      UserMyCommentService()
      return;
    }

    switch (typeTemp)    {
      case COMMENTS_TYPE.VIDEO:
        parentIdTemp=-1
        break;
      case COMMENTS_TYPE.VIDEO_REPLY:
        parentIdTemp=replyObject.value.id
         break;
      case COMMENTS_TYPE.VIDEO_REFUTATION:
        parentIdTemp=replyObject.value.parentId
        break;


    }



     sendObj={
      child: [],

      content: barrage.value,
      deleteShow: true,
      id: Date.now(),
      likeSize: 0,
       likeState:false,
      parentId: parentIdTemp,
      time: Date.now(),
      toComment:  replyObject.value,
      type:typeTemp,
      userImageSrc: userImage.value,
      userName: userName.value,
       userId: id.value,
      videoId:  replyObject.value.videoId,
       upload:false
    }
    addOrDeleteNumber.value++;

  }else {
    // 普通回复
     sendObj={
      child: [],
      content: barrage.value,
      deleteShow: true,
       userId: id.value,
      id: Date.now(),
      likeSize: 0,
       likeState:false,
      parentId: -1,
      time: Date.now(),
      toComment: null,
      type:COMMENTS_TYPE.VIDEO,
      userImageSrc: userImage.value,
      userName: userName.value,
      videoId: viewVideoId.value ,
       upload:false
    }

    addOrDeleteNumber.value++;

  }

  addOrDeleteObject.value=sendObj;

  barrage.value=""
  console.log("添加评论：",sendObj)



}

// 对自己 回复自己的情况
function UserMyCommentService(){
  //const typeTemp=getCOMMENTS_TYPE(replyObject.value.type)
  let sendObj:ViewComment
  let parentIdTemp=-1;
  switch (replyObject.value.type)    {
    case COMMENTS_TYPE.VIDEO:

      sendObj={
        child: [],
        content: barrage.value,
        deleteShow: true,
        id: 4,
        likeSize: 0,
        likeState:false,
        parentId: replyObject.value.id,
        time: Date.now(),
        toComment: null,
        userId: id.value,
        type:COMMENTS_TYPE.VIDEO_REPLY,
        userImageSrc: userImage.value,
        userName: userName.value,
        videoId:  viewVideoId.value,
        upload:false
      }
      break;
    case COMMENTS_TYPE.VIDEO_REPLY:
      sendObj={
        child: [],
        content: barrage.value,
        deleteShow: true,
        likeState:false,
        id: Date.now(),
        likeSize: 0,
        userId: id.value,
        parentId: replyObject.value.parentId,
        time: Date.now(),
        toComment: replyObject.value.toComment,
        type:COMMENTS_TYPE.VIDEO_REPLY,
        userImageSrc: userImage.value,
        userName: userName.value,
        videoId:  viewVideoId.value,
        upload:false

      }
      break;
    case COMMENTS_TYPE.VIDEO_REFUTATION:
      sendObj={
        child: [],
        content: barrage.value,
        deleteShow: true,
        id: Date.now(),
        likeSize: 0,
        likeState:false,
        userId: id.value,
        parentId: replyObject.value.parentId,
        time: Date.now(),
        toComment: replyObject.value.toComment,
        type:COMMENTS_TYPE.VIDEO_REFUTATION,
        userImageSrc: userImage.value,
        userName: userName.value,
        videoId:  viewVideoId.value,
        upload:false

      }
      break;


  }
  addOrDeleteNumber.value++;
  addOrDeleteObject.value=sendObj;

  barrage.value=""
  console.log("添加评论：",sendObj)
}



//const deleteInputSize=ref(0)
watch(replyObject,(newValue)=>{
  console.log("replyObject 最新的值",newValue)
  if(newValue){
    //"回复：@".slice("回复：".length)
    // deleteInputSize.value=("回复：@"+newValue.userName).length
    InputPlaceholder.value="回复：@"+newValue.userName
   // console.log("改变：",InputPlaceholder.value)
    //barrage.value="回复：@"+newValue.userName
  }else {
    InputPlaceholder.value="小心翼翼的留下足迹....."
  }
})


const inputDmIcon2Color=ref('rgba(0, 0, 0, 0.2)')
const barrage=ref("");

// 点击 弹幕输入框
function OnClickinputDmInput(e){
  e.stopPropagation();
}


const InputState=ref(false) // 当前弹幕输入框的状态，是否处于输入状态
function onInputFocus() {
  emojiShow.value=true
  inputCommentTopShow.value=true
  console.log("获得焦点")
  empInputDmInputState.value=false
  InputState.value=true
  //window.addEventListener('resize', updateKeyboardHeight);



}

function onInputBlur() {
  console.log("失去焦点")
  //InputPlaceholder.value="小心翼翼的留下足迹....."
  InputState.value=false

  //this.isKeyboardVisible = false;

 // window.removeEventListener('resize',updateKeyboardHeight);
}

// 停止悬浮输入框
watch(inputCommentTopShow,(newValue)=>{
  //console.log("有变化")
  try {
    if(!newValue){
      console.log("放置回最下方")
      const inputCommentInputDm= document.getElementById('input-comment-inputDm')
       inputCommentInputDm.style.position="fixed"
       inputCommentInputDm.style.top=""
      inputCommentInputDm.style.bottom='0px'
      inputCommentInputDm.style.zIndex='9999'


    }
  }catch (e){
    console.error("watch---inputCommentTopShow:",e)
  }
 // barrage.value=inputCommentTopShow.value

})

function updateKeyboardHeight() {

  const inputCommentInputDm= document.getElementById('input-comment-inputDm')
//  inputCommentInputDm.style.top="100%"

  //this.gd=input-comment-inputDm.getBoundingClientRect().top;

  inputCommentInputDm.style.position='absolute;'
  inputCommentInputDm.style.top= ''+inputCommentInputDm.getBoundingClientRect().top+'px'

  inputCommentInputDm.style.bottom=''

  const inputCommentInputDmSelect= document.getElementById('input-comment-inputDmSelect')
  inputCommentInputDmSelect.style.background='#e9e9eb'
  inputCommentInputDmSelect.style.position='absolute'


  const topTemp=inputCommentInputDm.getBoundingClientRect().top+inputCommentInputDm.getBoundingClientRect().height
  inputCommentInputDmSelect.style.width='100%'
  inputCommentInputDmSelect.style.top=topTemp+'px'

  inputCommentInputDmSelect.style.height='999px'
  inputCommentInputDmSelect.style.zIndex='9999'

  //barrage.value= inputCommentInputDmSelect.style.top
  //const inputCommentInputComment-inputDm-body-color-select =document.getElementById('input-comment-input-comment-inputDm-body-color-select')
  //inputDmBodyEumSelect.style.height=(document.body.getBoundingClientRect()-inputCommentInputDm.getBoundingClientRect().top)+"px"
  //gd.value=inputDmBodyEumSelect.style.height

}
const gd=ref()

// <--- 弹幕弹出框所需要的输入框


// 点击下面的弹幕控件
function OnClickInputDmSelect(e){
  e.stopPropagation();
}

// const checkedFont=ref('2') // 选择字号
// const checkedLocation=ref('scroll') // 选择字体位置
// const checkedColor=ref('#FFFFFF') // 选择字体颜色
</script>

<template>
  <!--
            弹幕输入框

  -->
  <div :style="{'font-size':'4rem' }"  v-show="true" >
    <div @click.stop=""  id="input-comment-inputDm"  :style="{position: 'fixed', bottom: 0,width: '100%','min-height':'10rem'}">

<!--      <input type="text" ref="inputCommentInputDmInput" :placeholder="InputPlaceholder" @keyup.enter="OnClickSend" id="input-comment-inputDm-input" v-model="barrage" @click="OnClickinputDmInput"    @focus="onInputFocus" @blur="onInputBlur" >-->

        <el-input
            v-model="barrage"
            style="width: 240px"
            :autosize="{ minRows: 1, maxRows: 2 }"
            type="textarea"
            :placeholder="InputPlaceholder"
            @click="OnClickinputDmInput"
            @focus="onInputFocus"
            @blur="onInputBlur"

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


<!--    移除表情功能  -->
      <van-icon  v-if="false"  @click="onClickComments"  :color="emojiShow&&empInputDmInputState?'#0264e7':'#c8c9cc'" size="7rem" class="input-comment-inputDm-icon1" name="smile-o" />

      <van-icon  id="input-comment-inputDm-icon"  @click="OnClickSend"  size="9rem" class="input-comment-inputDm-icon2" name="guide-o" />
    </div>

    <!--
              表情框 v-show="empInputDmInputState&&emojiShow"-- 禁用
    -->
    <div  v-if="false"   class="keyboard-overlay" id="input-comment-inputDmSelect" @click="OnClickInputDmSelect" >





      <!--
                表情
      -->

      <div  class="input-comment-inputDm-body" id="input-comment-input-comment-inputDm-body-color-select">
        <div class="input-comment-inputDm-body-font" @click="InsertEmote(enm)"  v-for="enm in emojiRef" :key="enm">
          {{enm}}
        </div>

      </div>

      <!--
              占位置控件
      -->
      <div id="input-comment-input-comment-inputDm-bottom"></div>

    </div>
  </div>


</template>

<style scoped>



@import "@/css/mobile/input-comment.css";

</style>