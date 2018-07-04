import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DataStore } from '../../lib/storage/data-store';
import { MessageQueue } from '../../lib/messaging/message-queue';
import { AppRouter } from './routers/app.router';

const port = process.env.PORT || 8080;

export class Application {

    app: express.Application;
    dataStore: DataStore;
    messageQueue: MessageQueue;

    constructor(options: { dataStore: DataStore, messageQueue: MessageQueue }) {
        this.app = express();
        
        this.dataStore = options.dataStore;
        this.messageQueue = options.messageQueue;

        
        this.config();

        this.app.listen(port, () => {
            console.log('Express server listening on port ' + port);
        });
    }

    private config() {
        this.app.use(bodyParser.json());

        this.app.use('/', new AppRouter({ dataStore: this.dataStore, messageQueue: this.messageQueue }).router);


        this.messageQueue.processedStreamingRequests.subscribe(message => {
            // publish on socket
            console.log('processed', message);
        });
    }
}

// new Application().app.listen(port, () => {
//     console.log('Express server listening on port ' + port);
// });
