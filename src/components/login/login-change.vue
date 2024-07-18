<script setup lang="ts">

import {onMounted, ref, onActivated, onUnmounted} from "vue";
import route from "../../router/router";
import {closeToast, showFailToast, showLoadingToast, showSuccessToast} from "vant";
import LoginYazm from "@/components/login/login-yazm.vue";
import {yzmText} from "@/store/DataStore";
import {HttpPost} from "@/api/http";
import {Response, SERVICE_ROUT} from "@/util/type";
onMounted(()=>{
  console.log("组件login激活");
  
})
onUnmounted(async ()=>{
  console.log("组件login销毁")
})
const to=()=>{
    route.push("/home")
}



//
// const value1 = ref('');
// const value2 = ref('');
// const value3 = ref('');
// const value4 = ref('');
// const sms=ref("")  // 验证码
// const pattern = ref(/^.{1,2}$/);
//
// // 校验函数返回 true 表示校验通过，false 表示不通过
// const validator = (val) => /1\d{10}/.test(val);
//
// // 校验函数可以直接返回一段错误提示
// const validatorMessage = (val) => `${val} 不合法，请重新输入`;
//
// const  nameMeaagee=(val)=>{
//   if(/^.{1,7}$/.test(val)){
//     return "长度太长" ;
//   }
// }
// // 校验函数可以返回 Promise，实现异步校验
// const asyncValidator = (val) =>
//     new Promise((resolve) => {
//       showLoadingToast('验证中...');
//
//       setTimeout(() => {
//         closeToast();
//         resolve(val === '1234');
//       }, 1000);
//     });
//
// const onFailed = (errorInfo) => {
//   console.log('failed', errorInfo);
// };
//



const value1 = ref('');
const value2 = ref('');
const value3 = ref('abc');
const value4 = ref('');
const pattern = /^.{1,15}$/;

// 校验函数返回 true 表示校验通过，false 表示不通过
const validatorZh = /^[a-zA-Z0-9]{8,15}$/

// 校验函数可以直接返回一段错误提示
const validatorMessage = (val) => `${val} 不合法，请重新输入`;

// 校验函数可以返回 Promise，实现异步校验
const asyncValidator = (val) =>
    new Promise((resolve) => {
      showLoadingToast('验证中...');

      setTimeout(() => {
        closeToast();
        resolve(val === '1234');
      }, 1000);
    });




const onFailed =async (errorInfo) => {
  console.log('failed', errorInfo);

  let isError=false
  if(yzmText.value.trim().toLowerCase()!=yzm.value.trim().toLowerCase()){
    yamMsg.value="验证码错误"
    isError=true
  }

  if(my.value.trim().length<=0){
    myMsg.value="密钥不能为空"
    isError=true
  }

  if(errorInfo&& ('errors' in errorInfo)&&errorInfo.errors.length > 0){
    console.error("有错误")
    isError=true

  }

  if(password.value.trim()!=password2.value.trim()){
    password2Msg.value="两次输入不相同"
    isError=true
  }

  if(isError){
    return
  }

  const user={
    password: password.value.trim(),
    secretKey:my.value.trim()
  }
  closeToast(true)
  showLoadingToast({
    message: '更改中...',
    forbidClick: true,
    duration:10000
  });
  try {
    const rep:Response<number>= (await HttpPost(SERVICE_ROUT.USER_CHANGE_POST,user)).data
    console.log("修改稿结果：",rep)
    if(rep.status==200){
      closeToast(true)
      showSuccessToast('修改成功');

      setTimeout(()=>{
        route.back()
      },500)
    }else if(rep.status==502){
      myMsg.value="密钥或旧密码错误"
      closeToast(true)
      showFailToast('密钥或旧密码错误');
    }
  }catch (e){
    closeToast(true)
    showFailToast('修改失败');
    console.error(e)
  }






};


const yzm=ref('');
const name=ref('')
const account=ref('')
const password=ref('')
const password2=ref('')
const my=ref('')

const yamMsg=ref("");
 const myMsg=ref('') // 密钥
 const password2Msg=ref('') // 密钥

const NoPassword=ref("点击找回密码")


function OnClickBar(){


  route.back()


}
</script>

<template>
  <div id="login">
    <van-nav-bar
        title="更改密码"
        left-text="返回"
        left-arrow
        @click-left="OnClickBar"


    />
    <div id="login-b">
    <van-form @failed="onFailed" @submit="onFailed">
      <van-cell-group inset>
        <!-- 通过 pattern 进行正则校验 -->
