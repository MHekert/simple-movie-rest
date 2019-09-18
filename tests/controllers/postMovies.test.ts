import { expect, request } from 'chai';
import { Server } from 'http';
import { cloneDeep, merge } from 'lodash';
import { Connection } from 'mongoose';
import connectDB from '../../src/config/mongoose';
import postMovies from '../../src/controllers/postMovies';
import Movie from '../../src/models/movie/movie';
import { PORT } from '../../src/util/secrets';
import dummyMovie from '../dummy/dummyMovie';
import dummyUserMovie from '../dummy/dummyUserMovie';
import app from '../dummy/serverSetup';

describe('postMovies middleware', () => {
	let server: Server;
	let mongoDB: Promise<Connection>;

	before(async () => {
		app.post('/movies', postMovies);
		server = app.listen(PORT);
		mongoDB = connectDB();
		return Promise.all([server, mongoDB]);
	});

	after(async () => {
		await Movie.deleteMany({});
		return Promise.all([server.close(), (await mongoDB).close()]);
	});

	beforeEach(async () => Movie.deleteMany({}));

	it('should return object passed by user with extra details from omdb', async () => {
		const res = await request(app)
			.post('/movies')
			.set('content-type', 'application/json')
			.send(dummyUserMovie);
		const { id, ...movie } = res.body;
		expect(res).have.status(201);
		expect(res.body).to.be.an('object');
		expect(movie).to.be.deep.equal(merge(cloneDeep(dummyMovie), dummyUserMovie));
	});

	it('should return status code 404 if no details fetched from omdb', async () => {
		const res = await request(app)
			.post('/movies')
			.set('content-type', 'application/json')
			.send({ imdbId: 'qwe' });
		expect(res).have.status(404);
		expect(res.body).to.be.deep.equal({ code: 404, message: 'Movie does not exists' });
	});
});
