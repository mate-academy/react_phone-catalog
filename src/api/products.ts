import { getClient } from '../utils/ProductsProvider';

export const getProducts = () => {
  return getClient.get('/api/products.json');
};

export const getHotPricesProducts = () => {
  return getClient.get('/_old/v1/api/products.json');
};

export const getPhones = () => {
  return getClient.get('/api/phones.json');
};
