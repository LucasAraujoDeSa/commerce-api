import {Router} from 'express'
import { ProductController } from '../api/controllers/product'

const router = Router()

const productController = new ProductController();

router.get('/', (req, res) => {
  res.send('hello world')
})

router.post('/product', productController.create)
router.get('/product', productController.index)

export {router}
