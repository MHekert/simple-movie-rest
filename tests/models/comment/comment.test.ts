import { ObjectID } from 'bson';
import { expect } from 'chai';
import Comment from '../../../src/models/comment/comment';

describe('comment model', () => {
	it(`'s clean method should trigger correctly`, () => {
		const comment = new Comment().clean();
		expect(comment).to.not.have.property('_id');
		expect(comment).to.have.property('id');
	});

	it('shoul create object with correct properties', () => {
		const content = 'random text';
		const movieId = new ObjectID();
		const comment = new Comment({ content, movieId });
		expect(comment).to.have.property('content', content);
		expect(comment).to.have.property('movieId', movieId);
		expect(comment).to.have.property('createdAt');
		expect(comment).to.have.property('_id');
	});
});
