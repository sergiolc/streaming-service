import { User } from './user.model';
import { Video } from './video.model';

export class VideoStream {
    
    userId: string;
    videoId: string;

    constructor(user: User, video: Video) {
        this.userId = user.id;
        this.videoId = video.id;
    }
}