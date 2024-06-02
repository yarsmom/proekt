import { MathService } from '../services/math.service.mjs';

export class MathController {
	constructor() {
		this.mathService = new MathService();
	}

	async calculationOfFeedMixture(req, res) {
		try {
			const data = req.body;
			data.login = req.user.login;
			const result = await this.mathService.calculationOfFeedMixture(data);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log('error :>> ', error);
			res.status(500).send({ message: 'Internal Server Error' });
		}
	}
}
