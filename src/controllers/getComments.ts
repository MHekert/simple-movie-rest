import { NextFunction, Request, Response } from 'express';
import Comment from '../models/comment/comment';

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { limit, skip } = req.params;
		const comments = await Comment.find({})
			.sort({ _id: 1 })
			.skip(+skip)
			.limit(+limit)
			.exec()
			.then(comment => comment.map(c => c.clean()));
		res.status(200).send(comments);
	} catch (err) {
		next(err);
	}
};

export default getMovies;
