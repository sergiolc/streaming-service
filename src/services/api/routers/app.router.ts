import { Router } from 'express';
import { DataStore } from '../../../storage/data-store';
import { MainRouter } from './main.router';
import { UsersRouter } from './users.router';
import { VideosRouter } from './videos.router';
import { MessageQueue } from '../../../messaging/message-queue';


export class AppRouter {

    dataStore: DataStore;
    messageQueue: MessageQueue;
    router: Router;

    constructor(options: { dataStore: DataStore, messageQueue: MessageQueue }) {
        this.dataStore = options.dataStore;
        this.messageQueue = options.messageQueue;

        this.configRoutes();
    }

    configRoutes() {
        this.router = new Router();

        this.router.use('/', new MainRouter({ dataStore: this.dataStore }).router);
        this.router.use('/users', new UsersRouter({ dataStore: this.dataStore }).router);
        this.router.use('/videos', new VideosRouter({ dataStore: this.dataStore, messageQueue: this.messageQueue }).router);
    }

}
