import { client } from '../helpers/fetchClient';
import { Category, ProductDetails } from '../types';
import { Product } from '../types/Product';

export const getProducts = () => {
  return client.get<Product[]>('api/products.json');
};

export const getProductDetails = (category: Category, productId: string) => {
  return client.get<ProductDetails[]>(`api/${category}.json`)
    .then(products => products.find(item => item.id === productId));
};
