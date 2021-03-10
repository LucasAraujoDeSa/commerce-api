import { CreateProductService } from '@/api/services/products-service/index';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
export class CreateProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, price, amount, color } = req.body;

      const productService = container.resolve(CreateProductService);
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
