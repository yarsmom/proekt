import express from 'express';
import { FeedController } from '../controller/feed.controller.mjs';
import { auth } from '../../../middleware/auth.mjs';
import { role } from '../../../middleware/role.mjs';

const feedRouter = new express.Router();
const feedController = new FeedController();

//create feed
feedRouter.post('/feed', auth, role('Admin'), feedController.createFeed.bind(feedController));

//get feed
feedRouter.get('/feed');

//update feed
feedRouter.patch('/feed');

//delete feed
feedRouter.delete('/feed');

export { feedRouter };
