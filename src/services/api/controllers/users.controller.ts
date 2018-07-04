import { Request, Response } from 'express';
import { DataStore } from '../../../lib/storage/data-store';


export class UsersController {

    dataStore: DataStore;

    constructor(options: { dataStore: DataStore }) {
        this.dataStore = options.dataStore;
    }

    get(req: Request, res: Response) {

        const user = this.dataStore.users.get(req.params.userId);

        if (!user) {
            return res.sendStatus(404);
        }

        res.send(user);
    }

    list(req: Request, res: Response) {

        const users = Array.from(this.dataStore.users.values());

        res.send(users);
    }

}
