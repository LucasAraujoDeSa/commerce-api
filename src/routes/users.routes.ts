import { Router } from 'express';
import { CreateUserController } from '@/api/controllers/user/create-user-controller';

const userRouter = Router();

const createUserController = new CreateUserController();

userRouter.post('/', createUserController.create);
//userRouter.get('/', findProductController.find);

export { userRouter };
