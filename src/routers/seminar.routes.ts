import { Router } from 'express';
import { postSeminar } from '../controllers/seminar.controller.js';

export const getSeminarRouter = () => {
    const router = Router();

    router.post('/seminar', postSeminar);

    return router;
};
