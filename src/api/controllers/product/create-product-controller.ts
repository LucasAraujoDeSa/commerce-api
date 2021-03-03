import { Request, Response } from 'express';
import { createProductContainer } from '@/factories/product-container';

export class CreateProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, price, amount, color } = req.body;

      const productService = createProductContainer();
      const product = await productService.execute({
        name,
        description,
        amount,
        price,
        color,
      });

      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}
