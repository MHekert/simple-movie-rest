import { expect } from 'chai';
import clean from '../../../../src/models/movie/helpers/clean';
import Movie from '../../../../src/models/movie/movie';
import dummyMovie from '../../../dummy/dummyMovie';

describe(`Movie model's clean function`, () => {
	it('should correctly create object', () => {
		const movie = clean(new Movie(dummyMovie));
		expect(movie).to.not.have.property('_id');
		expect(movie).to.have.property('id');
		expect(movie).to.have.property('writers');
		expect(movie.writers)
			.to.be.an('array')
			.that.includes('Quentin Tarantino');
		movie.ratings.forEach(el => expect(el).to.not.have.property('_id'));
	});
});
