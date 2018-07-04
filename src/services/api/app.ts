import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DataStore } from '../../storage/data-store';
import { AppRouter } from './routers/app.router';
import { MessageQueue } from '../../messaging/message-queue';

const port = process.env.PORT || 8080;

export class Application {

    app: express.Application;
    dataStore: DataStore;
    messageQueue: MessageQueue;

    constructor() {
        this.app = express();
        this.dataStore = new DataStore();
        this.messageQueue = new MessageQueue();

        this.config();
    }

    private config() {
        this.app.use(bodyParser.json());

        this.app.use('/', new AppRouter({ dataStore: this.dataStore, messageQueue: this.messageQueue }).router);


        this.messageQueue.processedStreamingRequests.subscribe(data => {
            // publish on socket
            console.log(data);
        });
    }
}


new Application().app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
