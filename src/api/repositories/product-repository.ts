import { IProductRepository } from './ports/IProduct-Repository';
import { getRepository, Repository } from 'typeorm';
import { IProduct } from '../ports/products/product';
import { Product } from '../Entitie/Product';

export class ProductRepository implements IProductRepository {
  private readonly ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  async create(data: IProduct): Promise<Product> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }

  async find(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }
}
