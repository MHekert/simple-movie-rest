import { Document } from 'mongoose';
import IComment from './IComment';

export default interface ICommentModel extends IComment, Document {
	clean(): IComment & { id: any };
}
