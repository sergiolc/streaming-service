
export interface VideoData {
    id: string;
    title: string;
    url: string;
}

export class Video {
    
    id: string;
    title: string;
    url: string;

    constructor(data: VideoData) {
        this.id = data.id;
        this.title = data.title;
        this.url = data.url;
    }

}