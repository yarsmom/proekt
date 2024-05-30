import express from 'express';
import { auth } from '../../../middleware/auth.mjs';
import { role } from '../../../middleware/role.mjs';
import { CowController } from '../controllers/cow.controller.mjs';

const cowRouter = new express.Router();
const cowController = new CowController();

//create cow
cowRouter.post('/cows', auth, role(['Admin']), cowController.createCow.bind(cowController));

//get cow by name
cowRouter.get('/cows', auth, role(['Admin', 'User']), cowController.getCowByName.bind(cowController));

//get all cows
cowRouter.get('/cows/all', auth, role(['Admin', 'User']), cowController.getAllCow.bind(cowController));

//update cow by name
cowRouter.patch('/cows', auth, role(['Admin']), cowController.updateCowByName.bind(cowController));

//delete cow by name
cowRouter.delete('/cows', auth, role(['Admin']), cowController.deleteCowByName.bind(cowController));

export { cowRouter };
