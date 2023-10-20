import { client } from './helpers/httpClient';
import { Categories } from './types/Categories';
import { Product } from './types/Product';
import { ProductDetails } from './types/ProductDetails';

export const getProducts = () => {
  return client.get<Product[]>('products.json');
};

export const getProductsByCategoty = (type: Categories) => {
  return client.get<Product[]>('products.json')
    .then((products => products.filter(
      product => product.category === type,
    )));
};

export const getProductDetails = (productId: string) => {
  return client.get<ProductDetails>(`products/${productId}.json`);
};
