import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validateRequest = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!validationResult(req).isEmpty()) throw new Error('Bad Request');
		next();
	} catch (err) {
		res.status(400).send({ code: 400, message: 'Bad Request' });
	}
};

export default validateRequest;
