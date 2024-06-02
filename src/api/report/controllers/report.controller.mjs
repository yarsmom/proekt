import { ReportService } from '../services/report.service.mjs';

export class ReportController {
	constructor() {
		this.reportService = new ReportService();
	}

	async getReportById(req, res) {
		try {
			const { id } = req.query;
			const result = await this.reportService.getReportById(id);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log('error :>> ', error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}

	async getAllReportByUserLogin(req, res) {
		try {
			const { login } = req.user;
			const result = await this.reportService.getAllReportByUserLogin(login);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log('error :>> ', error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}

	async deleteReportById(req, res) {
		try {
			const { id } = req.query;
			const result = await this.reportService.deleteReportById(id);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log('error :>> ', error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}
}
