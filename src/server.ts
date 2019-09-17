import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/mongoose';
import router from './router';
import { PORT } from './util/secrets';

const port = PORT;
const app = express();

connectDB();
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(router);
app.listen(port);
