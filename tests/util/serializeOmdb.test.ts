import { expect } from 'chai';
import serializeOmdb from '../../src/util/serializeOmdb';
import dummyMovie from '../dummy/dummyMovie';
import dummyOmdbMovie from '../dummy/dummyOmdbMovie';

describe('serializeOmdb', () => {
	it('should return correctly serialized object', () => {
		const movie = serializeOmdb(dummyOmdbMovie);
		expect(movie).to.be.deep.equal(dummyMovie);
	});

	it('should return correctly serialized with only required properites passed', () => {
		const title = 'Pulp Fiction';
		const movie = serializeOmdb({ Title: title });
		expect(movie).to.have.property('title', title);
	});
});
