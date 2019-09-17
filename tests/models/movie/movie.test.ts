import { expect } from 'chai';
import connectDB from '../../../src/config/mongoose';
import Movie from '../../../src/models/movie/movie';
import dummyMovie from '../../dummy/dummyMovie';

describe('movie model', () => {
	it('should correctly create object', () => {
		const movie = new Movie(dummyMovie);
		expect(movie).to.have.property('_id');
		expect(movie).to.have.property('writers');
		expect(movie.writers)
			.to.be.an('array')
			.that.includes('Quentin Tarantino');
	});

	it(`'s clean method should trigger correctly`, () => {
		const movie = new Movie(dummyMovie).clean();
		expect(movie).to.not.have.property('_id');
		expect(movie).to.have.property('id');
	});

	it('should throw error when trying to save movie with duplicate imdbId', async () => {
		const mongoDB = await connectDB();
		await Movie.deleteMany({});
		await new Movie(dummyMovie).save();
		let isError = false;
		try {
			await new Movie(dummyMovie).save();
		} catch (err) {
			isError = true;
		}
		expect(isError).to.equal(true);
		return mongoDB.close();
	});
});
