import { Router } from 'express';
import { DataStore } from '../../../storage/data-store';
import { VideosController } from '../controllers/videos.controller';

export class VideosRouter {

    dataStore: DataStore;
    router: Router;
    videosController: VideosController;

    constructor(options: { dataStore: DataStore }) {
        this.dataStore = options.dataStore;
        this.videosController = new VideosController({ dataStore: this.dataStore });

        this.configRoutes();
    }

    configRoutes() {

        this.router = new Router();

        this.router.route('/')
            .get(this.videosController.list.bind(this));

        this.router.route('/:videoId')
            .get(this.videosController.get.bind(this));

    }
}
