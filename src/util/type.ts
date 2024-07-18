import { HomeViewCard } from "@/api/video/video";
import { BulletOption } from "@nplayer/danmaku/dist/src/ts/danmaku/bullet";

export enum SERVICE_ROUT { // 后端路由 http://192.168.0.104:3000
    ServerPath = "http://192.168.0.104:7070",
    SERVER_SOCKET = "ws://192.168.0.104:7070",
    //ServerPath="http://127.0.0.1:8080",
    HELLO_GET = "/hello",
    TOKEN_LOGIN = "user/token/login", // 使用token自动登录
    USER_LOGIN_POST = "/user/account/login",
    OUT_DELETE = "/user/out", // 退出登录
    USER_ENROLL_PUT = "/user/enroll",//注册
    AVATAR_POST = "/user/avatar", // 设置用户头像
    VIDEO_INIT_GET = "/video/random/visitor",  // 获得视频推荐
    VIDEO_INIT_DM_GET = "/video/init/dm",  // 获得视频推荐
    VIDEO_INIT_SH_GET = "/video/init/sh",  // 获得视频推荐
    VIDEO_INIT_YS_GET = "/video/init/ys",  // 获得视频推荐
    VIDEO_INIT_QT_GET = "/video/init/qt",  // 获得视频推荐


    VIDEO_COMMENTS_PUT = "/video/comments", // 视频评论
    VIDEO_COLLECTION_PUT = "/video/collection", // 视频取消收藏
    VIDEO_COLLECTION_DELETE = "/video/collection", // 视频收藏
    VIDEO_BULLETOPTION_PUT = "/video/bulletoption", // 添加弹幕
    VIDEO_LIKE_PUT = "/video/videoLike",  // 视频点赞
    VIDEO_LIKE_DELETE = "/video/videoLike",   // 视频取消点赞
    VIDEO_NOLIKE_PUT = "/video/videoNoLike",  // 视频点踩
    VIDEO_NOLIKE_DELETE = "/video/videoNoLike",   // 取消视频点踩
    VIDEO_COMMENTS_LIKE_PUT = "/video/comments/like", // 视频评论点赞
    VIDEO_COMMENTS_LIKE_DELETE = "/video/comments/like", // 视频评论点赞取消
    VIDEO_COMMENTS_DELETE = "/video/comments",
    VIDEO_SPARKLE_PUT = "/video/sparkle",   // 视频点火
    VIDEO_GET = "/video/getone",  // 获得播放视频
    VIDEO_UPLOAD_POST = '/video/upload',    // 视频上传
    USER_SOCKET = "",
    USER_HISTORY = "/user/history",

    USER_CHANGE_POST = "/user/change",  // 用户密码更改
    USER_CONCERN_PUT = "/user/concern",
    USER_SETTING_POST = "/user/setting",
    USER_SETTING_NOIMAGE_POST = "/user/setting/no",
    USER_CONCERN_DELETE = "/user/concern",
    USER_DYNAMIC_GET = "/user/dynamic", // 用户动态信息查看
    USER_VIDEO_GET = "/user/video", // 分页获得数据 /userId/page
    USER_SETTING_VIDEO_GET = "/user/setting/video", // 分页获得数据 /setting/user/video/{video}  // 修改视频稿件
    USER_UPLOAD_POST = "/user/upload", // 分页获得数据 /setting/user/video/{video}  // 修改视频稿件

    USER_VIDEO_LIST_GET = "/user/video/list", // /user/video/list/{page} 获得视频的投稿列表

    USER_VIDEO_LIST_DELETE = "/user/video/list", // /user/video/list/{videoId}  删除视频

    USER_CONCERN_GET = "/user/get/concern",  // 获得关注列表
    USER_SOMEONE_GET = "/user/get/someone", // 获得粉丝列表


    SPACE_ADD_POST = "/space/add", // 添加动态
    SPACE_DELETE = "/space/delete", // 删除动态 /space/delete/{spaceId}


    SPACE_GET = "/space/get", // 获得动态 /space/get/{page}
    SPACE_ALL_GET = "/space/getAll", // 获得动态 /space/get/{page}
    SPACE_USER_GET = "/space/getUser", // 获得动态 /space/get/{page}/{userId}
    SPACE_APP_COMMENT_PUT = "/space/add/comment", // 添加评论 /space/get/{page}
    SPACE_DELETE_COMMENT_DELETE = "/space/delete/comment", // 添加评论 /space/delete/comment/{page}

