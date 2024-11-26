import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { client } from '../utils/httpClient';

export const getProducts = () => {
  return client.get<Product[]>('/api/products.json');
};

export const getProductById = (category: string, itemId: string) => {
  return client
    .get<ProductDetails[]>(`/api/${category}.json`)
    .then(products => {
      const product = products.find(p => p.id === itemId);

      return product;
    })
    .catch(() => {
      throw Error('Product not found');
    });
};
