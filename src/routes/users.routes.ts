import { Router } from 'express';
import {
  CreateUserController,
  FindUsersController,
  ResetPasswordController,
  ForgotPasswordController,
  AuthUserController,
} from '@/api/controllers/user/index';

const userRouter = Router();

const authUserController = new AuthUserController();
const createUserController = new CreateUserController();
const resetPasswordController = new ResetPasswordController();
const forgtPasswordController = new ForgotPasswordController();
const findUsersController = new FindUsersController();

userRouter.post('/', createUserController.create);
userRouter.post('/reset', resetPasswordController.create);
userRouter.post('/forgot', forgtPasswordController.create);
userRouter.get('/', findUsersController.find);
userRouter.post('/session', authUserController.create);

export { userRouter };
