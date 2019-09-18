import { NextFunction, Request, Response } from 'express';
import Comment from '../models/comment/comment';
import checkIfMovieExists from '../models/movie/helpers/checkIfMovieExists';

const postComments = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { movieId, content } = req.body;
		if (!(await checkIfMovieExists(movieId)))
			return res
				.status(404)
				.send({ code: 404, message: `Cannot find movie with id: ${movieId}` });
		const dbResponse = await new Comment({ movieId, content }).save();
		res.status(201).send(dbResponse.clean());
	} catch (err) {
		next(err);
	}
};

export default postComments;
