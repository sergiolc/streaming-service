import { Router } from 'express';
import { DataStore } from '../../../lib/storage/data-store';
import { MessageQueue } from '../../../lib/messaging/message-queue';
import { MainRouter } from './main.router';
import { UsersRouter } from './users.router';
import { VideosRouter } from './videos.router';


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
