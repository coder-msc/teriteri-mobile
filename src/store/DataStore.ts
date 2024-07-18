import {ref} from "vue";
import {Comments, ViewComment, ViewMessage} from "../util/type";

/**
 * 状态数据管理--跨页面  解决 pinia 失效的问题
 */
const emojiTemp:string[]=[
    '😀','😁','😂','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😗','😙','😚','😇','😐','😑','😶'
    ,'😏','😣','😥','😮','😯','😪','😫','😴','😌','😛','😜','😝','😒','😓','😔','😕','😲','😷','😖','😞',
    '😟','😤','😢','😭','😦','😧','😨','😬','😰','😱','😳','😵','😡','😠','💘','❤','💓','💔','💕','💖',
    '💗','💙','💚','💛','💜','💝','💞','💟','❣','💪','👈','👉','☝','👆','👇','✌','✋','👌','👍','👎',
    '✊','👊','👋','👏','👐','✍','🍇','🍈','🍉','🍊','🍋','🍌','🍍','🍎','🍏','🍐','🍑','🍒','🍓',
    '🍅','🍆','🌽','🍄','🌰','🍞','🍖','🍗','🍔','🍟','🍕','🍳','🍲','🍱','🍘','🍙','🍚','🍛','🍜',
    '🍝','🍠','🍢','🍣','🍤','🍥','🍡','🍦','🍧','🍨','🍩','🍪','🎂','🍰','🍫','🍬','🍭','🍮','🍯',
    '🍼','☕','🍵','🍶','🍷','🍸','🍹','🍺','🍻','🍴','🌹','🍀','🍎','💰','📱','🌙','🍁','🍂','🍃',
    '🌷','💎','🔪','🔫','🏀','⚽','⚡','👄','👍','🔥','🙈','🙉','🙊','🐵','🐒','🐶','🐕','🐩','🐺',
    '🐱','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🐈','🐯','🐅','🐆','🐴','🐎','🐮','🐂','🐃',
    '🐄','🐷','🐖','🐗','🐽','🐏','🐑','🐐','🐪','🐫','🐘','🐭','🐁','🐀','🐹','🐰','🐇','🐻','🐨',
    '🐼','🐾','🐔','🐓','🐣','🐤','🐥','🐦','🐧','🐸','🐊','🐢','🐍','🐲','🐉','🐳','🐋','🐬','🐟',
    '🐠','🐙','🐚','🐌','🐛','🐜','🐝','🐞','🦋','😈','👿','👺','💀','☠','👻','👽','👾','💣'

]

const DataStore={
    shareShow:ref(false) , // 分享面板是否展示
    commentSectionReplyShow:ref(false) ,// 评论详情控件
    commentRoute:ref<ViewComment>(), // 需要展示的评论-- 暂时舍弃
    emoji:emojiTemp,
    emojiShow:ref(false), // emo表情展示版的控件
    inputCommentTopShow:ref(false)  ,// 展示控件,
    typeShow:ref(0), // 当前显示的页面
    replyObject:ref<ViewComment>() ,//  评论回复对象
    addOrDeleteObject:ref<ViewComment>(), // 新加的对象或者是需要删除的对象
    headObject:ref<ViewComment>(), // 新加的对象或者是需要删除的对象
    addOrDeleteNumber:ref(0), // 添加或删除评论的信号量
    active:ref<number>(0),// 主页tab页面
    viewVideoId:ref<number>(0), //  播放页面需要播放的视频
    routePath:ref(""),//
    ViewCommentArray:ref<ViewComment[]>() ,// 评论数据
    viewVideoShow:ref<boolean>(false), // 播放页面是否显示

    timeOrCollectionTitle:ref<string>('观看历史'), //  页面 数据

    videoSocket:ref<WebSocket>(), // 当前socket服务
    ViewUpUserId:ref<number>(-1), // 当前 视频播放作者的userId,
    ViewUserDynamicId:ref<number>(-1) ,// 当前 ViewUserDynamic 页面需要展示的用户id

    UserSettingVideo:ref<number>(-1),// 当前需要修改的视频数据

    SpaceInputDom:ref(null) , // 动态页面的输入框
    SpaceInputShow:ref<boolean>(false) , // 动态页面的输入框是否显示
    SpaceInputComment:ref<Comments>(null) , // 输入框需要回复的对象
    SpaceInputShowMsg:ref<string>("悄悄地留下足迹") , // 输入框需要回复的对象 // 提示消息

    homeMessageList:ref([]), // 消息卡片
    homeMessageShowSize:ref<number>(0), // 消息个数


    SearchText:ref<string>(""), // 搜索关键词

    yzmText:ref<string>("") // 验证码
}
export const {shareShow}=DataStore
export const {commentSectionReplyShow}=DataStore
export const {commentRoute}=DataStore
export const {emojiShow}=DataStore
export const {emoji}=DataStore
export const {inputCommentTopShow}=DataStore
export const {typeShow}=DataStore
export const {replyObject}=DataStore
export const {addOrDeleteObject}=DataStore
export const {addOrDeleteNumber}=DataStore
export const {headObject}=DataStore
export const {active}=DataStore
export const {viewVideoId}=DataStore
export const {routePath}=DataStore
export const {ViewCommentArray}=DataStore
export const {viewVideoShow}=DataStore
export const {timeOrCollectionTitle}=DataStore
export const {videoSocket}=DataStore
export const {ViewUpUserId}=DataStore
export const {ViewUserDynamicId}=DataStore
export const {UserSettingVideo}=DataStore
export const {SpaceInputDom}=DataStore
export const {SpaceInputShow}=DataStore
export const {SpaceInputComment}=DataStore
export const {SpaceInputShowMsg}=DataStore
export const {homeMessageList}=DataStore
export const {homeMessageShowSize}=DataStore
export const {SearchText}=DataStore
export const {yzmText}=DataStore