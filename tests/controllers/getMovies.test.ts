import { expect, request } from 'chai';
import connectDB from '../../src/config/mongoose';
import getMovies from '../../src/controllers/getMovies';
import IMovieModel from '../../src/interfaces/IMovieModel';
import Movie from '../../src/models/movie/movie';
import { PORT } from '../../src/util/secrets';
import dummyMultipleMovies from '../dummy/dummyMultipleMovies';
import app from '../dummy/serverSetup';

describe('getMovies middleware', () => {
	let server: any;
	let mongoDB: any;
	let movies: IMovieModel[];

	before(async () => {
		app.get('/movies/:limit?/:skip?', getMovies);
		server = await app.listen(PORT);
		mongoDB = await connectDB();
		await Movie.deleteMany({});
		movies = await Promise.all(dummyMultipleMovies.map(async el => await new Movie(el).save()));
	});

	after(async () => {
		await Movie.deleteMany({});
		return Promise.all([server.close(), mongoDB.close()]);
	});

	it('should return array of 3 objects when no limit or skip specified', async () => {
		const res = await request(app).get('/movies');
		expect(res).to.have.status(200);
		expect(res.body)
			.to.be.an('array')
			.and.to.have.lengthOf(3);
	});

	it('should return array of 1 containing first element when limit 1 is specified', async () => {
		const res = await request(app).get('/movies/1');
		expect(res).to.have.status(200);
		expect(res.body)
			.to.be.an('array')
			.and.to.have.lengthOf(1);
		expect(res.body[0].imdbId).to.be.equal(movies[0].imdbId);
	});

	it('should return array containing second object when limit and skip are set to 1', async () => {
		const res = await request(app).get('/movies/1/1');
		expect(res).to.have.status(200);
		expect(res.body)
			.to.be.an('array')
			.and.to.have.lengthOf(1);
		expect(res.body[0].imdbId).to.be.equal(movies[1].imdbId);
	});
});
