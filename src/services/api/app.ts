import * as express from 'express';
import * as bodyParser from 'body-parser';

const port = process.env.PORT || 8080;

export class Application {

    app: express.Application;

    constructor() {
        this.app = express();
        this.config();        
    }

    private config() {
        this.app.use(bodyParser.json());

        // this.app.set('dataStore', dataStore());
        
        
        // this.app.use('/', routes(app));
                
        this.app.get('/', (req, res, next) => {
        
            res.sendStatus(404);
        });
        
    }
}


new Application().app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
