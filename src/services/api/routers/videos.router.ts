import { Router } from 'express';
import { DataStore } from '../../../lib/storage/data-store';
import { MessageQueue } from '../../../lib/messaging/message-queue';
import { VideosController } from '../controllers/videos.controller';

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

        this.router.route('/stop/')
            .get(this.videosController.stopAllStreams.bind(this));

            this.router.route('/:videoId')
            .get(this.videosController.get.bind(this));

        this.router.route('/:videoId/request/')
            .get(this.videosController.requestStream.bind(this));

        this.router.route('/:videoId/stop/')
            .get(this.videosController.stopStream.bind(this));

    }
}
