import { FindProductsService } from '../api/services/products-service/find-products-service';
import { ProductRepository } from 'api/repositories/product-repository';
import { CreateProductService } from '@/api/services/products-service/index';

export const createProductContainer = (): CreateProductService => {
  const productRepository = new ProductRepository();
  const createProduct = new CreateProductService(productRepository);
  return createProduct;
};

export const findProductsContainer = (): FindProductsService => {
  const productRepository = new ProductRepository();
  const findProducts = new FindProductsService(productRepository);
  return findProducts;
};
