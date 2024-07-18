<script setup lang="ts">


// 返回
import {ref} from "vue";
import {HttpFile} from "../../../api/http";
import route from '../../../router/router.js'
import {Response, SERVICE_ROUT, SPACE_TYPE} from '../../../util/type'
import {closeToast, showFailToast, showLoadingToast, showSuccessToast} from "vant";


const visible=ref(true)
function OnClickBar(){

    visible.value=false
    setTimeout(()=>{

      route.back()
    },200)


}

const progressVue=ref(0)
// 发表
async function onClickSubmit(){

  try {
    const formData=new FormData()
    const space={
      type:SPACE_TYPE.SHOW,
      title:title.value
    }

    formData.append("space",JSON.stringify(space))
    if(fileList.value.length>0){

      const files=[]
      fileList.value.forEach(item=>{
        files.push(item.file)
        formData.append('files',item.file)
      })
      console.log("上传文件：",files)

    }

    showLoadingToast({
      message: '发布中:'+progressVue.value+"%",
      forbidClick: true,
      duration:50000
    });
    const rep:Response<number>= (await HttpFile(SERVICE_ROUT.SPACE_ADD_POST,formData,progressVue)).data

    if(rep.status==200){
      closeToast(true)
      showSuccessToast('发布成功');
    }
  }catch (e){
    closeToast(true)
    showFailToast('发布失败');
  }


  console.log("文件:",fileList.value,progressVue)
}

// 标题
const title=ref<string>('')


function afterRead(file){ // 加载文件

}

const fileList=ref( [

])

</script>

<template>
  <transition name="van-slide-up">
  <div id="home-space-add"  v-show="visible">

    <van-nav-bar
        title="发布动态"
        left-text="返回"
        left-arrow
        @click-left="OnClickBar"
        right-text="发表"
        @click-right="onClickSubmit"

    />


    <div style="  padding-top: 6rem;">
      <van-cell-group inset >

        <el-input
            v-model="title"
            style="width: 87rem;height: 35rem;  margin: 2rem 2rem;"
            :input-style="{height: '35rem',fontSize:'4rem'}"
            :rows="2"
            type="textarea"
            placeholder="标题"
            maxlength="300"
            show-word-limit="true"
        />

        <van-uploader style="margin: 5.2rem 5.2rem;" preview-size="25rem" v-model="fileList" multiple />
      </van-cell-group>
    </div>



  </div>
  </transition>
</template>

<style scoped>
@media screen  and (min-device-width: 200px) and (max-device-width:500px) {
  #home-space-add{
    width: 100vw;
    height: 100vh;

    background: linear-gradient(135deg, #a1c4fd, #c2e9fb);

  }

}


</style>