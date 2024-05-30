import { CowService } from '../services/cow.service.mjs';

export class CowController {
	constructor() {
		this.cowService = new CowService();
	}

	async createCow(req, res) {
		try {
			const data = req.body;
			const result = await this.cowService.createCow(data);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log('error :>> ', error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}

	async getCowByName(req, res) {
		try {
			const { name } = req.query;
			const result = await this.cowService.getCowByName(name);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log('error :>> ', error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}

	async getAllCow(req, res) {
		try {
			const result = await this.cowService.getAllCow();
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log('error :>> ', error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}

	async updateCowByName(req, res) {
		try {
			const { name, data } = req.body;
			const result = await this.cowService.updateCowByName(name, data);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log('error :>> ', error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}

	async deleteCowByName(req, res) {
		try {
			const { name } = req.query;
			const result = await this.cowService.deleteCowByName(name);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log('error :>> ', error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}
}
