import { Router, Request, Response, NextFunction } from 'express';
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

        this.router.get('/*', (req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
        
            next();            
        });

        this.router.get('/', (req: Request, res: Response) => {
            res.send('Api running');
        });

    }
}
