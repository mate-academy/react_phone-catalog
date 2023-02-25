import { client } from '../helpers/fetchClients';
import { Product } from '../types/Product';
import { DetailsOfProducts } from '../types/DetailsOfProduct';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getProductsDetails = (productId: string) => {
  return client.get<DetailsOfProducts>(`/products/${productId}.json`);
};
