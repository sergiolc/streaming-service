import { Router, Request, Response } from 'express';
import { DataStore } from '../../../lib/storage/data-store';

export class MainRouter {

    dataStore: DataStore;
    router: Router;

    constructor(options: { dataStore: DataStore }) {
        this.dataStore = options.dataStore;

        this.configRoutes();
    }

    configRoutes() {

        this.router = new Router();

        this.router.get('/', (req: Request, res: Response) => {
            res.send('Api running');
        });

    }
}
