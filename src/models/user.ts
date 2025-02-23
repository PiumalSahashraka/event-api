import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

export default model<IUser>('User', userSchema);
