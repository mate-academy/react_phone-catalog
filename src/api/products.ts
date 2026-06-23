import { Product, ProductDetail } from './../types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client<Product[]>('products.json');
};

export const getProductDetails = (category: string, itemId: string) => {
  return client<ProductDetail[]>(`${category}.json`).then(
    items => items.find(item => item.id === itemId) || null,
  );
};
