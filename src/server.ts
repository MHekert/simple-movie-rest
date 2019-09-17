import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/mongoose';
import { PORT } from './util/secrets';

const port = PORT || 8080;
const app = express();

app.use(helmet());
app.use(morgan('tiny'));

connectDB();

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.listen(port);
