import { DataStore } from '../../../lib/storage/data-store';
import { MessageQueue } from '../../../lib/messaging/message-queue';
import { Message } from '../../../lib/models/message.model';
import { Stream } from '../../../lib/models/stream.model';

export class StreamingRequestProcessor {

    dataStore: DataStore;
    messageQueue: MessageQueue;

    constructor(options: { dataStore: DataStore, messageQueue: MessageQueue }) {
        this.dataStore = options.dataStore;
        this.messageQueue = options.messageQueue;

        this.config();
    }

    config() {

        this.messageQueue.streamingRequests.subscribe(message => {
            this.processRequest(message);
        });
    }

    processRequest(message: Message) {

        const streams = Array.from(this.dataStore.streams.values())
            .filter(stream => stream.userId === message.data.userId);

        const limit = this.dataStore.users.get(message.data.userId).limit;

        const processedMessage = { ...message };

        if (streams.length < limit) {
        
            const stream = new Stream({userId: message.data.userId, videoId: message.data.videoId});
            this.dataStore.streams.set(stream.id, stream);
            processedMessage.status = 'allowed';
        
        } else {
        
            processedMessage.status = 'denied';
        }

        
        this.messageQueue.processedStreamingRequests.next(processedMessage);

    }
}