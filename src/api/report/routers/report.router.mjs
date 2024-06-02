import express from 'express';
import { ReportController } from '../controllers/report.controller.mjs';
import { auth } from '../../../middleware/auth.mjs';
import { role } from '../../../middleware/role.mjs';

const reportRouter = new express.Router();
const reportContorller = new ReportController();

reportRouter.get('/report', auth, role(['User', 'Admin']), reportContorller.getReportById.bind(reportContorller));

reportRouter.get(
	'/report/all',
	auth,
	role(['User', 'Admin']),
	reportContorller.getAllReportByUserLogin.bind(reportContorller)
);

reportRouter.delete('/report', auth, role(['User', 'Admin']), reportContorller.deleteReportById.bind(reportContorller));

export { reportRouter };
