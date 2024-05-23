import express from 'express';
import { FeedController } from '../controller/feed.controller.mjs';
import { auth } from '../../../middleware/auth.mjs';
import { role } from '../../../middleware/role.mjs';

const feedRouter = new express.Router();
const feedController = new FeedController();

//create feed
feedRouter.post('/feed', auth, role(['Admin']), feedController.createFeed.bind(feedController));

//get feed
feedRouter.get('/feed', auth, role(['Admin', 'User']), feedController.getFeedByName.bind(feedController));

//get all feed
feedRouter.get('/feed/all', auth, role(['Admin', 'User']), feedController.getAllFeed.bind(feedController));

//update feed
feedRouter.patch('/feed', auth, role(['Admin']), feedController.updateFeedByName.bind(feedController));

//delete feed
feedRouter.delete('/feed', auth, role(['Admin']), feedController.deleteFeedByName.bind(feedController));

export { feedRouter };
