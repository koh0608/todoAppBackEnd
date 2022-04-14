import dotenv from 'dotenv';
dotenv.config();

import { splitStringToArray } from '@utils';

export const port = process.env.PORT;
export const appName = process.env.APP_NAME;
export const isProduction = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';
export const origins = splitStringToArray(process.env.ORIGINS, ',') || [];