<!--        <van-field-->
<!--            v-model="name"-->
<!--            label="昵称"-->
<!--            name="name"-->
<!--            placeholder="请输入昵称"-->
<!--            :rules="[{ pattern, message: '不能超过15个字符' }]"-->
<!--        />-->
        <!-- 通过 validator 进行函数校验 -->
<!--        <van-field-->
<!--            label="账号"-->
<!--            v-model="account"-->
<!--            name="account"-->
<!--            placeholder="账号"-->
<!--            :rules="[{ pattern: /^[a-zA-Z0-9]{8,15}$/, message: '只能输入8~15位字母或数子' }]"-->
<!--        />-->
        <!-- 通过 validator 返回错误提示 -->
        <van-field
            label="新密码"
            v-model="password"
            name="password"
            placeholder="密码"
            type="password"
            :rules="[{ pattern:  /^[a-zA-Z0-9]{8,15}$/, message: '只能输入8~15位字母或数字'}]"
        />
        <!-- 通过 validator 进行异步函数校验 -->
        <van-field
            label="再次输入密码"
            v-model="password2"
            name="password2"
            placeholder="再次输入新密码"
            :error-message="password2Msg"
            @focus="password2Msg=''"
            type="password"
            :rules="[{ pattern:  /^[a-zA-Z0-9]{8,15}$/, message: '只能输入8~15位字母或数子' }]"
        />
        <van-field
            v-model="yzm"
            center
            clearable
            name="yzm"
            label="验证码"
            :rules="[{ pattern, message: '' }]"
            :error-message="yamMsg"
            placeholder="请输入验证码"
            @focus="yamMsg=''"
        >
          <template #button>
            <login-yazm></login-yazm>
          </template>
        </van-field>

        <van-field
            label="密钥或原密码"
            v-model="my"
            name="password2"
            placeholder="密钥或原密码"
            :error-message="myMsg"
            @focus="myMsg=''"
        />


<!--        <van-field-->

<!--            v-model="NoPassword"-->
<!--            is-link-->
<!--            readonly-->
<!--            name="datePicker"-->
<!--            label="忘记密码"-->
<!--            placeholder="忘记密码"-->

<!--        />-->

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          更改
        </van-button>
      </div>

    </van-form>
    </div>

<!--    <van-form @failed="onFailed">-->
<!--      <van-cell-group inset>-->
<!--        &lt;!&ndash; 通过 pattern 进行正则校验 &ndash;&gt;-->
<!--        <van-field-->
<!--            v-model="value1"-->
<!--            name="pattern"-->
<!--            placeholder="正则校验"-->
<!--            :rules="[{ pattern, message: '请输入正确内容' }]"-->
<!--        />-->
<!--        &lt;!&ndash; 通过 validator 进行函数校验 &ndash;&gt;-->
<!--        <van-field-->
<!--            v-model="value2"-->
<!--            name="validator"-->
<!--            placeholder="函数校验"-->
<!--            :rules="[{ validator, message: '请输入正确内容' }]"-->
<!--        />-->
<!--        &lt;!&ndash; 通过 validator 返回错误提示 &ndash;&gt;-->
<!--        <van-field-->
<!--            v-model="value3"-->
<!--            name="validatorMessage"-->
<!--            placeholder="校验函数返回错误提示"-->
<!--            :rules="[{ validator: validatorMessage }]"-->
<!--        />-->
<!--        &lt;!&ndash; 通过 validator 进行异步函数校验 &ndash;&gt;-->
<!--        <van-field-->
<!--            v-model="value4"-->
<!--            name="asyncValidator"-->
<!--            placeholder="异步函数校验"-->
<!--            :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"-->
<!--        />-->
<!--      </van-cell-group>-->
<!--      <div style="margin: 16px;">-->
<!--        <van-button round block type="primary" native-type="submit">-->
<!--          提交-->
<!--        </van-button>-->
<!--      </div>-->
<!--    </van-form>-->


<!--    {{yzmText}}-->
  </div>

</template>

<style scoped>
@media screen  and (min-device-width: 200px) and (max-device-width:5000px) {

  #login{
    width: 100vw;
    height: 100vh;


    background: linear-gradient(135deg, #a1c4fd, #c2e9fb);


  }

  #login-b{
    width: 100vw;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>