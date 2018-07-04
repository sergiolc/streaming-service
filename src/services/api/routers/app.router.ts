import { Router } from 'express';
import { DataStore } from '../../../storage/data-store';
import { MainRouter } from './main.router';
import { UsersRouter } from './users.router';
import { VideosRouter } from './videos.router';


export class AppRouter {

    dataStore: DataStore;
    router: Router;

    constructor(options: { dataStore: DataStore }) {
        this.dataStore = options.dataStore;

        this.configRoutes();
    }

    configRoutes() {
        this.router = new Router();

        this.router.use('/', new MainRouter({ dataStore: this.dataStore }).router);
        this.router.use('/users', new UsersRouter({ dataStore: this.dataStore }).router);
        this.router.use('/videos', new VideosRouter({ dataStore: this.dataStore }).router);
    }

}
