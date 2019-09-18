import { model, Schema } from 'mongoose';
import IMovieModel from '../../interfaces/IMovieModel';
import clean from './helpers/clean';

const movieSchema: Schema = new Schema({
	title: String,
	year: Number,
	rated: String,
	released: String,
	runtime: Number,
	genres: [String],
	directors: [String],
	writers: [String],
	actors: [String],
	plot: String,
	languages: [String],
	countries: [String],
	awards: String,
	poster: String,
	ratings: [{ source: String, value: String }],
	imdbRating: Number,
	imdbVotes: Number,
	imdbId: { type: String, unique: true, sparse: true },
	type: { type: String, enum: ['movie', 'series', 'episode'] },
	dvd: String,
	boxOffice: Number,
	production: String,
	website: String,
	totalSeasons: Number,
	metascore: Number
});

movieSchema.index({ title: 1 });
movieSchema.index({ imdbID: 1 });

movieSchema.methods.clean = function() {
	return clean(this);
};

const Movie = model<IMovieModel>('Movie', movieSchema);

export default Movie;
