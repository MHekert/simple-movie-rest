import { expect } from 'chai';
import { Connection } from 'mongoose';
import connectDB from '../../src/config/mongoose';

let mongoDB: Connection;

describe('mongoose config', () => {
	after(async () => await mongoDB.close());

	it('should allow to correctly connect to MongoDB ', async () => {
		mongoDB = await connectDB();
		expect(mongoDB).to.be.a('object');
	});
});
