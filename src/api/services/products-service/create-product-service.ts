import { IProduct } from './../../ports/products/product';
import { Product } from '../../entitie/Product';
import { ProductRepository } from '../../repositories/product-repository';

export class CreateProductService {
  constructor(private productRepository: ProductRepository) {}

  public async execute(data: IProduct): Promise<Product> {
    const product = await this.productRepository.create(data);

    return product;
  }
}
