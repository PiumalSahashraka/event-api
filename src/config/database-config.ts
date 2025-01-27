import mongoose from 'mongoose';
import config from './env-config.js';

const connectToDatabase = async () => {
    const mongoDB = config.DBConnectionString;

    await mongoose
        .connect(mongoDB)
        .then(() => console.log('database connected.'))
        .catch((error) => console.error('DB connection ERROR:', error));
};

export { connectToDatabase };
