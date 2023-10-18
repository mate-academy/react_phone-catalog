import { ProductType } from '../types/Product';
import { ProductInfoType } from '../types/ProductInfoType';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<ProductType[]>('products.json');
};

export const getProductInfo = (product: string) => {
  return client.get<ProductInfoType>(`products/${product}.json`);
};
