import express from 'express';
import { UserController } from '../controllers/user.contoller.mjs';
import { auth } from '../../../middleware/auth.mjs';

const userRouter = new express.Router();
const userController = new UserController();

//singup
userRouter.post('/users', userController.singup.bind(userController));

//login
userRouter.post('/users/login', userController.login.bind(userController));

//logout
userRouter.post('/users/logout', auth, userController.logout.bind(userController));

//logout all
userRouter.post('/users/logoutall', auth, userController.logoutAll.bind(userController));

export { userRouter };
