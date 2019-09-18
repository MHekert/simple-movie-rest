import { expect } from 'chai';
import fetchFromOmdb from '../../src/util/fetchFromOmdb';

describe('fetchFromOmdb', () => {
	it('should return response when imdbId is specified', async () => {
		const imdbId = 'tt0110912';
		const res = await fetchFromOmdb({ imdbId });
		expect(res).to.be.an('object');
		expect(res).to.have.property('Response', 'True');
		expect(res).to.have.property('imdbID', imdbId);
	});
	it('should return response when title is specified', async () => {
		const title = 'Pulp Fiction';
		const res = await fetchFromOmdb({ title });
		expect(res).to.be.an('object');
		expect(res).to.have.property('Response', 'True');
		expect(res).to.have.property('Title', title);
	});
	it('should fetch prioritizing imdbId when both imdbId and title are specified', async () => {
		const title = 'Iron Man';
		const imdbId = 'tt0110912';
		const res = await fetchFromOmdb({ imdbId, title });
		expect(res).to.be.an('object');
		expect(res).to.have.property('Response', 'True');
		expect(res).to.have.property('Title');
		expect(res.Title).to.not.be.equal(title);
	});
	it('should fetch using title when fetch with imdbId fails', async () => {
		const title = 'Iron Man';
		const imdbId = 'wrong_id';
		const res = await fetchFromOmdb({ imdbId, title });
		expect(res).to.be.an('object');
		expect(res).to.have.property('Response', 'True');
		expect(res).to.have.property('Title', title);
		expect(res.imdbID).to.not.be.equal(imdbId);
	});
	it('should return null when fetch with both imdbId and title fails', async () => {
		const title = 'wrong_title';
		const imdbId = 'wrong_id';
		const res = await fetchFromOmdb({ imdbId, title });
		expect(res).to.be.an('null');
	});
});
