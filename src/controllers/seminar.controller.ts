import { Request, Response } from 'express';
import { createSeminar } from '../services/user.service.js';
import { ISeminarData } from '../interfaces/seminar.interface.js';

// Helper function for validate strings
const validateString = (field: any): boolean => typeof field === 'string' && field.trim() !== '';

export const postSeminar = async (req: Request, res: Response): Promise<void> => {
    const { title, description, date } = req.body;

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
            message: 'The date is required and must be a valid date string',
        });
        return;
    }
    const seminarData: ISeminarData = {
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
        res.status(500).json({
            error: 'Server Error',
            message: 'There was an error creating the seminar',
        });
        return;
    }
};
