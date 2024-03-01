import { client } from '../helpers/fetchClient';
import { Product } from '../types/Product';

export const getProducts = () => {
  return client.get<Product[]>('api/products.json');
};

// export const getProductDetails = (productId: string) => {
//   return client.get<ProductDetails>(`products/${productId}.json`);
// };
