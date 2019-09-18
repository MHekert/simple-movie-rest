import { NextFunction, Request, Response } from 'express';
import Movie from '../models/movie/movie';

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { limit, skip } = req.params;
		const movies = await Movie.find({})
			.skip(+skip)
			.limit(+limit)
			.exec()
			.then(movies => movies.map(m => m.clean()));
		res.status(200).send(movies);
	} catch (err) {
		next(err);
	}
};

export default getMovies;
