import { Model } from 'mongoose';

const getSchemaPaths = (model: Model<any>, blacklist: string[] = []) => {
	const paths: string[] = [];
	model.schema.eachPath(el => paths.push(el));
	blacklist = [...blacklist, '_id', '__v'];
	return paths.filter(el => !blacklist.some(b => b === el));
};

export default getSchemaPaths;
