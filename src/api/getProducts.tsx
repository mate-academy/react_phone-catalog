import { Product } from '../helpers/types';

export const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const getProducts = () => (
  fetch(`${BASE_URL}.json`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`),
        );
      }

      return response.json();
    })
);

export const getHotPriceProducts = () => (
  getProducts()
    .then(result => result.filter((product: Product) => product.discount > 0)
      .sort((productA: Product, productB: Product) => (productB.price * productB.discount) / 100
      - (productA.price * productA.discount) / 100))
);

export const getBrandNewProducts = () => (
  getProducts()
    .then(result => result
      .sort((productA: Product, productB: Product) => productB.price - productA.price))
);

export const getPhones = () => (
  getProducts()
    .then(products => products.filter((product: Product) => product.type === 'phone'))
);

export const getTablets = () => (
  getProducts()
    .then(products => products.filter((product: Product) => product.type === 'tablet'))
);

export const getAccessories = () => (
  getProducts()
    .then(products => products.filter((product: Product) => product.type === 'accessory'))
);

export const getSuggestedProducts = () => (
  getProducts()
    .then(products => products.sort(() => 0.5 - Math.random()))
);
