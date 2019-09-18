import { expect } from 'chai';
import Movie from '../../src/models/movie/movie';
import cleanId from '../../src/util/cleanId';
import dummyMovie from '../dummy/dummyMovie';

describe(`cleanId function`, () => {
	it('should correctly remove _id and add id property to object', () => {
		const movie = cleanId(new Movie(dummyMovie));
		expect(movie).to.not.have.property('_id');
		expect(movie).to.have.property('id');
		expect(movie).to.have.property('writers');
	});
});
