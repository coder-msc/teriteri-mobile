

export interface User {
    uid: number,
    nickname: string,
    avatar_url: string,
    bg_url: string,
    gender: number // 性别，0女性 1男性 2无性别，默认2
    description;
    exp: number,    // 经验值 50/200/1500/4500/10800/28800 分别是0~6级的区间
    coin: number,    // 硬币数  保留一位小数
    vip: number,    // 0 普通用户，1 月度大会员，2 季度大会员，3 年度大会员
    state: number,  // 0 正常，1 封禁中
    auth: number,   // 0 普通用户，1 个人认证，2 机构认证
    authMsg: string, // 认证信息，如 teriteri官方账号
    videoCount: number, // 视频投稿数
    followsCount: number,  // 关注数
    fansCount: number,  // 粉丝数
    loveCount: number,  // 获赞数
    playCount: number // 播放数

}

