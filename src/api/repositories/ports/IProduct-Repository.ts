import { Product } from '@/api/Entitie/Product';
import { IProduct } from './../../ports/products/product';

export interface IProductRepository {
  create(data: IProduct): Promise<Product>;
  find(): Promise<Product[]>;
}
