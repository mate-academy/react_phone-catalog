import { getClient } from '../utils/ProductsProvider';

export const getProducts = () => {
  return getClient.get('/api/products.json');
};
