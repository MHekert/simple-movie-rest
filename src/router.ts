import { Router } from 'express';
import { body, oneOf, param } from 'express-validator';
import errorHandler from './controllers/errorHandler';
import getComments from './controllers/getComments';
import getCommentsByMovie from './controllers/getCommentsByMovie';
import getMovies from './controllers/getMovies';
import postComments from './controllers/postComments';
import postMovies from './controllers/postMovies';
import validateRequest from './controllers/validateRequest';
import EType from './interfaces/movie/EType';

const router = Router();

router.post(
	'/movies',
	[
		oneOf([body('imdbId').exists(), body('title').exists()]),
		body('type')
			.optional()
			.custom((type: string) => (<any>Object.values(EType)).includes(type))
	],
	validateRequest,
	postMovies
);
router.get(
	'/movies/:limit?/:skip?',
	[
		param('limit')
			.optional()
			.isInt()
			.toInt(),
		param('skip')
			.optional()
			.isInt()
			.toInt()
	],
	validateRequest,
	getMovies
);
router.post(
	'/comments',
	[body('movieId').isMongoId(), body('content').isString()],
	validateRequest,
	postComments
);
router.get(
	'/comments/movie/:movieId/:limit?/:skip?',
	[
		param('limit')
			.optional()
			.isInt()
			.toInt(),
		param('skip')
			.optional()
			.isInt()
			.toInt()
	],
	validateRequest,
	getCommentsByMovie
);
router.get(
	'/comments/:limit?/:skip?',
	[
		param('limit')
			.optional()
			.isInt()
			.toInt(),
		param('skip')
			.optional()
			.isInt()
			.toInt()
	],
	validateRequest,
	getComments
);

router.use(errorHandler);

export default router;
