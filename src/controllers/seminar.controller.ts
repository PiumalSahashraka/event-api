import { NextFunction, Request, Response } from 'express';
import { createSeminar, findSeminar } from '../services/seminar.service.js';
import { ISeminarData } from '../interfaces/seminar.interface.js';
import { validateString, isValidDate } from '../utils/validateData.js';
import { IAuthenticateRequest } from '../interfaces/authenticate.interface.js';

export const postSeminar = async (req: IAuthenticateRequest, res: Response, next: NextFunction): Promise<void> => {
    const { title, description, date } = req.body;
    const user = req.user;
    if (!user) {
        res.status(400).json({
            error: 'User not found',
            message: 'User not found.',
        });
    }

    //validate title
    if (!validateString(title)) {
        res.status(400).json({
            error: 'Invalid Data',
            message: 'The title is required and must be a string',
        });
        return;
    }

    //validate description
    if (!validateString(description)) {
        res.status(400).json({
            error: 'Invalid Data',
            message: 'The description is required and must be a string',
        });
        return;
    }

    //validate date
    if (!validateString(date)) {
        res.status(400).json({
            error: 'Invalid Data',
            message: 'The date is required and must be a string',
        });
        return;
    }

    if (!isValidDate(date)) {
        res.status(400).json({
            error: 'Invalid Data',
            message: 'The date is required and must be a valid date string format - YYYY-MM-DD',
        });
        return;
    }
    const seminarData: ISeminarData = {
        author: user?.username || 'Unknown',
        title: title,
        description: description,
        date: date,
    };
    try {
        await createSeminar(seminarData);
        res.status(201).json({
            message: 'Seminar created successfully',
            data: seminarData,
        });
        return;
    } catch (error) {
        next(error);
        return;
    }
};

export const getSeminar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const page = parseInt(req.query.page as string) - 1 || 0;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';

    try {
        const seminar = await findSeminar(page, limit, search);

        // check if seminar is null
        if (seminar === null || (Array.isArray(seminar) && seminar.length === 0)) {
            res.status(404).json({
                error: 'Not found',
                message: 'Seminar not found',
            });
            return;
        }

        res.status(200).json({
            message: 'Seminar retrieved successfully',
            data: seminar,
        });
    } catch (error) {
        next(error);
    }
};

export const getSeminarById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id;

    try {
        const seminar = await findSeminar(0, 10, '', id);
        if (seminar == null) {
            res.status(404).json({
                error: 'Not found',
                message: 'Seminar not found',
            });
            return;
        } else {
            res.status(200).json({
                message: 'Seminar retrieved successfully',
                data: seminar,
            });
        }
    } catch (error) {
        next(error);
    }
};
