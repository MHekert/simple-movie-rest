import { NextFunction, Request, Response } from 'express';
import { merge, pick } from 'lodash';
import Movie from '../models/movie/movie';
import fetchFromOmdb from '../util/fetchFromOmdb';
import getSchemaPaths from '../util/getSchemaPaths';
import serializeOmdb from '../util/serializeOmdb';

const postMovies = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { body } = req;
		const modelProperites = getSchemaPaths(Movie);
		const modelFromRequest = pick(body, modelProperites);
		const modelFromOmdb = serializeOmdb(await fetchFromOmdb(body));
		if (!modelFromOmdb.imdbId)
			return res.status(404).send({ code: 404, message: 'Movie does not exists' });
		const movie = new Movie(merge(modelFromOmdb, modelFromRequest));
		const dbResponse = await movie.save();
		res.status(200).send(dbResponse.clean());
	} catch (err) {
		next(err);
	}
};

export default postMovies;
