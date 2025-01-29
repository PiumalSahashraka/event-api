import { findAllSeminar } from '../services/seminar.service.js';
import { Request, Response } from 'express';

export const homeController = async (req: Request, res: Response): Promise<void> => {
    const today = new Date().toISOString().split('T')[0];
    const last7Days: string[] = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        last7Days.push(date.toISOString().split('T')[0]);
    }

    try {
        const seminars = await findAllSeminar();
        const trendingSeminars = seminars
            .map((seminar) => {
                const last7DayClicks = last7Days.reduce((sum, date) => {
                    return sum + (seminar.dailyClicks.get(date) || 0);
                }, 0);

                return {
                    ...seminar.toObject(),
                    last7DayClicks,
                };
            })
            .filter((seminar) => seminar.last7DayClicks > 0)
            .sort((a, b) => b.last7DayClicks - a.last7DayClicks)
            .slice(0, 10);

        res.status(200).json({
            message: 'Success',
            data: trendingSeminars,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Server Error',
            message: 'There was an error retrieving the data',
        });
    }
};
