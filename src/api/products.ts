import { getClient } from '../utils/ProductsProvider';

export const getProducts = () => {
  return getClient.get('/api/products.json');
};

export const getOldProducts = () => {
  return getClient.get('/_old/v1/api/products/products.json');
};

export const getOldOffer = () => {
  return getClient.get(`/_old/v1/api/products/allProducts.json`);
};

export const getPhones = () => {
  return getClient.get('/api/phones.json');
};

export const getTablets = () => {
  return getClient.get('/api/tablets.json');
};

export const getAccessories = () => {
  return getClient.get('/api/accessories.json');
};
