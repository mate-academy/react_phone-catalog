import { product } from '../utils/fetchPhones';

export const getProducts = () => {
  return product.get('/products.json');
};

export const getDetails = (productId: string) => {
  return product.get(`/products/${productId}.json`);
};
