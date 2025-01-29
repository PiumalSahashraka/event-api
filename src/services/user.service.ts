import { ISeminarData } from '../interfaces/seminar.interface.js';
import Seminar, { ISeminar } from '../models/seminar.js';
import { fuzzySearch } from '../utils/fuzzySearch.js';

export const createSeminar = async (seminarData: ISeminarData): Promise<ISeminar> => {
    try {
        // Creates a new seminar
        const newSeminar = new Seminar(seminarData);
        return await newSeminar.save();
    } catch (error) {
        throw new Error('Error when creating seminar: ' + error);
    }
};

export const findSeminar = async (page: number, limit: number, query: string): Promise<ISeminar[]> => {
    try {
        // Find seminar by id
        const seminar = await Seminar.find();
        if (query === '') {
            return seminar.slice(page * limit, (page + 1) * limit);
        }
        const result = fuzzySearch(seminar, query);
        return result.slice(page * limit, (page + 1) * limit);
    } catch (error) {
        throw new Error('Error when finding seminar: ' + error);
    }
};
