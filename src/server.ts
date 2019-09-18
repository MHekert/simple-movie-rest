import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/mongoose';
import router from './router';
import { PORT } from './util/secrets';

const app = express();
app.use(cors());
connectDB({ test: false });
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(router);
app.listen(PORT);
