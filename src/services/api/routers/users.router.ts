import { Router } from 'express';
import { DataStore } from '../../../storage/data-store';

export class UsersRouter {

    dataStore: DataStore;
    router: Router;

    constructor(options: { dataStore: DataStore }) {
        this.dataStore = options.dataStore;

        this.configRoutes();
    }

    configRoutes() {

        this.router = new Router();

        // this.router.route('/:userId/streams')
        //     .get((req, res) => {

        //         const count = this.dataStore.get(req.params.userId) || 0;
        //         const status = count <= 3 ? 'OK' : 'NOT_ALLOWED';

        //         res.send({ status: status, count: count });
        //     })
        //     .post((req, res) => {

        //         let count = this.dataStore.get(req.params.userId) || 0;
        //         this.dataStore.set(req.params.userId, ++count);

        //         res.send({ count: count });
        //     })
        //     .put((req, res) => {

        //         this.dataStore.set(req.params.userId, req.body.count);

        //         res.send({ count: req.body.count });
        //     })
        //     .delete((req, res) => {

        //         let count = this.dataStore.get(req.params.userId) || 0;
        //         if (count > 0) {
        //             this.dataStore.set(req.params.userId, --count);
        //         }

        //         res.send({ count: count });
        //     });

    }
}
