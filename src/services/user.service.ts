import { IUserData } from '../interfaces/user.interface.js';
import User, { IUser } from '../models/user.js';

export const createUser = async (userData: IUserData): Promise<IUser> => {
    try {
        // Creates a new user
        const newUser = new User(userData);
        return await newUser.save();
    } catch (error) {
        throw error;
    }
};

export const findUser = async (username: string): Promise<IUser | null> => {
    try {
        // Finds user by id
        return await User.findOne({ username: username }).select('+password');
    } catch (error) {
        throw new Error('Error when getting user: ' + error);
    }
};

export const findUsers = async (): Promise<IUser[]> => {
    try {
        // Finds all users
        return await User.find();
    } catch (error) {
        throw new Error('Error when getting users: ' + error);
    }
};
