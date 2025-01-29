import express, { Application, Response, Request } from 'express';
import morgan from 'morgan';
import config from './env-config.js';
import { getSeminarRouter } from '../routers/seminar.routes.js';
import { homeController } from '../controllers/home.controller.js';

export const configureApp = (): Application => {
    const app: Application = express();

    //region settings
    app.set('port', config.Port);

    // print dev console
    app.use(morgan('dev'));

    app.use(express.json()); //To let the application understand data in JSON
    app.use(express.urlencoded({ extended: true })); //To encode the data that is comming in Request.body

    app.use('/api', getSeminarRouter());

    app.use('/', homeController);

    return app;
};

export default configureApp;
