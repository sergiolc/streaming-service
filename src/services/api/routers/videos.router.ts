import { Router } from 'express';
import { DataStore } from '../../../storage/data-store';
import { VideosController } from '../controllers/videos.controller';
import { MessageQueue } from '../../../messaging/message-queue';

export class VideosRouter {

    dataStore: DataStore;
    messageQueue: MessageQueue;
    videosController: VideosController;
    router: Router;

    constructor(options: { dataStore: DataStore, messageQueue: MessageQueue }) {
        this.dataStore = options.dataStore;
        this.messageQueue = options.messageQueue;

        this.videosController = new VideosController({ dataStore: this.dataStore, messageQueue: this.messageQueue });

        this.configRoutes();
    }

    configRoutes() {

        this.router = new Router();

        this.router.route('/')
            .get(this.videosController.list.bind(this));

        this.router.route('/:videoId')
            .get(this.videosController.get.bind(this));

        this.router.route('/:videoId/request/')
            .get(this.videosController.requestStream.bind(this));

    }
}
