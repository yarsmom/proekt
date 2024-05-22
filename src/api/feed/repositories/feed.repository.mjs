import { Feed } from '../models/feed.model.mjs';

export class FeedRepository {
	constructor() {
		this.feed = Feed;
	}

	async createFeed(data) {
		return await this.feed.create(data);
	}

	async getFeedByName(name) {
		return await this.feed.findOne({ name });
	}

	async methodName(params) {}

	async methodName(params) {}
}
