import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import errorHandler from './controllers/errorHandler';
import postMovies from './controllers/postMovies';
import validateRequest from './controllers/validateRequest';
import EType from './interfaces/EType';

const router = Router();

router.post(
	'/movies',
	[
		oneOf([body('imdbId').exists(), body('title').exists()]),
		body('type').custom((type: string) => (<any>Object.values(EType)).includes(type))
	],
	validateRequest,
	postMovies
);
router.use(errorHandler);

export default router;
