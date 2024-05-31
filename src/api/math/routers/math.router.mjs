import express from 'express';
import { MathController } from '../controllers/math.controller.mjs';

const mathController = new MathController();
const mathRouter = new express.Router();

mathRouter.post('/mathModel', mathController.calculationOfFeedMixture.bind(mathController));

export { mathRouter };
