import { connection } from 'mongoose';
import { MONGODB_URI, MONGODB_URI_TEST } from '../util/secrets';

const connectDB = (options = { test: true }) => {
	const mongoUri = options.test ? MONGODB_URI_TEST : MONGODB_URI;
	return connection.openUri(mongoUri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});
};

export default connectDB;
