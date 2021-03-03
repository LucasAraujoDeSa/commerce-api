import { Request, Response } from 'express';
import { findProductsContainer } from '../../../factories/product-container';

export class FindProductController {
  public async find(req: Request, res: Response): Promise<Response> {
    try {
      const productService = findProductsContainer();
      const products = await productService.execute();

      return res.status(201).json(products);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}
