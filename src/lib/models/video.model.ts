import * as crypto from 'crypto';

export interface VideoData {
    id?: string;
    title: string;
    url: string;
}

export class Video {
    
    id: string;
    title: string;
    url: string;

    constructor(data: VideoData) {
        this.id = data.id || crypto.randomBytes(16).toString('hex');
        this.title = data.title;
        this.url = data.url;
    }

}