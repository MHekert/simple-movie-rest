import dotenv from 'dotenv';
import { existsSync } from 'fs';

if (existsSync('.env')) dotenv.config({ path: '.env' });

export const NODE_ENV = process.env['NODE_ENV'] || 'development';
export const MONGODB_URI = process.env['MONGODB_URI'];
export const MONGODB_URI_TEST = process.env['MONGODB_URI_TEST'];
export const PORT = process.env['PORT'];
export const OMDBAPI_KEY = process.env['OMDBAPI_KEY'];
