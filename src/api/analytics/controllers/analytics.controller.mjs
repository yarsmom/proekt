import { AnalyticsService } from '../services/analytics.service.mjs';

export class AnalyticsController {
	constructor() {
		this.analyticsService = new AnalyticsService();
	}

	async analytics(req, res) {
		try {
			const { login } = req.user;
			const result = await this.analyticsService.analytics(login);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log('error :>> ', error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}
}
