import { Response, NextFunction } from 'express';
import { IAuthenticateRequest } from '../interfaces/authenticate.interface.js';
import jwt from 'jsonwebtoken';
import config from '../config/env-config.js';

export const authMiddlware = (req: IAuthenticateRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({
            error: 'Access denied',
            message: 'No token, authorization denied.',
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as { username: string; email: string };

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            error: 'Access denied',
            message: 'Token is not valid.',
        });
        return;
    }
};
