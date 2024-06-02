import { Report } from '../model/report.model.mjs';

export class ReportRepository {
	constructor() {
		this.report = Report;
	}

	async createReport(data) {
		return await this.report.create(data);
	}

	async getReportById(id) {
		return await this.report.findById(id);
	}

	async getAllReportByUserLogin(login) {
		return await this.report.find({ userLogin: login });
	}

	async deleteReportById(id) {
		return await this.report.deleteOne({ _id: id });
	}
}
