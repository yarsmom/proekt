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

	async getFeedByName(req, res) {
		try {
			const { name } = req.query;
			const result = await this.feedService.getFeedByName(name);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log(error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}

	async getAllFeed(req, res) {
		try {
			const result = await this.feedService.getAllFeed();
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log(error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}

	async methodName(params) {}

	async methodName(params) {}
}
