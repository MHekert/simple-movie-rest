import axios from 'axios';
import { OMDBAPI_KEY } from './secrets';

const { get } = axios;
const omdbUrl = `http://www.omdbapi.com/?apikey=${OMDBAPI_KEY}&`;

const fetchFromOmdb = async (args: { imdbId?: string; title?: string }) => {
	const { imdbId, title } = args;
	const getByImdbId = `${omdbUrl}i=${imdbId}`;
	const getByTitle = `${omdbUrl}t=${encodeURIComponent(title)}`;
	let res = null;
	if (imdbId) res = await get(getByImdbId);
	if (title && (!res || res.data.Response === 'False')) res = await get(getByTitle);
	if (!res || res.data.Response === 'False') return null;
	return res.data;
};

export default fetchFromOmdb;
