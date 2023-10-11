import { Product } from '../types/Product';

const getProducts: () => Promise<Product[]> = () => {
  // eslint-disable-next-line max-len
  return fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
    .then(response => response.json());
};

export const getHotPriceProducts = () => {
  return getProducts()
    .then(products => products
      .filter(product => product.discount)
      .sort((a: Product, b: Product) => {
        return b.price * b.discount - a.price * a.discount;
      }));
};

export const getBrandNewProducts = () => {
  return getProducts()
    .then(products => products
      .filter(product => !product.discount)
      .sort((a: Product, b: Product) => {
        return b.price - a.price;
      }));
};

export const getPhones = () => {
  return getProducts()
    .then(products => products
      .filter(product => product.type === 'phone'));
};

export const getTablets = () => {
  return getProducts()
    .then(products => products
      .filter(product => product.type === 'tablet'));
};

export const getAccessories = () => {
  return getProducts()
    .then(products => products
      .filter(product => product.type === 'accessory'));
};
