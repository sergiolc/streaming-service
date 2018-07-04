import { Subject } from 'rxjs';
import { Message } from '../models/message.model';

export class MessageQueue {

    streamingRequests: Subject<Message>;
    processedStreamingRequests: Subject<Message>;

    constructor() {

        this.initQueues();
    }

    
    initQueues() {
        this.streamingRequests = new Subject();
        this.processedStreamingRequests = new Subject();
    }
}
