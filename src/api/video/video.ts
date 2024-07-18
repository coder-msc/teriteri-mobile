export interface VideoStats {
    vid: number,
    play: number,
    danmu: number,
    good: number,
    bad: number,
    coin: number,
    collect: number,
    share: number,
    comment: number,
}

export interface Video {
    vid: number,
    uid: number,
    title: string,
    type: number,
    auth: number,
    duration: number,
    mcId: string,
    scId: string,
    descr: string,
    videoUrl: string,
}

export interface HomeViewCard {
    videoId: number, // 视频id
    title: string, // 标题
    userName: string, // 作者名字
    imageSrc: string, // 图片地址
    time: number,// 视频时长
    playback: number,// 播放量
    date: number,// 日期
    reviewMsg: string, // 审核信息  50 个字体
    review: boolean // 审核状态
    showVideo: boolean


}