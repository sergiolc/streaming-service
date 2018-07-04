import { Subject } from 'rxjs';

export class MessageQueue {

    streamingRequests: Subject<any>;
    processedStreamingRequests: Subject<any>;

    constructor() {

        this.initQueues();
    }

    
    initQueues() {
        this.streamingRequests = new Subject();
        this.processedStreamingRequests = new Subject();
    }
}
