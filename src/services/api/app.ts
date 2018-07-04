import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as socketIo from 'socket.io';

import { DataStore } from '../../lib/storage/data-store';
import { MessageQueue } from '../../lib/messaging/message-queue';
import { AppRouter } from './routers/app.router';
import { StreamingRequestDispatcher } from './processors/streaming-request-dispatcher';

const port = process.env.PORT || 8080;

export class Application {

    app: express.Application;
    server: http.Server;
    io: SocketIO.Server;
    dataStore: DataStore;
    messageQueue: MessageQueue;
    streamingDispatcher: StreamingRequestDispatcher;

    constructor(options: { dataStore: DataStore, messageQueue: MessageQueue }) {
        this.app = express();

        this.dataStore = options.dataStore;
        this.messageQueue = options.messageQueue;


        this.configApp();
        this.configSocket();
        this.configDispatcher();

    }

    private configApp() {
        this.server = http.createServer(this.app);

        this.app.use(bodyParser.json());

        this.app.use('/', new AppRouter({ dataStore: this.dataStore, messageQueue: this.messageQueue }).router);

        this.server.listen(port, () => {
            console.log('Express server listening on port ' + port);
        });

    }

    private configSocket() {
        this.io = socketIo(this.server);

        this.io.on('connect', (socket: any) => {
            console.log('Socket client connected on port %s.', port);

            socket.on('message', (message) => {
                console.log('Client message: %s', JSON.stringify(message));
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    private configDispatcher() {
        this.streamingDispatcher = new StreamingRequestDispatcher({ messageQueue: this.messageQueue, io: this.io });
    }
}

// new Application().app.listen(port, () => {
//     console.log('Express server listening on port ' + port);
// });
