import { request } from './getRequest';
import { Product } from '../types/product';

export const getHotPriceProducts = () => {
  return request<Product[]>('/products.json')
    .then((products) => products.filter(({ discount }) => discount > 0))
    .then((itemsWithDiscount) => itemsWithDiscount.sort((a, b) => {
      const aDiff = a.price - a.price - a.price * (a.discount / 100);
      const bDiff = b.price - b.price - b.price * (b.discount / 100);

      return aDiff - bDiff;
    }));
};

export const getBrandNewProducts = () => {
  return request<Product[]>('/products.json')
    .then((products) => products.filter(({ discount }) => discount === 0))
    .then(itemsWithoutDiscount => itemsWithoutDiscount.sort(
      (a, b) => b.price - a.price,
    ));
};
