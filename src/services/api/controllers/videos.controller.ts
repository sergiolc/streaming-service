import { Request, Response } from 'express';
import { DataStore } from '../../../storage/data-store';
import { MessageQueue } from '../../../messaging/message-queue';


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
            videoId: req.params.videoId,
            userId: req.query.user // Using query params for simplicity (should retrieve user from access token)
        };


        this.messageQueue.streamingRequests.next(streamingRequest);


        res.send({ message: 'Streaming request created.', data: streamingRequest });
    }


}
