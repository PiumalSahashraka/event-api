import { Router } from 'express';
import { postUser, loginUser } from '../controllers/user.controller.js';

export const getUserRouter = () => {
    const router = Router();

    router.post('/users/register', postUser);
    router.get('/users/login', loginUser);
    return router;
};
