import { User } from "@/util/type";
import { Video, VideoStats } from "../video/video";
import { Category } from "../category/category";

export interface HomeInitResponse {
    status: VideoStats;
    category: Category;
    user: User
    video: Video
}