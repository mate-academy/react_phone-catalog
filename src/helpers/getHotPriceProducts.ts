import { request } from '../api/fetchClient';
import { Product } from '../types/Product';

export const getHotPriceProducts = async () => {
  return request()
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .then(products => products.filter(
      (product: Product) => product.discount,
    ))
    .then(products => products.sort((
      p1: Product,
      p2: Product,
    ) => {
      return (p2.price * (1 - p2.discount / 100))
        - (p1.price * (1 - p1.discount / 100));
    }));
};
