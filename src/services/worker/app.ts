import { DataStore } from '../../lib/storage/data-store';
import { MessageQueue } from '../../lib/messaging/message-queue';
import { StreamingRequestProcessor } from './processors/streaming-request-processor';

export class Application {

    dataStore: DataStore;
    messageQueue: MessageQueue;
    streamingProcessor: StreamingRequestProcessor;

    constructor(options: { dataStore: DataStore, messageQueue: MessageQueue }) {
        this.dataStore = options.dataStore;
        this.messageQueue = options.messageQueue;

        this.streamingProcessor = new StreamingRequestProcessor(options);
    }

}