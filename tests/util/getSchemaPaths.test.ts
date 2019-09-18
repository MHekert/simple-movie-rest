import { expect } from 'chai';
import Movie from '../../src/models/movie/movie';
import getSchemaPaths from '../../src/util/getSchemaPaths';

describe('getSchemaPaths', () => {
	it('should return array with correct values filtred out', () => {
		const modelProperties = getSchemaPaths(Movie, ['title']);
		expect(modelProperties).to.be.an('array');
		expect(modelProperties).to.not.include('_id');
		expect(modelProperties).to.not.include('__v');
		expect(modelProperties).to.not.include('title');
		expect(modelProperties).to.include('imdbId');
	});
});
