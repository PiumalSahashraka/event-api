import { Schema, model, Document } from 'mongoose';

export interface ISeminar extends Document {
    author: string;
    title: string;
    description: string;
    date: Date;
    clicks: number;
    dailyClicks: Map<string, number>;
    impressions: number;
    accepted: boolean;
}

const seminarSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    impressions: {
        type: Number,
        default: 0,
    },
    dailyClicks: {
        type: Map,
        of: Number,
        default: {},
    },
    accepted: {
        type: Boolean,
        required: true,
        default: false,
    },
});

export default model<ISeminar>('Seminar', seminarSchema);
