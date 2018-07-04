import { Request, Response } from 'express';
import { DataStore } from '../../../storage/data-store';


export class StreamsController {

    dataStore: DataStore;

    constructor(options: { dataStore: DataStore }) {
        this.dataStore = options.dataStore;
    }

    getByUser(req: Request, res: Response) {

        const streams = Array.from(this.dataStore.streams.values())
            .filter(stream => stream.userId === req.params.userId);

        res.send(streams);
    }

}
