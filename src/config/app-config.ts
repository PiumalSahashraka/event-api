import express, { Application, Response, Request } from 'express';
import morgan from 'morgan';
import config from './env-config.js';
import { getSeminarRouter } from '../routers/seminar.routes.js';

export const configureApp = (): Application => {
    const app: Application = express();

    //region settings
    app.set('port', config.Port);

    // print dev console
    app.use(morgan('dev'));

    app.use(express.json()); //To let the application understand data in JSON
    app.use(express.urlencoded({ extended: true })); //To encode the data that is comming in Request.body

    app.use('/api', getSeminarRouter());

    app.use('/', (req: Request, res: Response) => {
        res.send('Hello, this is seminar API');
    });

    return app;
};

export default configureApp;
