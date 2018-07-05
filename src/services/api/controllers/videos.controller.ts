import { Request, Response } from 'express';
import { DataStore } from '../../../lib/storage/data-store';
import { MessageQueue } from '../../../lib/messaging/message-queue';


export class VideosController {

    dataStore: DataStore;
    messageQueue: MessageQueue;

    constructor(options: { dataStore: DataStore, messageQueue: MessageQueue }) {
        this.dataStore = options.dataStore;
        this.messageQueue = options.messageQueue;
    }

    get(req: Request, res: Response) {

        const video = this.dataStore.videos.get(req.params.videoId);

        if (!video) {
            return res.sendStatus(404);
        }

        res.send(video);
    }

    list(req: Request, res: Response) {

        const videos = Array.from(this.dataStore.videos.values());

        res.send(videos);
    }

    requestStream(req: Request, res: Response) {

        const streamingRequest = {
            status: 'pending',
            data: {
                videoId: req.params.videoId,
                userId: req.query.user // Using query params for simplicity (should retrieve user from access token)
            }
        };

        res.send({ message: 'Streaming request created.', data: streamingRequest });

        this.messageQueue.streamingRequests.next(streamingRequest);

    }

    stopStream(req: Request, res: Response) {

        const stream = Array.from(this.dataStore.streams.values())
            .find(item => item.videoId === req.params.videoId && item.userId === req.query.user);

        if (stream) {
            this.dataStore.streams.delete(stream.id);
        }

        res.sendStatus(204);
    }

    stopAllStreams(req: Request, res: Response) {

        Array.from(this.dataStore.streams.values())
            .filter(stream => stream.userId === req.query.user)
            .forEach(stream => {
                this.dataStore.streams.delete(stream.id);
            });

        res.sendStatus(204);
    }

}
