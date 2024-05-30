import { CowRepository } from '../repositories/cow.repository.mjs';

export class CowService {
	constructor() {
		this.cowRepository = new CowRepository();
		this.requiredFields = {
			name: 'string',
			a: 'number',
			b: 'number',
			c: 'number',
			a1: 'number',
			a2: 'number',
			c2: 'number',
			a3: 'number',
			b3: 'number',
		};
	}

	async createCow(data) {
		const isValidParams = this._validateParams(data, 'Create');
		if (isValidParams.status === 400) return isValidParams;
		const cow = await this.cowRepository.getCowByName(data.name);
		if (cow) return { status: 400, data: { message: 'The cow with this name already exists.' } };
		const newCow = await this.cowRepository.createCow(data);
		return { status: 201, data: { newCow } };
	}

	async getCowByName(name) {
		if (!name) return { status: 400, data: { message: 'Invalid credetians.' } };
		const cow = await this.cowRepository.getCowByName(name);
		if (!cow) return { status: 404, data: { message: 'The cow with this name does not exist.' } };
		return { status: 200, data: cow };
	}

	async getAllCow() {
		const allCow = await this.cowRepository.getAllCow();
		if (!allCow.length) return { status: 404, data: { message: 'Cow not found' } };
		return { status: 200, data: allCow };
	}

	async updateCowByName(name, data) {
		if ((!name || typeof name !== 'string', !data || typeof data !== 'object'))
			return { status: 400, data: { message: 'Invalid credetians.' } };
		const cow = await this.cowRepository.getCowByName(name);
		if (!cow) return { status: 404, data: { message: 'The cow with this name does not exist.' } };
		const isValidParams = this._validateParams(data);
		if (isValidParams.status === 400) return isValidParams;
		await this.cowRepository.updateCowByName(name, data);
		return { status: 201, data: { message: 'Cow update' } };
	}

	async deleteCowByName(name) {
		if (!name) return { status: 400, data: { message: 'Invalid credetians.' } };
		const cow = await this.cowRepository.getCowByName(name);
		if (!cow) return { status: 404, data: { message: 'The cow with this name does not exist.' } };
		await this.cowRepository.deleteCowByName(name);
		return { status: 201, data: { message: 'Cow delete' } };
	}

	_validateParams(params, event = 'Update') {
		const requiredFields = this.requiredFields;
		if (event === 'Create') {
			for (const field in requiredFields) {
				if (!params.hasOwnProperty(field)) {
					return { status: 400, data: { message: `Missing required field: ${field}` } };
				}

				if (typeof params[field] !== requiredFields[field]) {
					return {
						status: 400,
						data: { message: `Invalid type for field: ${field}. Expected ${requiredFields[field]}` },
					};
				}
			}
			return { status: 200 };
		}
		for (const field in params) {
			if (typeof params[field] !== requiredFields[field]) {
				return {
					status: 400,
					data: { message: `Invalid type for field: ${field}. Expected ${requiredFields[field]}` },
				};
			}
		}
		return { status: 200 };
	}
}
