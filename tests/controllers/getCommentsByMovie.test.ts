import { expect, request } from 'chai';
import { Server } from 'http';
import { Connection } from 'mongoose';
import connectDB from '../../src/config/mongoose';
import getComments from '../../src/controllers/getComments';
import ICommentModel from '../../src/interfaces/comment/ICommentModel';
import IMovieModel from '../../src/interfaces/movie/IMovieModel';
import Comment from '../../src/models/comment/comment';
import Movie from '../../src/models/movie/movie';
import { PORT } from '../../src/util/secrets';
import dummyMovie from '../dummy/dummyMovie';
import dummyMultipleComments from '../dummy/dummyMultipleComments';
import app from '../dummy/serverSetup';

describe('getCommentsByMovie middleware', () => {
	let server: Server;
	let mongoDB: Connection;
	let comments: ICommentModel[];
	let movieId: IMovieModel['_id'];

	before(async () => {
		app.get('/comments/movie/:movieId/:limit?/:skip?', getComments);
		server = await app.listen(PORT);
		mongoDB = await connectDB();
		await Promise.all([Movie.deleteMany({}), Comment.deleteMany({})]);
		movieId = (await new Movie(dummyMovie))._id;
		comments = await Promise.all(
			dummyMultipleComments.map(async el => await new Comment({ ...el, movieId }).save())
		);
	});

	after(async () => {
		await Movie.deleteMany({});
		await Comment.deleteMany({});
		return Promise.all([server.close(), mongoDB.close()]);
	});

	it('should return array of 3 objects when no limit or skip specified', async () => {
		const res = await request(app).get(`/comments/movie/${movieId}`);
		expect(res).to.have.status(200);
		expect(res.body)
			.to.be.an('array')
			.and.to.have.lengthOf(3);
	});

	it('should return array of 1 containing first element when limit 1 is specified', async () => {
		const res = await request(app).get(`/comments/movie/${movieId}/1`);
		expect(res).to.have.status(200);
		expect(res.body)
			.to.be.an('array')
			.and.to.have.lengthOf(1);
		expect(res.body[0].content).to.be.equal(comments[0].content);
	});

	it('should return array containing second object when limit and skip are set to 1', async () => {
		const res = await request(app).get(`/comments/movie/${movieId}/1/1`);
		expect(res).to.have.status(200);
		expect(res.body)
			.to.be.an('array')
			.and.to.have.lengthOf(1);
		expect(res.body[0].content).to.be.equal(comments[1].content);
	});
});
