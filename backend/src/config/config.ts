import dotenv from 'dotenv';
dotenv.config();

export const config = {
    BASE_URL: process.env.BASE_URL ,
    PORT: process.env.PORT ,
    MONGODB_URI: process.env.MONGODB_URI
};
