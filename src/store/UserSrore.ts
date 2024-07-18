import { LoginInfo, Response, SERVICE_ROUT, User, USER_Role } from "../util/type";
import { ref } from "vue";
import { HttpPost, HttpPut } from "../api/http";
import { User } from "@element-plus/icons-vue/dist/types";

export const USER_TEMP = {
    account: ref<string>(""),
    avatar: ref<string>(""),
    id: ref<number>(),
    token: "",
    userName: ref<string>(""), // 需要展示
    userImage: ref<string>(""),

    userSparkle: ref<number>(0), // 火花数量

    userConcern: ref<number>(0), // 关注数量
    userSomeone: ref<number>(0),// 粉丝数量
    userCommunity: ref<number>(0), // 社区动态数量
    userVideoSize: ref<number>(0),// 视频数量

    userRole: ref<string>(''), // 用户权限

    userGender: ref<string>('保密'), // 保密
    userBrief: ref<string>("我没有简介 >_<"), // 简介

    password: "",
    role: "",
    time: 0,
    version: 0

}

export const { account } = USER_TEMP
export const { userName } = USER_TEMP
export const { avatar } = USER_TEMP
export const { userImage } = USER_TEMP
export const { id } = USER_TEMP
export const { userConcern } = USER_TEMP
export const { userSomeone } = USER_TEMP
export const { userSparkle } = USER_TEMP
export const { userCommunity } = USER_TEMP
export const { userVideoSize } = USER_TEMP
export const { userBrief } = USER_TEMP
export const { userGender } = USER_TEMP
export const { userRole } = USER_TEMP

// 自动登录--token登录--token登录失败--保存密码
// TODO 存储浏览器 -- 添加评论-- 添加粉丝--点赞-- 删除评论--收藏--soket

async function TokenLogin() {
    console.log("自动等")
    let token = localStorage.getItem('user-token');
    if (!token) {
        token = ""
    }
    try {
        const P = {
            token: token
        }
        const user: Response<User> = (await HttpPost(SERVICE_ROUT.TOKEN_LOGIN, P)).data
        if (user.status == 200) {
            USER_TEMP.id.value = user.body.id;
            USER_TEMP.token = user.token;
            USER_TEMP.userImage.value = user.body.imageSrc; // 改成路径
            USER_TEMP.role = user.body.role
            USER_TEMP.userName.value = user.body.name;


            USER_TEMP.userSparkle.value = user.body.sparkle;
            USER_TEMP.userCommunity.value = user.body.community;
            USER_TEMP.userConcern.value = user.body.concern;
            USER_TEMP.userSomeone.value = user.body.someone;
            USER_TEMP.userVideoSize.value = user.body.videoSize;

            USER_TEMP.userBrief.value = user.body.brief
            USER_TEMP.userGender.value = user.body.gender

            USER_TEMP.userRole.value = user.body.role // 设置权限

            localStorage.setItem('user-token', user.token)
            localStorage.setItem('user-id', String(user.body.id))
            localStorage.setItem('user-account', user.body.account)
            localStorage.setItem('user-avatar', user.body.avatar)
            localStorage.setItem('user-userName', user.body.name)
            localStorage.setItem('user-userImage', user.body.imageSrc)
            localStorage.setItem('user-role', user.body.role)

            localStorage.setItem('user-sparkle', String(user.body.sparkle))



            localStorage.setItem('user-community', String(user.body.community))
            localStorage.setItem('user-concern', String(user.body.concern))
            localStorage.setItem('user-someone', String(user.body.someone))
            localStorage.setItem('user-videoSize', String(user.body.videoSize))


            localStorage.setItem('user-gender', String(user.body.gender))
            localStorage.setItem('user-brief', String(user.body.brief))





            console.log("自动登录成功：", user)
        }
    } catch (e) {
        console.error("自动登录错误：", e)
    }

}

