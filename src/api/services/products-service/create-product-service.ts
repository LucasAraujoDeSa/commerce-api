import { IProduct } from './../../ports/products/product';
import { inject, injectable } from 'tsyringe';
import { Product } from '../../entitie/Product';
import { ProductRepository } from '../../repositories/product-repository';

@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductRepository') private productRepository: ProductRepository,
  ) {}

  public async execute(data: IProduct): Promise<Product> {
    const product = await this.productRepository.create(data);

    return product;
  }
}
