import { ObjectId } from 'bson';
import { model, Schema } from 'mongoose';
import ICommentModel from '../../interfaces/comment/ICommentModel';
import cleanId from '../../util/cleanId';

const commentSchema: Schema = new Schema({
	movieId: ObjectId,
	createdAt: { type: Date, default: Date.now },
	content: String
});

commentSchema.index({ movieId: 1 });

commentSchema.methods.clean = function() {
	return <ICommentModel>cleanId(this);
};

const Comment = model<ICommentModel>('Comment', commentSchema);
export default Comment;
