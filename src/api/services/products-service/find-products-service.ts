import { Product } from '../../entitie/Product';
import { ProductRepository } from '../../repositories/product-repository';

export class FindProductsService {
  constructor(private productRepository: ProductRepository) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productRepository.find();

    return products;
  }
}
