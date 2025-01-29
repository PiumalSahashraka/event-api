import { ISeminarData } from '../interfaces/seminar.interface.js';
import Seminar, { ISeminar } from '../models/seminar.js';

export const createSeminar = async (seminarData: ISeminarData): Promise<ISeminar> => {
    try {
        // Creates a new seminar
        const newSeminar = new Seminar(seminarData);
        return await newSeminar.save();
    } catch (error) {
        throw new Error('Error when creating seminar: ' + error);
    }
};

export const findSeminar = async (page: number, limit: number, search: string): Promise<ISeminar[]> => {
    try {
        // Find seminar by id
        const seminar = await Seminar.find({ title: { $regex: search, $options: 'i' } })
            .skip(page * limit)
            .limit(limit);
        return seminar;
    } catch (error) {
        throw new Error('Error when finding seminar: ' + error);
    }
};