    MESSAGE_REMOVE = "/message/remove",//  设置为消息已经查看


    SEARCH_RESULT_GET = "/search/result", // 搜索结果
    SEARCH_VIDEO_GET = "/search/video", // 搜索结果视频  "/search/video/{page}",
    SEARCH_USER_GET = "/search/user", // 搜索结果 用户"/search/user/{page}"

    USER_COLLECTION = "/user/collection",
    VIDEO_SOCKET = "/socket/video/session",  // video 会话
    MASSAGE_SOCKET = "/socket/massage/session"  // video 会话  /socket/massage/session/{userId}
}

export interface Response<T> {   // Http的响应体
    message?: string
    code: number
    data?: T
}

export interface LoginInfo {
    user: User
    token: string
}

// 响应体相关
export interface User {
    uid?: number,
    sparkle: number, // 火花数量
    nickname?: string,
    community: number,// 社区数量
    concern: number, // 关注数量
    someone: number, // 粉丝数量
    videoSize: number, // 视频数量
    role?: string
    account?: string
    password?: string
    avatar_url?: string
    time?: number
    imageSrc: string
    version?: number,
    gender: string, // 性别
    brief: string, // 简介
    auth: string,

}

export interface Video {
    id?: number
    userId?: number
    url?: string
    filePath?: string // 文件路径
    review?: boolean
    title?: string
    brief?: string
    viewNum?: number
    type: string  // 分区
    collection?: number
    likes?: number
    comments?: string
    label?: string
    coverImageUrl?: string
    coverImageFilePath?: string // 封面路径
    playback?: number
    date?: number // 日期
    version?: number
}

export interface Message {// req USER_SOCKET
    id?: number
    fromUserId?: number
    toUserId?: number
    type?: string
    content?: string
    date?: number
    state?: boolean
    videoId?: number
    deleted?: number
}

export interface NoteMessage { //  rep USER_SOCKET
    message: Message
    fromUser: User
    uuid: string
}

export interface VideoMessage {  // VIDEO_SOCKET   rep ANd req
    messageId?: string
    token?: string
    type?: string
    videoId?: number
    videoLikeNumber?: number
    videoCommentsNumber?: number
    videoCollectionNumber?: number
    view?: number
    sessionId?: string
    like?: boolean
    collection?: boolean
    comments?: Comments

}


export interface Comments { // 评论 ---
    userImageSrc: string;
    userName: string;

    id: number
    videoId: number
    spaceId: number // todo // 动态id
    userId: number
    commentsType: COMMENTS_TYPE
    content: string
    toCommentId: number  // 新加回怼的评论id
    parentId: number  //  不一样  视频下面是 评论的id ,动态下面是回怼 的userId
    parentName: string, // todo
    likeNum: number
    date: number
    review: boolean  // 审核状态
    deleted: number,
    upload: boolean // todo 是否处于加载状态 前端独有
}
export interface CommentsData { // 评论信息
    comments: Comments
    likeState: boolean
}

export interface Play {
    video: Video // 视频信息
    like: boolean // 点赞信息
    collection: boolean // 收藏状态
    comments: CommentsData[] // 评论内容
}


// ---->  响应体相关

// <----  视图展示相关

export interface ViewComment {  // 视图需要的信息--评论
    id: number, // 评论id
    userId: number, // 评论的id
    parentId?: number,  // 父类id--依附于
    toComment?: ViewComment  // 新加回怼的评论id  //COMMENTS_TYPE.VIDEO_REFUTATION 时候才会有值
    videoId: number,// 视频id
    userName: string,  // 用户名字[
    userImageSrc: string, // 用户图片地址
    likeSize: number,// 点赞数目
    time: number,   // 时间搓
    content: string,  // 评论内容
    deleteShow: boolean, // 是否可以删除
    child?: ViewComment[]  // 回复,
    type: COMMENTS_TYPE,
    likeState: boolean,
    upload: boolean, // 上传状态--针对新加的评论

}

// 视频卡片
export interface VideoCard {
    id: number, // 视频id,
    userId: number,// 用户id,
    videoId: number,// 视频，
    videoImage: number, // 视频图片
    videoSrc: string, // 视频播放地址
    videoTime: number, // 视频时长
    time: number,// 历史观看时间,
    title: string, // 标题
}

