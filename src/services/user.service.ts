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
