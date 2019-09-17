import dotenv from 'dotenv';
import { existsSync } from 'fs';

if (existsSync('.env')) dotenv.config({ path: '.env' });

export const NODE_ENV = process.env['NODE_ENV'] || 'development';
export const MONGODB_URI = process.env['MONGODB_URI'];
export const PORT = process.env['PORT'];
