<script setup lang="ts">

import route from "@/router/router.js";
import {Play, Response, SERVICE_ROUT, Video} from '../../../util/type'
import {onMounted, ref, watch} from "vue";

import {HttpFile, HttpGet, HttpGetFileObj} from "../../../api/http";
import {Base64ToImage, formatDateTime, VideoGetImage} from "../../../util/util";
import {InitData, userBrief} from "@/store/UserSrore";
import {closeToast, showFailToast, showLoadingToast, showSuccessToast} from "vant";
import {UserSettingVideo} from "@/store/DataStore";








const updateVideo=ref<boolean>(false);
const updateImage=ref<boolean>(false);


onMounted( async ()=>{
  console.log("需要修改的稿件id:",UserSettingVideo.value)
  const rep:Response<Video>=  (await HttpGet(SERVICE_ROUT.USER_SETTING_VIDEO_GET+"/"+UserSettingVideo.value)).data
  if(rep.status==200){
    console.log("需要修改的稿件：",rep)
    image.value=rep.body.coverImageUrl

    videoStart.value=true // 视频文件的选择状态


    textarea.value=rep.body.title   // 标题
    videoMsg.value=rep.body.brief   // 简介
    fieldValue.value=rep.body.type  // 分区
    if(rep.body.label.trim().length>0){
      LableList.value= rep.body.label.split(";") // 标签
    }


    // 只是更改
  }


})











const visible=ref(true)
function OnClickBar(){
  visible.value=false
  setTimeout(()=>{
    route.back()
  },200)

}




const fileList = ref([]);

const progressVue=ref(0)
const video=ref(null) // 视频数据
const image=ref(null) // 图片数据
const time=ref(0) // 视频播放时长
const videoStart=ref<boolean>(false) // 视频文件选择状态
const videoMsg=ref('') // 视频简介
const lableValue=ref('') // 标签内容



const afterRead = async (file) => {

  updateVideo.value=true
  imageSelect.value=false
  video.value=file.file
  //formData.append('video',file.file)

  //console.log("视频对象构建成功")
  VideoGetImage(video.value,(imageTemp,timeTemp)=>{
    image.value=imageTemp
    time.value=timeTemp
    videoStart.value=true

    updateImage.value=true

  });


};
const afterRead2 = async (file) => {

  imageSelect.value=file.file
  //console.log("进入裁剪")
  cropperDom.value.loadFile(file.file)
  try {

  }catch (e){

  }
  // cjDom.value.click()

};

const loadeStart=ref<boolean>(false)
watch(progressVue,(newValue)=>{
  if(newValue>=100){
    loadeStart.value=false
    closeToast(true)
    showSuccessToast('发布成功');
  }else {
    if(loadeStart.value){
      closeToast(true)

      showLoadingToast({
        message: '发布中:'+progressVue.value+"%",
        forbidClick: true,
        duration:50000
      });

    }
  }
})

const Upload=async ()=>{
  //console.log("开始上传")

  //formData.append()

  if(textarea.value.trim().length<=0){
    closeToast(true)
    showFailToast('标题不能为空');
    return
  }


  if(!(video||video.value||image||image.value)){
    //console.error("文件正在构建")
    return;
  }




  const play:Play={
    video: {



      id:UserSettingVideo.value,
      title:textarea.value,
      brief:videoMsg.value,
      type:fieldValue.value, // 分区
      label:getLables(),
      date:Date.now(), // 日期
      time:time.value
    }

  }

  const formData=new FormData();
  formData.append("play",JSON.stringify(play))

  if(updateVideo.value){ // 修改了视频
    formData.append("video",video.value)

  }

  if(updateImage.value){ // 修改了封面

    if (imageSelect.value){
      formData.append("coverImage",  imageBlob.value,Date.now()+'.png')
    }else {
      formData.append("coverImage",  Base64ToImage(image.value),Date.now()+'.png')
    }
  }




  try {

    await HttpFile(SERVICE_ROUT.USER_UPLOAD_POST,formData,progressVue)
    await InitData();
  }catch (e){
    closeToast(true)
    showFailToast('发布失败');
    loadeStart.value=false
    console.error(e)
  }



}



// 输入
const textarea = ref('')


// 图片裁剪
function getFile(file) {
  // image.value=file.file
  //console.log("文件：",file)
}
const option=ref( {
  fixedBox:false ,
  canScale:true,
  fixedNumber:[2048,1260]
}) //配置

function getbase64Data(data) {
  image.value = data;
  updateImage.value=true
  //console.log(data)
}

const imageBlob=ref(null)
function getblobData(file) {
  // image.value=file
  imageBlob.value=file
  updateImage.value=true
  //console.log("lobl数据：",file)
}


