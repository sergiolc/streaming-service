import { Request, Response } from 'express';
import { DataStore } from '../../../storage/data-store';


export class VideosController {

    dataStore: DataStore;

    constructor(options: { dataStore: DataStore }) {
        this.dataStore = options.dataStore;
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

}
