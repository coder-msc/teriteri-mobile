 import { Video, VideoStats } from "../video/video";
import { Category } from "../category/category";
 import {User} from "../user/User";

export interface HomeInitResponse {
    status: VideoStats;
    category: Category;
    user: User
    video: Video
}
