import { Product } from '../../entitie/Product';
import { inject, injectable } from 'tsyringe';
import { ProductRepository } from '../../repositories/product-repository';

@injectable()
export class FindProductsService {
  constructor(
    @inject('ProductRepository') private productRepository: ProductRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productRepository.find();

    return products;
  }
}
