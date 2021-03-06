import { User } from '../models/user.model';
import { Video } from '../models/video.model';
import { Stream } from '../models/stream.model';


export class DataStore {

    users: Map<string, User>;
    videos: Map<string, Video>;
    streams: Map<string, Stream>;

    constructor() {
        this.users = new Map();
        this.videos = new Map();
        this.streams = new Map();

        this.initStorage();
    }

    
    initStorage() {

        this.users.set('1', new User({ id: '1', name: 'user1', limit: 3 }));
        this.users.set('2', new User({ id: '2', name: 'user2', limit: 4 }));
        this.users.set('3', new User({ id: '3', name: 'user3', limit: 3 }));

        this.videos.set('1', new Video({ id: '1', title: 'video1', url: '/assets/video1.mp4' }));
        this.videos.set('2', new Video({ id: '2', title: 'video2', url: '/assets/video2.mp4' }));
        this.videos.set('3', new Video({ id: '3', title: 'video3', url: '/assets/video3.mp4' }));
        this.videos.set('4', new Video({ id: '4', title: 'video4', url: '/assets/video4.mp4' }));
        this.videos.set('5', new Video({ id: '5', title: 'video5', url: '/assets/video5.mp4' }));
        this.videos.set('6', new Video({ id: '6', title: 'video6', url: '/assets/video6.mp4' }));

        // this.streams.set('1', new Stream({ id: '1', userId: '1', videoId: '1' }));
    }
}
