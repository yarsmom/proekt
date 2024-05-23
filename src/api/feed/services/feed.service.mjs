import { FeedRepository } from '../repositories/feed.repository.mjs';

export class FeedService {
	constructor() {
		this.feedRepository = new FeedRepository();
	}

	async createFeed(data) {
		const isValidParams = this._validateParams(data);
		if (isValidParams.status === 400) return isValidParams;
		const feed = await this.feedRepository.getFeedByName(data.name);
		if (feed) return { status: 400, data: { message: 'The feed with this name already exists.' } };
		const result = await this.feedRepository.createFeed(data);
		return { status: 201, data: result };
	}

	async getFeedByName(name) {
		if (typeof name !== 'string' || !name) return { status: 400, data: { message: 'Invalid credetians.' } };
		const feed = await this.feedRepository.getFeedByName(name);
		if (!feed) return { status: 404, data: { message: 'The feed with this name does not exist.' } };
		return { status: 200, data: feed };
	}

	async getAllFeed() {
		const allFeed = await this.feedRepository.getAllFeed();
		if (!allFeed.length) return { status: 404, data: { message: 'Feed not found' } };
		return { status: 200, data: allFeed };
	}

	async methodName(params) {}

	async methodName(params) {}

	_validateParams(params) {
		const requiredFields = {
			name: 'string',
			DM: 'number',
			ME: 'number',
			NEm: 'number',
			NEg: 'number',
			NDF: 'number',
			eNDF: 'number',
			CP: 'number',
			DIP: 'number',
			K: 'number',
			CA: 'number',
			P: 'number',
			CostCWT: 'number',
			MG: 'number',
			S: 'number',
			CO: 'number',
			CU: 'number',
			FE: 'number',
			MN: 'number',
			SE: 'number',
			TDN: 'number',
		};

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
}
