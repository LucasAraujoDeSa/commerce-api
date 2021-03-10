import { FindProductsService } from './../../services/products-service/find-products-service';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export class FindProductController {
  public async find(req: Request, res: Response): Promise<Response> {
    try {
      const productService = container.resolve(FindProductsService);
      const products = await productService.execute();

      return res.status(201).json(products);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}
