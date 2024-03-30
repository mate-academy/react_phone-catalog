import { Product } from '../types/products';
import { client } from '../utils/axiosClient';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getBrandNewModels = () => {
  return getProducts().then(products =>
    products.sort((a, b) => b.fullPrice - a.fullPrice),
  );
};

export const getHotPriceProducts = () => {
  return getProducts().then(products =>
    products.sort((a, b) => b.fullPrice - b.price - a.fullPrice - a.price),
  );
};
