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

export const getSelectedTypeProducts = (productType: string) => {
  return request<Product[]>('/products.json')
    .then((products) => products.filter(({ type }) => type === productType));
};

export const filterProducts = (products: Product[], activeFilter: string) => {
  switch (activeFilter) {
    case 'age':
      return products.sort((a, b) => a.age - b.age);
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return products.sort((a, b) => b.price - a.price);
    default:
      return products;
  }
};
