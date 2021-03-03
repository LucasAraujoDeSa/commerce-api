import { Router } from 'express';
import { productRouter } from './product.routes';
import { userRouter } from './users.routes';
const router = Router();

router.get('/', (req, res) => {
  res.send('hello world');
});

router.use('/user', userRouter);
router.use('/products', productRouter);

export { router };
