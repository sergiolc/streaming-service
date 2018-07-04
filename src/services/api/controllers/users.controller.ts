import {Request, Response} from 'express';
import { DataStore } from '../../../storage/data-store';


export class UserController {

    dataStore: DataStore;

    constructor(dataStore: DataStore) {
        this.dataStore = dataStore;
    }

    get(req: Request, res: Response) {

        const user = this.dataStore.users.get(req.params.userId);

        if (!user) {
            return res.sendStatus(404);
        }

        res.send(user);
    }
}
