import { ReportRepository } from '../repositories/report.repository.mjs';

export class ReportService {
	constructor() {
		this.reportRepository = new ReportRepository();
	}

	async createReport(data) {
		return await this.reportRepository.createReport(data);
	}

	async getReportById(id) {
		return { status: 200, data: await this.reportRepository.getReportById(id) };
	}

	async getAllReportByUserLogin(login) {
		return { status: 200, data: await this.reportRepository.getAllReportByUserLogin(login) };
	}

	async deleteReportById(id) {
		return { status: 201, data: await this.reportRepository.deleteReportById(id) };
	}
}
