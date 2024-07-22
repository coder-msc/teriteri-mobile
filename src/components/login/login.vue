<script setup lang="ts">
import { onMounted, ref, onActivated, onUnmounted } from "vue";
import route from "../../router/router";
import {
    closeToast,
    showFailToast,
    showLoadingToast,
    showSuccessToast,
} from "vant";
import LoginYazm from "@/components/login/login-yazm.vue";
import { yzmText } from "@/store/DataStore";
import { HttpPost } from "@/api/http";
import { LoginInfo, Response, SERVICE_ROUT, User } from "@/util/type";
import { setUser } from "@/store/UserSrore";
onMounted(() => {
    console.log("组件login激活");
});
onUnmounted(async () => {
    console.log("组件login销毁");
});
const to = () => {
    route.push("/home");
};
const value1 = ref("");
const value2 = ref("");
const value3 = ref("abc");
const value4 = ref("");
const pattern = /^.{1,15}$/;

// 校验函数返回 true 表示校验通过，false 表示不通过
const validatorZh = /^[a-zA-Z0-9]{8,15}$/;

// 校验函数可以直接返回一段错误提示
const validatorMessage = (val) => `${val} 不合法，请重新输入`;

// 校验函数可以返回 Promise，实现异步校验
const asyncValidator = (val) =>
    new Promise((resolve) => {
        showLoadingToast("验证中...");

        setTimeout(() => {
            closeToast();
            resolve(val === "1234");
        }, 1000);
    });

const onFailed = async (errorInfo) => {
    let isError = false;
    if (yzmText.value.trim().toLowerCase() != yzm.value.trim().toLowerCase()) {
        if (yzmText.value.trim().length <= 0) {
            yamMsg.value = "验证码为空";
        } else {
            yamMsg.value = "验证码错误";
        }
        isError = true;
    }
    if (errorInfo && "errors" in errorInfo && errorInfo.errors.length > 0) {
        console.error("有错误");
        isError = true;
    }

    if (isError) {
        return;
    }
    // TODO 登录

    const user = {
        username: username.value.trim(),
        password: password.value.trim(),
    };

    closeToast(true);
    showLoadingToast({
        message: "登录中...",
        forbidClick: true,
        duration: 10000,
    });
    try {
        const rep: Response<LoginInfo> = (
            await HttpPost(SERVICE_ROUT.USER_LOGIN_POST, user)
        ).data;
        console.log("登录的用户信息:{}", rep);
        if (rep.code == 200) {
            closeToast(true);
            showSuccessToast(rep.message);

            setUser(rep); // 更新信息

            setTimeout(() => {
                route.back();
            }, 500);
        } else {
            closeToast(true);
            showFailToast("账号或密码错误!!!");
        }
    } catch (e) {
        closeToast(true);
        showFailToast("网络错误");
        // console.error(e)
        // console.error(e);
    }

    //console.log("登录结果：",rep)
};

const yzm = ref("");
const name = ref("");
const username = ref("");
const password = ref("");
const password2 = ref("");
const my = ref("");

const yamMsg = ref("");
const myMsg = ref(""); // 密钥
const password2Msg = ref(""); // 密钥

const NoPassword = ref("点击找回密码");

function OnClickBar() {
    route.back();
}
</script>

<template>

    <div id="login">
        <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="OnClickBar" />
        <div id="login-b">
            <van-form @failed="onFailed" @submit="onFailed">
                <van-cell-group inset>
                    <!-- 通过 validator 进行函数校验 -->
                    <van-field label="账号" v-model="username" name="username" placeholder="账号" />
                    <!-- 通过 validator 返回错误提示 -->
                    <van-field label="密码" v-model="password" name="password" placeholder="密码" type="password" />

                    <!-- <van-field v-model="yzm" center clearable name="yzm" label="验证码" :rules="[{ pattern, message: '' }]"
                     :error-message="yamMsg" placeholder="请输入验证码" @focus="yamMsg=''">
                        <template #button>
                            <login-yazm></login-yazm>
                        </template>
                    </van-field> -->
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        登录
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>

</template>

<style scoped>
@media screen /*and (min-device-width: 200px) and (max-device-width: 5000px)*/ {
    #login {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
    }
    #login-b {
        width: 100vw;
        height: 70vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
</style>