// 清空个人信息
export function UserDataClear() {
    localStorage.clear()
    USER_TEMP.id.value = -1;
    USER_TEMP.token = '';
    USER_TEMP.userImage.value = ''; // 改成路径
    USER_TEMP.role = USER_Role.VISITOR
    USER_TEMP.userName.value = "未登录";


    USER_TEMP.userSparkle.value = 0;
    USER_TEMP.userCommunity.value = 0;
    USER_TEMP.userConcern.value = 0;
    USER_TEMP.userSomeone.value = 0;
    USER_TEMP.userVideoSize.value = 0;

    USER_TEMP.userBrief.value = "我没有简介 >_<"
    USER_TEMP.userGender.value = '保密'

    USER_TEMP.userRole.value = USER_Role.VISITOR // 设置权限

}

export function setUser(resp: Response<LoginInfo>) {
    console.log("登录返回信息赋值：{}", resp.data.token)
    USER_TEMP.id.value = resp.data.user.uid;
    USER_TEMP.token = resp.data.token;
    USER_TEMP.userImage.value = resp.data.user.avatar_url; // 改成路径
    USER_TEMP.role = resp.data.user.auth
    USER_TEMP.userName.value = resp.data.user.nickname;


    USER_TEMP.userSparkle.value = 0;
    USER_TEMP.userCommunity.value = 0;
    USER_TEMP.userConcern.value = 0;
    USER_TEMP.userSomeone.value = 0;
    USER_TEMP.userVideoSize.value = 0;

    USER_TEMP.userBrief.value = "userBrief"
    USER_TEMP.userGender.value = resp.data.user.gender

    USER_TEMP.userRole.value = resp.data.user.auth // 设置权限

    localStorage.setItem('user-token', resp.data.token)
    localStorage.setItem('user-id', String(resp.data.user.uid))
    localStorage.setItem('user-account', resp.data.user.nickname)
    localStorage.setItem('user-avatar', resp.data.user.avatar_url)
    localStorage.setItem('user-userName', resp.data.user.nickname)
    localStorage.setItem('user-userImage', resp.data.user.avatar_url)
    localStorage.setItem('user-role', resp.data.user.auth)

    localStorage.setItem('user-sparkle', "99")



    localStorage.setItem('user-community', String("user.body.community"))
    localStorage.setItem('user-concern', String("user.body.concern"))
    localStorage.setItem('user-someone', String("user.body.someone"))
    localStorage.setItem('user-videoSize', String("user.body.videoSize"))


    localStorage.setItem('user-gender', String("user.body.gender"))
    localStorage.setItem('user-brief', String("user.body.brief"))



}



// 初始化用户数据
export async function InitData() {
    try {

        await localhostData();
        await TokenLogin();



    } catch (E) {
        console.error("数据：error:", E)
    }
}

// 从本机读取数据
async function localhostData() {
    // 从本机读取数据

    USER_TEMP.id.value = Number(localStorage.getItem('user-id'))
    USER_TEMP.account.value = localStorage.getItem('user-account')
    USER_TEMP.avatar.value = localStorage.getItem('user-avatar')
    USER_TEMP.token = localStorage.getItem('user-token')
    USER_TEMP.userName.value = localStorage.getItem('user-userName')
    USER_TEMP.userImage.value = localStorage.getItem('user-userImage')
    USER_TEMP.role = localStorage.getItem('user-role')
    USER_TEMP.userRole.value = localStorage.getItem('user-role')

    USER_TEMP.userSparkle.value = Number(localStorage.getItem('user-sparkle'))


    USER_TEMP.userCommunity.value = Number(localStorage.getItem('user-community'))
    USER_TEMP.userConcern.value = Number(localStorage.getItem('user-concern'))
    USER_TEMP.userSomeone.value = Number(localStorage.getItem('user-someone'))
    USER_TEMP.userVideoSize.value = Number(localStorage.getItem('user-videoSize'))

    USER_TEMP.userGender.value = localStorage.getItem('user-gender')
    USER_TEMP.userBrief.value = localStorage.getItem('user-brief')




}



export function getUserToken() {
    return USER_TEMP.token
}

export function setUserToken(token: string) {
    USER_TEMP.token = token
    localStorage.setItem('user-token', USER_TEMP.token)
}




