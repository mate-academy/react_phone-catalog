import { request } from '../api/fetchClient';
import { Product } from '../types/Product';

export const getBrandNewModels = async () => {
  return request()
    .then(products => products.filter(
      (product: Product) => !product.discount,
    ))
    .then(products => products.sort((
      p1: Product,
      p2: Product,
    ) => {
      return p2.price - p1.price;
    }));
};
