import * as crypto from 'crypto';

export interface StreamData {
    id?: string;
    userId: string;
    videoId: string;
}

export class Stream {

    id: string;
    userId: string;
    videoId: string;

    constructor(data: StreamData) {
        this.id = data.id || crypto.randomBytes(16).toString('hex');
        this.userId = data.userId;
        this.videoId = data.videoId;
    }
}