import { Product } from '../types/product';

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/api/';

const request = <T>(endpoint: string): Promise<T> => {
  return fetch(API_URL + endpoint).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
};

export const getHotPriceProducts = () => {
  return request<Product[]>('/products.json')
    .then(products => products.filter(({ discount }) => discount > 0))
    .then(itemsWithDiscount =>
      itemsWithDiscount.sort((a, b) => {
        const aDiff = a.price - a.price - a.price * (a.discount / 100);
        const bDiff = b.price - b.price - b.price * (b.discount / 100);

        return aDiff - bDiff;
      }));
};

export const getBrandNewProducts = () => {
  return request<Product[]>('/products.json')
    .then(products => products.filter(({ discount }) => discount === 0))
    .then(itemsWithoutDiscount =>
      itemsWithoutDiscount.sort((a, b) => b.price - a.price));
};

export const getSelectedTypeProducts = (productType: string) => {
  return request<Product[]>('/products.json')
    .then((products) => products.filter(({ type }) => type === productType));
};
