import { Document } from 'mongoose';
import IMovie from './IMovie';

export default interface IMovieModel extends IMovie, Document {
	clean(): IMovie & { id: any };
}