// 选择封面图片
function OnImageSelect(e){
  imageDom.value.chooseFile()
  //console.log("更换封面")

}
const imageSelect=ref(null);
const imageDom=ref(null)
const videoDom=ref(null) // video dom
const upload=ref(null) // 视频上传dom
const cropperDom=ref(null) // 裁剪dom
// 视频选择
function OnClickUploadSelect(){
  videoDom.value.chooseFile()
  // videoStart.value=true


}



const  t2=ref("")



// 选择分区
const columns = [
  { text: '动漫', value: '动漫' },
  { text: '生活', value: '生活' },
  { text: '影视', value: '影视' },
  { text: '其他', value: '其他' },

];
const fieldValue=ref('动漫') // 选择结果
const onConfirm = ({ selectedValues }) => {  // 确定
  fieldValue.value=selectedValues.join(',')
  showPicker.value=false
  //showToast(`当前值: ${selectedValues.join(',')}`);
};
const showPicker=ref(false)




// 添加标签
const LableList=ref([])
function AddAlble(){
  let lableTemp= lableValue.value
  // "这是一个;包含;分号的;字符串;".replace(/;/g, ' ')
  lableTemp= lableTemp.replace(/;/g, '') // 去除分号
  lableValue.value=''
  LableList.value.push(lableTemp)
}


// 移除标签
function DeleteLable(index:number){
  LableList.value.splice(index, 1);
  getLables()
}
function getLables(){
  let result=''
  LableList.value.forEach((item,i)=>{
    if(i==0){
      result=item
    }else {
      result+=';'+item
    }

  })
  return result
}
</script>

<template>
  <transition name="van-slide-right">


    <div id="user-video-uploder" v-show="visible">




      <van-nav-bar
          title="修改稿件"
          left-text="返回"
          left-arrow
          @click-left="OnClickBar"

      />


      <van-cell-group inset style="margin-top: 6rem">


        <div id="video-card">
          <div id="video-card-body" >
            <div >
              <div  id="upload-video"  @click="OnClickUploadSelect" >
                <van-icon size="6rem"   v-if="!videoStart" style="margin: 0 auto" name="plus" />
                <van-image
                    v-if="videoStart"
                    width="100%"
                    height="100%"
                    :src="image"
                />



                <div  v-if="videoStart" @click.stop="OnImageSelect"  class="preview-cover" >更换封面</div>

              </div>




            </div>

            <h5-cropper  ref="cropperDom" :hide-input="true" :option="option" @getbase64Data="getbase64Data" @getblobData="getblobData" ></h5-cropper>


          </div>

          <el-input
              v-model="textarea"
              style="width: 56rem;height: 23rem;  margin: 2rem 2rem;"
              :input-style="{height: '23rem',fontSize:'4rem'}"
              :rows="2"
              type="textarea"
              placeholder="标题"
              maxlength="80"
              show-word-limit="true"
          />
        </div>

        <van-divider />

        <van-field
            input-align="right"
            v-model="fieldValue"
            is-link
            readonly
            label="分区"
            placeholder="选择分区"
            @click="showPicker = true"
        />

        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker
              title="分区"
              :columns="columns"
              @cancel="showPicker = false"
              @confirm="onConfirm"
              :style="{ width: '100%', height: '30%' }"
          />
        </van-popup>


        <van-field name="radio" label="标签"      input-align="right">
          <template #input>
            <el-input
                v-model="lableValue"
                maxlength="10"
                placeholder="添加标签"
                show-word-limit
                type="text"
            />
            <el-button style="margin-left: 1rem" @click="AddAlble" >添加</el-button>
          </template>
        </van-field>

        <div id="view-user-unfold-tag" v-if="LableList.length!=0">
          <van-tag round color="rgb(228 230 236)"   @click.stop="DeleteLable(index)" :key="index" v-for="(item,index) in LableList" text-color="#606266" :style="{'font-size':'3.4rem','margin':'1rem 1rem'}"  size="large" type="success" class="view-user-unfold-tag-item">{{item}}</van-tag>


        </div>
        <van-divider />
        <van-field
            input-align="right"
            v-model="videoMsg"
            rows="3"

            label="视频简介"
            type="textarea"
            placeholder="请输入视频简介"
            show-word-limit
            maxlength="800"

        />
        <van-button round block type="primary"  @click.stop="Upload">
          更改
        </van-button>

      </van-cell-group>



      <van-uploader ref="videoDom" v-show="false"  accept="video" :max-count="1" :after-read="afterRead" />
      <van-uploader ref="imageDom" v-show="false"  accept="image" :max-count="1" :after-read="afterRead2" />

      <van-divider />

    </div>
  </transition>
</template>

<style scoped>
@import "@/css/mobile/user-video-uploder.css";
</style>