import { Router } from 'express';
import { DataStore } from '../../../lib/storage/data-store';
import { UsersController } from '../controllers/users.controller';
import { StreamsController } from '../controllers/streams.controller';

export class UsersRouter {

    dataStore: DataStore;
    usersController: UsersController;
    streamsController: StreamsController;
    router: Router;

    constructor(options: { dataStore: DataStore }) {
        this.dataStore = options.dataStore;
        this.usersController = new UsersController({ dataStore: this.dataStore });
        this.streamsController = new StreamsController({ dataStore: this.dataStore });

        this.configRoutes();
    }

    configRoutes() {

        this.router = new Router();

        this.router.route('/')
            .get(this.usersController.list.bind(this));

        this.router.route('/:userId')
            .get(this.usersController.get.bind(this));

        this.router.route('/:userId/streams')
            .get(this.streamsController.getByUser.bind(this));

    }
}
