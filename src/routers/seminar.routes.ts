import { Router } from 'express';
import { postSeminar, getSeminar, getSeminarById } from '../controllers/seminar.controller.js';

export const getSeminarRouter = () => {
    const router = Router();

    router.post('/seminar', postSeminar);
    router.get('/seminar', getSeminar);
    router.get('/seminar/:id', getSeminarById);
    return router;
};
