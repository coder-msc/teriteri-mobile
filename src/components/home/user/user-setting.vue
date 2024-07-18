<script setup lang="ts">
//个人信息修改



import {active} from "@/store/DataStore";
import {ref} from "vue";
import {
  closeDialog,
  closeToast,
  showConfirmDialog,
  showFailToast,
  showLoadingToast,
  showSuccessToast,
  showToast
} from 'vant';

import {InitData, userImage, userName,userBrief,userGender} from "../../../store/UserSrore";
import {HttpFile, HttpPost} from "../../../api/http";
import {SERVICE_ROUT} from "@/util/type";
import route from '../../../router/router.js'






// 返回
const visible=ref(true)
// function OnClickBar(){
//   visible.value=false
//   setTimeout(()=>{
//     active.value=0
//   },200)
// }

function OnClickBar(){
  visible.value=false
  setTimeout(()=>{

    route.back()
  },200)

}


const name=ref(userName.value) // 名字
const userMsg=ref(userBrief.value) // 个人简介
const fieldValue=ref(userGender.value) // 性别


const columns = [
  { text: '男', value: '男' },
  { text: '女', value: '女' },
  { text: '保密', value: '保密' },

];

const onConfirm = ({ selectedValues }) => {  // 确定
  fieldValue.value=selectedValues.join(',')
  showPicker.value=false
  //showToast(`当前值: ${selectedValues.join(',')}`);
};

const value = ref([
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
]);

const showPicker=ref(false)











// 裁剪
const  showCropper=ref(false)

const option=ref( {
  fixedBox:false ,
  canScale:true
}) //配置
const img=ref(userImage.value)

function getbase64Data(data) {
  img.value = data;
}


function getFile(file) {
  image.value=file
  console.log("文件：",file)
}

const  time=ref(100000)
function onClickSubmit(){


  showConfirmDialog({
    title: '是否修改',
    message:
        '换个方式做自己 ^_^',

  }).then(async ()=>{
    console.log("确定")

    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration:time.value
    });


   await upload()


  }).catch(()=>{
    console.log("取消")
  })
}


const image=ref(null) //


async function upload(){
  try {
    const formData=new FormData()
    const user={
      name:name.value,
      gender:fieldValue.value ,//性别
      brief: userMsg.value,
    }
    formData.append('user',JSON.stringify(user))
    if(image.value==null){
      // 没有更改头像
      //formData.append('image',image.value)
      const tt=ref('')
      await HttpFile(SERVICE_ROUT.USER_SETTING_NOIMAGE_POST,formData,tt)
    }else {
      // 更改头像
      formData.append('image',image.value)
      const tt=ref('')
      await HttpFile(SERVICE_ROUT.USER_SETTING_POST,formData,tt)
    }

    closeToast(true)
    showSuccessToast('修改成功');
    setTimeout(()=>{
      route.back()
    },500)
    await InitData()
  }catch (e){
    closeToast(true)
    showFailToast('修改失败');
    console.error("用户信息更新失败:",e)
  }

}



// async function uploadNoImage(){
//   try {
//     const formData=new FormData()
//     const user={
//       name:name.value,
//       gender:fieldValue.value ,//性别
//       brief: userMsg.value,
//     }
//     formData.append('user',JSON.stringify(user))
//     //formData.append('image',image.value)
//     const tt=ref('')
//     await HttpFile(SERVICE_ROUT.USER_SETTING_POST,formData,tt)
//     closeToast(true)
//     showSuccessToast('修改成功');
//     await InitData()
//   }catch (e){
//     closeToast(true)
//     showFailToast('修改失败');
//     console.error("用户信息更新失败:",e)
//   }
//
// }


// 跳转修改密码
function ToUserChge(){
  // 当前为游客 跳转--注册界面
    setTimeout(()=>{
      route.push('/loginChange')
    })

}

</script>

<template>
  <transition name="van-slide-right">
  <div id="user-setting" v-show="visible">

    <van-nav-bar
        title="信息修改"
        left-text="返回"
        left-arrow
        @click-left="OnClickBar"
        right-text="修改"
        @click-right="onClickSubmit"

    />

    <van-cell-group inset style="margin-top: 6rem">

      <van-field   input-align="right" name="uploader" label="头像">
        <template #input>
<!--          <van-uploader>-->
<!--            <van-image-->
<!--                round-->
<!--                width="20rem"-->
<!--                height="20rem"-->
<!--                fit="cover"-->
<!--                :src="img"-->
<!--            >-->


<!--            </van-image>-->
<!--            -->
<!--          </van-uploader>-->
          <div class="dome">
            <div class="cropper">
              <van-image
                  round
                  width="20rem"
                  height="20rem"
                  fit="cover"
                  :src="img"
                  class="img"
              ></van-image>
              <h5-cropper  :option="option" @getbase64Data="getbase64Data" @getblobData="getblobData" @getFile="getFile"></h5-cropper>

            </div>
          </div>
<!--          <van-uploader v-model="value" />-->
        </template>
      </van-field>


      <van-field
          v-model="name"
          label="昵称"
          placeholder="更改昵称"
          input-align="right"
      />
      <van-field
          input-align="right"
          v-model="fieldValue"
          is-link
          readonly
          label="性别"
          placeholder="更改性别"
          @click="showPicker = true"
      />
      <van-field

          input-align="right"
          v-model="userMsg"
          rows="2"
          autosize
          label="个人简介"
          type="textarea"
          maxlength="50"
          placeholder="请输入个人简介"
          show-word-limit
      />
<!--      <van-field>-->
<!--        <van-button round type="success">圆形按钮</van-button>-->
<!--      </van-field>-->

      <van-field
          input-align="right"

          is-link
          readonly
          label="更改密码"
          placeholder="更改密码"
          @click="ToUserChge"
      >
        <template #input>
          <div>更改密码</div>
        </template>
      </van-field>
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker
            title="性别"
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
            :style="{ width: '100%', height: '30%' }"
        />
      </van-popup>
<!--      <van-button round block type="primary" native-type="submit">-->
<!--        提交-->
<!--      </van-button>-->

    </van-cell-group>


  </div>
  </transition>
</template>

<style scoped>
@media screen  and (min-device-width: 200px) and (max-device-width:5000px) {

  #user-setting{
    width: 100vw;
    height: 100vh;
    background: #f1f1f2;
  }

  .dome {
    display: flex;
    justify-content: space-between;
    padding-left: 22px;
  }
  .cropper {
    width: 80px;
    height: 80px;
    line-height: 80px;
    /* 切记position: relative一定要有 */
    position: relative;
    border-radius: 80px;
    overflow: hidden;
    text-align: center;
  }
  .img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .info {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    margin-left: 30px;
    flex: 1;
    text-align: left;
  }
}
</style>