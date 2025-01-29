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

export const findSeminar = async (page: number, limit: number, query: string, id: string | null = null): Promise<ISeminar[] | ISeminar | null> => {
    try {
        // Find seminar by id
        if (id) {
            await updateSeminarDailyClicks(id);
            return await Seminar.findById(id);
        }
        const seminar = await Seminar.find();
        if (query === '') {
            return seminar.slice(page * limit, (page + 1) * limit);
        }
        const result = fuzzySearch(seminar, query);
        const slicedSeminar = result.slice(page * limit, (page + 1) * limit);
        return slicedSeminar.map((seminar) => seminar.item);
    } catch (error) {
        throw new Error('Error when finding seminar: ' + error);
    }
};

export const findAllSeminar = async (): Promise<ISeminar[]> => {
    try {
        return await Seminar.find();
    } catch (error) {
        throw new Error('Error when finding all seminars: ' + error);
    }
};

export const updateSeminarDailyClicks = async (id: string): Promise<ISeminar | null> => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const seminar: ISeminar | null = await Seminar.findById(id);
        if (!seminar) {
            return null;
        }
        seminar.dailyClicks.set(today, (seminar.dailyClicks.get(today) || 0) + 1);
        return await seminar.save();
    } catch (error) {
        throw new Error('Error when updating seminar daily clicks: ' + error);
    }
};
