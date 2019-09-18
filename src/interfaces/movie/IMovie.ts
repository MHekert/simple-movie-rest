import EType from './EType';

export default interface IMovie {
	title: string;
	year: number;
	rated: string;
	released: string;
	runtime: number;
	genres: string[];
	directors: string[];
	writers: string[];
	actors: string[];
	plot: string;
	languages: string[];
	countries: string[];
	awards: string;
	poster: string;
	ratings: { source: string; value: string }[];
	metascore: number;
	imdbRating: number;
	imdbVotes: number;
	imdbId: string;
	type: EType;
	dvd: string;
	boxOffice: number;
	production: string;
	website: string;
	totalSeasons: number;
}
