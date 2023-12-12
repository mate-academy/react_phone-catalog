import { client } from '../helpers/httpClient';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const getProducts = () => {
  return client.get<Product[]>('products.json');
};

export const getPhones = () => {
  return getProducts()
    .then((products: Product[]) => {
      return [...products].filter(item => item.category === 'phones');
    });
};

export const getTablets = () => {
  return getProducts()
    .then((products: Product[]) => {
      return [...products].filter(item => item.category === 'tablets');
    });
};

export const getAccessories = () => {
  return getProducts()
    .then((products: Product[]) => {
      return [...products].filter(item => item.category === 'accessories');
    });
};

export const getProductDetails = (productId: string) => {
  return client.get<ProductDetails>(`products/${productId}.json`);
};
