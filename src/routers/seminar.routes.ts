import { Router } from 'express';
import { postSeminar, getSeminar } from '../controllers/seminar.controller.js';

export const getSeminarRouter = () => {
    const router = Router();

    router.post('/seminar', postSeminar);
    router.get('/seminar', getSeminar);
    return router;
};
