import * as dotenv from 'dotenv';
dotenv.config();

const envValues = Object.freeze({
    Port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    DBConnectionString: process.env.MONGO_URI || 'No connection string provided',
    JWT_SECRET: process.env.JWT_SECRET || 'MYSECRET',
});

export default envValues;
