import { ObjectID } from 'bson';
import { expect } from 'chai';
import { Connection } from 'mongoose';
import connectDB from '../../../../src/config/mongoose';
import IMovieModel from '../../../../src/interfaces/movie/IMovieModel';
import checkIfMovieExists from '../../../../src/models/movie/helpers/checkIfMovieExists';
import Movie from '../../../../src/models/movie/movie';
import dummyMovie from '../../../dummy/dummyMovie';

describe(`Movie's helper function checkIfMovieExists`, () => {
	let mongoDB: Connection;
	let movie: IMovieModel;

	before(async () => {
		mongoDB = await connectDB();
		await Movie.deleteMany({}).exec();
		movie = await new Movie(dummyMovie).save();
	});

	after(async () => {
		await movie.remove();
		await mongoDB.close();
	});

	it('should return true if movie with passed id exists in database', async () => {
		const res = await checkIfMovieExists(movie._id);
		expect(res).to.be.equal(true);
	});

	it('should return false if movie with passed id does not exist in database', async () => {
		const res = await checkIfMovieExists(new ObjectID());
		expect(res).to.be.equal(false);
	});
});
