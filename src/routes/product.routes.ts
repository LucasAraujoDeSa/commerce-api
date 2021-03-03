import { Router } from 'express';
import {
  CreateProductController,
  FindProductController,
} from '@/api/controllers/product/index';

const productRouter = Router();

const createProductController = new CreateProductController();
const findProductController = new FindProductController();

productRouter.post('/', createProductController.create);
productRouter.get('/', findProductController.find);

export { productRouter };
