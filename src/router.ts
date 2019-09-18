import { Router } from 'express';
import { body, oneOf, param } from 'express-validator';
import errorHandler from './controllers/errorHandler';
import getMovies from './controllers/getMovies';
import postMovies from './controllers/postMovies';
import validateRequest from './controllers/validateRequest';
import EType from './interfaces/EType';

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
router.use(errorHandler);

export default router;
