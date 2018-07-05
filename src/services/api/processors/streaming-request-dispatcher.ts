import { MessageQueue } from '../../../lib/messaging/message-queue';

export class StreamingRequestDispatcher {

    messageQueue: MessageQueue;
    io: SocketIO.Server;

    constructor(options: { messageQueue: MessageQueue, io: SocketIO.Server }) {
        this.messageQueue = options.messageQueue;
        this.io = options.io;

        this.config();
    }

    config() {

        this.messageQueue.processedStreamingRequests.subscribe(message => {
            this.io.emit('message', message);
        });

    }

}