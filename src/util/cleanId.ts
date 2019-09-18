import { pick } from 'lodash';
import getSchemaPaths from './getSchemaPaths';

const cleanId = (model: any) => {
	const modelProperties = getSchemaPaths(model);
	const id = model._id;
	const cleanModel = pick(model, modelProperties);
	cleanModel.id = id;
	return <any>cleanModel;
};

export default cleanId;
