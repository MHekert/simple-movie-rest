import { ObjectID } from 'bson';
import { expect, request } from 'chai';
import { Server } from 'http';
import { Connection } from 'mongoose';
import connectDB from '../../src/config/mongoose';
import postComments from '../../src/controllers/postComments';
import IMovieModel from '../../src/interfaces/movie/IMovieModel';
import Comment from '../../src/models/comment/comment';
import Movie from '../../src/models/movie/movie';
import { PORT } from '../../src/util/secrets';
import dummyMovie from '../dummy/dummyMovie';
import app from '../dummy/serverSetup';

describe('postComments middleware', () => {
	let server: Server;
	let mongoDB: Connection;
	let movie: IMovieModel;

	before(async () => {
		app.post('/comments', postComments);
		server = app.listen(PORT);
		mongoDB = await connectDB();
		await Movie.deleteMany({});
		movie = await new Movie(dummyMovie).save();
	});

	after(async () => {
		server.close();
		await Promise.all([Movie.deleteMany({}), Comment.deleteMany({})]);
		await mongoDB.close();
	});

	it('should save to database and return comment', async () => {
		const content = 'Random text';
		const movieId = movie._id;
		const res = await request(app)
			.post('/comments')
			.set('content-type', 'application/json')
			.send({ content, movieId });
		expect(res).have.status(201);
		expect(res.body).to.be.an('object');
		expect(res.body).to.have.property('id');
		expect(res.body).to.have.property('createdAt');
		expect(res.body).to.have.property('movieId', movieId.toHexString());
		expect(res.body).to.have.property('content', content);
	});

	it('should return status code 404 if movie with passed id does not exist', async () => {
		const res = await request(app)
			.post('/comments')
			.set('content-type', 'application/json')
			.send({ content: 'Random text', movieId: new ObjectID() });
		expect(res).have.status(404);
		expect(res.body).to.have.property('code', 404);
		expect(res.body)
			.to.have.property('message')
			.and.be.an('string');
	});
});
