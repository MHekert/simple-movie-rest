import Movie from '../movie';

const checkIfMovieExists = async (id: any) => {
	const movie = await Movie.findById(id)
		.select({ _id: 1 })
		.exec();
	return !!movie;
};

export default checkIfMovieExists;