export enum COMMENTS_TYPE {
    VIDEO = "VIDEO",// 对视频的评论
    VIDEO_REPLY = "VIDEO_REPLY", //视频中的回复的回复
    VIDEO_REFUTATION = "VIDEO_REFUTATION", //视频中的回复的回怼
    DELETE = "DELETE",// 删除
    DYNAMIC = "DYNAMIC", // 动态中的回复
    DYNAMIC_REPLY = "DYNAMIC_REPLY", // 动态中的回复的回复
}

// 消息页面 类型
export enum MSG_HEAD_TYPE {
    REPLY = "回复我的",
    REPLY_VIDE = "回复了我的视频",
    REPLY_COMMENTS = "回复了我的评论",
    COLLECTION = "视频收藏",
    LIKE = "收到的赞",
    LIKE_VIDE = "点赞了视频",
    LIKE_COMMENTS = "点赞了评论",
    NOTICE = "广播通知",
}

export interface MsgCard {
    id: number, // 消息id,
    imageShow: boolean,// 消息：类型，
    commentShow: boolean
    userName: string, // 用户的名字
    userComment: string,// 用户的评论
    myComment: string, // 我的评论内容
    time: number,// 消息时间
    videoImageSrc: string,// 图片路径
    // videId?:number,// 视频id-- 给以后跳转视频yo


}



export interface ViewVideoCard {
    videoId: number, // 视频id
    userSomeone: number, // 粉丝数量 TODO
    userVideoSize: number,// 视频数量 TODO
    concern: boolean, // 关注状态

    userId: number, // user的id

    userImage: string, // 用户的头像
    videoSrc: string,
    brief: string, // 简介
    title: string, // 标题
    userName: string, // 作者名字
    lastTime: number, // 上次播放的时间 TODO--存本地
    playback: number,// 播放量
    viewSize: number,// 正在观看人数
    label: string, // 标签   --
    barrage: BulletOption[] // 弹幕  TODO
    likeState: boolean, // 点赞状态        ---
    noLikeState: boolean, // 点踩状态 TODO
    collectionState: boolean, // 收藏状态
    sparkleState: boolean, // 点火状态
    likeSize: number, // 点赞数
    collectionSize: number,// 收藏数量
    heatSize: number, // 热度数
    forwardSize: number,//  转发数量 TODO
    recommend: HomeViewCard[] // 推荐
    comment: CommentsData[]
    date: number


}




export interface ViewSpaceComment {
    id: number,// 评论id
    upUserId: number, // 评论的用户id

}

export enum SPACE_TYPE {  // 动态类型
    VIDEO = 'VIDEO',
    SHOW = 'SHOW'
}

export interface ViewSpaceCard {  // 动态卡片
    spaceId: number, // 动态id
    type: string,//  video  视频动态| show  所说
    videoId: number,  // 视频id
    upId: number, // 用户id
    upImageSrc: string, // 用户路径
    showImageList: string[] // 说说的路径配图地址
    title: string,//  说说标题
    commentList: Comments[], // 评论列表
    upName: string,
    data: number,  //发布日期
    videoImagSrc: string // 视频封面
}

//
export interface ViewUserConcern {

    userId: number // 用户id
    userName: string // 用户名字
    userImageSrc: string   // 用户动态
    userBrief: string // 用户简介
    concernStart: boolean // 关注状态
}






export enum MESSAGE_TYPE {
    VIDEO_LIKE = 'VIDEO_LIKE',  // 视频点赞
    VIDEO_COMMENTS = "VIDEO_COMMENTS", // 视频评论
    VIDEO_COLLECTION = "VIDEO_COLLECTION", //  视频收藏

    COMMENTS_LIKE = "COMMENTS_LIKE", // 评论点赞
    COMMENTS_REPLY = "COMMENTS_REPLY", // 评论回复

    SPACE_COMMENTS = "SPACE_COMMENTS",// 动态回复

}


export interface ViewMessage {
    id: number, // 消息id,
    type: string
    userName: "初音未来", // 用户的名字
    userComment: "你好",// 用户的评论
    userImageSrc: string,  // 用户头像
    myComment: "收到", // 我的评论内容
    time: number,// 消息时间
    userId: number,
    videoId: number,
    spaceId: number, // 动态id
    spaceTitle: string, // 动态标题
    videoImageSrc: string,// 图片路径
    view: boolean, // 是否观看了

}


export interface ViewSearchCard {
    videoList: HomeViewCard[] // 视频列表
    userList: ViewUserConcern[]  // 用户列表
}

export enum USER_Role {
    VISITOR = 'VISITOR',
    USER = 'USER',
    ROOT = 'ROOT'
}
