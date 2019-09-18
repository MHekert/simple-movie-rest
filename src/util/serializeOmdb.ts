import { forEach, isArray, omitBy } from 'lodash';
import EType from '../interfaces/movie/EType';
import IMovie from '../interfaces/movie/IMovie';
import IOmdb from '../interfaces/movie/IOmdb';

const handleNA = (e: any) => (typeof e === 'string' && e === 'N/A' ? undefined : e);
const handleArray = (e: string) => (!e ? undefined : e.split(',').map((el: string) => el.trim()));
const handleDate = (e: string) => (e === undefined ? undefined : new Date(e).toISOString());
const handleNumber = (e: string) =>
	e === undefined ? undefined : e.replace(/,/g, '').replace(/\$/g, '');

const serializeOmdb = (omdbRes: Partial<IOmdb>) => {
	const or: any = {};
	forEach(omdbRes, (val, key) => (or[key] = handleNA(val)));
	let movie: Partial<IMovie> = {
		title: or.Title,
		year: +or.Year,
		rated: or.Rated,
		released: handleDate(or.Released),
		runtime: parseInt(or.Runtime),
		plot: or.Plot,
		awards: or.Awards,
		poster: or.Poster,
		metascore: +or.Metascore,
		imdbRating: +or.imdbRating,
		imdbVotes: +handleNumber(or.imdbVotes),
		imdbId: or.imdbID,
		type: <EType>or.Type,
		dvd: handleDate(or.DVD),
		boxOffice: +handleNumber(or.BoxOffice),
		production: or.Production,
		website: or.Website,
		totalSeasons: +or.totalSeasons,
		ratings: !or.Ratings
			? undefined
			: or.Ratings.map((el: any) => ({ source: el.Source, value: el.Value })),
		genres: handleArray(or.Genre),
		directors: handleArray(or.Director),
		writers: handleArray(or.Writer),
		actors: handleArray(or.Actors),
		languages: handleArray(or.Language),
		countries: handleArray(or.Country)
	};
	movie = omitBy(movie, (el: any) => typeof el !== 'string' && !isArray(el) && isNaN(el));
	return movie;
};

export default serializeOmdb;
