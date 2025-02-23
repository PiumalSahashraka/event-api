import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
    code?: number;
    message: string;
    keyValue: Record<string, unknown>;
}

export const errorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);

    if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ error: 'Validation Error', message: err.message });
        return;
    }

    if (err.code === 11000) {
        res.status(400).json({ error: 'Duplicate key error', message: err });
        return;
    }
    res.status(500).json({
        error: 'Internal Server Error',
        message: err,
    });
};
