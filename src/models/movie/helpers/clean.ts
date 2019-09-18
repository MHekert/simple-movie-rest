import { pick } from 'lodash';
import IMovieModel from '../../../interfaces/IMovieModel';
import getSchemaPaths from '../../../util/getSchemaPaths';
import Movie from '../movie';

const clean = (movie: IMovieModel) => {
	const modelProperties = getSchemaPaths(Movie);
	const id = movie._id;
	const cleanMovie = pick(movie, modelProperties);
	cleanMovie.id = id;
	cleanMovie.ratings = movie.ratings.map((el: { _id: any; source: string; value: string }) => {
		const { source, value } = el;
		return { source, value };
	});
	return cleanMovie;
};

export default clean;
