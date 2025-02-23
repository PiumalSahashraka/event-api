import { Router } from 'express';
import { postSeminar, getSeminar, getSeminarById } from '../controllers/seminar.controller.js';
import { authMiddlware } from '../middlewares/auth.middleware.js';

export const getSeminarRouter = () => {
    const router = Router();

    router.post('/seminar', authMiddlware, postSeminar);
    router.get('/seminar', getSeminar);
    router.get('/seminar/:id', getSeminarById);
    return router;
};
