import { Request } from 'express';

export interface IAuthenticateRequest extends Request {
    user?: { username: string; email: string };
}
