import IMovieModel from '../../../interfaces/movie/IMovieModel';
import cleanId from '../../../util/cleanId';

const clean = (movie: IMovieModel) => {
	const cleanMovie = <IMovieModel>cleanId(movie);
	cleanMovie.ratings = movie.ratings.map((el: { _id: any; source: string; value: string }) => {
		const { source, value } = el;
		return { source, value };
	});
	return cleanMovie;
};

export default clean;
