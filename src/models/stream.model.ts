import { User } from './user.model';
import { Video } from './video.model';

export interface StreamData {
    id: string;
    user: User;
    video: Video;
}

export class Stream {

    id: string;
    userId: string;
    videoId: string;

    constructor(data: StreamData) {
        this.id = data.id;
        this.userId = data.user.id;
        this.videoId = data.video.id;
    }
}