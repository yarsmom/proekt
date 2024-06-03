import { FeedService } from '../../feed/services/feed.service.mjs';
import { ReportService } from '../../report/services/report.service.mjs';

export class AnalyticsService {
	constructor() {
		this.reportService = new ReportService();
		this.feedService = new FeedService();
	}

	async analytics(login) {
		const { data: reports } = await this.reportService.getAllReportByUserLogin(login);
		if (!reports.length) return { status: 404, data: { massage: 'Not found reports' } };
		const resultFeedDMamt = { GAIN: 0 };
		for (let report of reports) {
			let i = 0;
			const feeds = await this.feedService.getManyFeedByIds(report.feedIds);
			for (let feed of feeds) {
				if (!resultFeedDMamt[feed.name]) {
					resultFeedDMamt[feed.name] = {
						DMamt: parseFloat(report.DMamt[i].toFixed(2)),
						Cost: parseFloat((report.DMamt[i] * feed.CostCWT).toFixed(2)),
						Count: 1,
					};
					i++;
				} else {
					resultFeedDMamt[feed.name].DMamt += parseFloat(report.DMamt[i].toFixed(2));
					resultFeedDMamt[feed.name].Cost = parseFloat(
						(resultFeedDMamt[feed.name].DMamt * feed.CostCWT).toFixed(2)
					);
					i++;
					resultFeedDMamt[feed.name].Count += 1;
				}
			}
			resultFeedDMamt.GAIN += report.GAIN;
			i = 0;
		}
		resultFeedDMamt.GAIN = parseFloat(resultFeedDMamt.GAIN.toFixed(2));
		return { status: 200, data: resultFeedDMamt };
	}
}
