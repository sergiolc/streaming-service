import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DataStore } from '../../storage/data-store';
import { AppRouter } from './routers/app.router';

const port = process.env.PORT || 8080;

export class Application {

    app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config() {
        this.app.use(bodyParser.json());

        this.app.use('/', new AppRouter({ dataStore: new DataStore() }).router);
    }
}


new Application().app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
