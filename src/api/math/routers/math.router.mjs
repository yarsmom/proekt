import express from 'express';
import { MathController } from '../controllers/math.controller.mjs';
import { auth } from '../../../middleware/auth.mjs';
import { role } from '../../../middleware/role.mjs';

const mathController = new MathController();
const mathRouter = new express.Router();

mathRouter.post(
	'/mathModel',
	auth,
	role(['User', 'Admin']),
	mathController.calculationOfFeedMixture.bind(mathController)
);

export { mathRouter };
