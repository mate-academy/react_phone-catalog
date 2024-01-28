import { client } from './helpers/fetchClient';
import { Product } from './types/Product';
import { ProductDetails } from './types/ProductDetails';

export enum Categories {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
}

export const getProducts = () => {
  return client.get<Product[]>('products.json');
};

export const getProductsByCategoty = (type: Categories) => {
  return client.get<Product[]>('products.json')
    .then((products => products.filter(
      product => product.type === type,
    )));
};

export const getProductDetails = (productId: string) => {
  return client.get<ProductDetails>(`products/${productId}.json`);
};
