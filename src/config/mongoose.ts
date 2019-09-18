import { connection } from 'mongoose';
import { MONGODB_URI } from '../util/secrets';

const connectDB = () => {
	return connection.openUri(MONGODB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});
};

export default connectDB;
