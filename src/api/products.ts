import { Product } from '../types/Product';
import { client } from './fetchClient';
import { ProductDetails } from '../types/ProductDetails';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getPhones = () => {
  return getProducts().then((prducts) => {
    return [...prducts].filter(prduct => prduct.category === 'phones');
  });
};

export const getTablets = () => {
  return getProducts().then((prducts) => {
    return [...prducts].filter(prduct => prduct.category === 'tablets');
  });
};

export const getAccessories = () => {
  return getProducts().then((prducts) => {
    return [...prducts].filter(prduct => prduct.category === 'accessories');
  });
};

export const getProductDetails = (id: string) => {
  return client.get<ProductDetails>(`/products/${id}.json`);
};
