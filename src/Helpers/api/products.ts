import { Product } from '../types/Product';

// eslint-disable-next-line
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

export const request = (url: string) => {
  return fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};

export const getProducts = () => request(`${BASE_URL}/products.json`);

export const getHotPriceProducts = () => {
  return getProducts()
    .then(res => {
      return res
        .filter((product: Product) => product.discount !== 0)
        .sort((a: Product, b: Product) => {
          return a.price * (a.discount / 100) - b.price * (b.discount / 100);
        });
    });
};

export const getBrandNewProducts = () => {
  return getProducts()
    .then(res => {
      return res
        .filter((product: Product) => product.discount === 0)
        .sort((a: Product, b: Product) => b.price - a.price);
    });
};

export const getPhones = () => {
  return getProducts()
    .then(res => res.filter((product: Product) => product.type === 'phone'));
};

export const getTablets = () => {
  return getProducts()
    .then(res => res.filter((product: Product) => product.type === 'tablet'));
};

export const getAccessories = () => {
  return getProducts()
    .then(res => res.filter((product: Product) => {
      return product.type === 'accessory';
    }));
};

export const getProductDetails = (id: string) => {
  return request(`${BASE_URL}/products/${id}.json`);
};

export const getSuggestedProducts = () => {
  return getProducts()
    .then(res => {
      const shuffled = res.sort(() => 0.5 - Math.random());

      return shuffled.slice(0, 8);
    });
};
