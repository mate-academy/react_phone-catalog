import { request } from '../api/fetchClient';
import { Product } from '../types/Product';

export const getAccessories = () => {
  return request()
    .then(products => products.filter(
      (product:Product) => product.type === 'accessory',
    ));
};
