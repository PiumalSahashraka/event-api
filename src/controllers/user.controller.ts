import { NextFunction, Request, Response } from 'express';
import { createUser, findUser } from '../services/user.service.js';
import { IUserData } from '../interfaces/user.interface.js';
import { validateString } from '../utils/validateData.js';
import config from '../config/env-config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    if (!validateString(username)) {
        res.status(400).json({
            error: 'Invalid Data',
            message: 'The username is required and must be a string',
        });
        return;
    }
    if (!validateString(email)) {
        res.status(400).json({
            error: 'Invalid Data',
            message: 'The email is required and must be a string',
        });
        return;
    }
    if (!validateString(password)) {
        res.status(400).json({
            error: 'Invalid Data',
            message: 'The password is required and must be a string',
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData: IUserData = {
        username,
        email,
        password: hashedPassword,
        isAdmin: false,
    };

    try {
        const user = await createUser(userData);
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            error: 'Invalid data',
            message: 'Username and password are required',
        });
        return;
    }
    try {
        const user = await findUser(username);
        if (!user) {
            res.status(400).json({
                error: 'Invalid username',
                message: 'Username is invalid.',
            });
            return;
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(400).json({
                error: 'Invalid credentials',
                message: 'Password is invalid.',
            });
            return;
        }

        const token = jwt.sign({ username: user.username, email: user.email }, config.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: 'Authenticated succesfully',
            data: {
                username: user.username,
                email: user.email,
                token: token,
            },
        });
    } catch (error) {
        next(error);
    }
};
