import express from 'express';
import { AnalyticsController } from '../controllers/analytics.controller.mjs';
import { auth } from '../../../middleware/auth.mjs';
import { role } from '../../../middleware/role.mjs';

const analyticsRouter = new express.Router();
const analyticsController = new AnalyticsController();

analyticsRouter.get(
	'/analytics',
	auth,
	role(['Admin', 'User']),
	analyticsController.analytics.bind(analyticsController)
);

export { analyticsRouter };
