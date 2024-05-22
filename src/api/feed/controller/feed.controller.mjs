import { FeedService } from '../services/feed.service.mjs';

export class FeedController {
	constructor() {
		this.feedService = new FeedService();
	}

	async createFeed(req, res) {
		try {
			const { body } = req;
			const result = await this.feedService.createFeed(body);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log(error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}

	async methodName(params) {}

	async methodName(params) {}

	async methodName(params) {}
}
