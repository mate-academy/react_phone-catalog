import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { client } from '../utils/fetchClient';
import { getFinalPrice } from '../utils/productsHelper';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getProductById = (productId: string) => {
  return client.get<Product[]>('/products.json')
    .then(products => products.find(product => product.id === productId)
    || null);
};

export const getProductDetails = (productId: string) => {
  return client.get<ProductDetails>(`/products/${productId}.json`);
};

export const getHotPriceProducts = () => {
  return client.get<Product[]>('/products.json')
    .then(products => products
      .filter(product => !!product.discount)
      .sort((prod1, prod2) => {
        return (prod2.price - getFinalPrice(prod2.price, prod2.discount))
        - (prod1.price - getFinalPrice(prod1.price, prod1.discount));
      }));
};

export const getBrandNewProducts = () => {
  return client.get<Product[]>('/products.json')
    .then(products => products
      .filter(product => !product.discount)
      .sort((product1, product2) => product2.price - product1.price));
};

export const getSuggestedProducts = (currentProductId?: string) => {
  return client.get<Product[]>('/products.json')
    .then(products => products
      .filter((product => product.id !== currentProductId))
      .sort(() => 0.5 - Math.random())
      .slice(0, 12));
};

export const getPhones = () => {
  return client.get<Product[]>('/products.json')
    .then(products => products
      .filter(product => product.type === 'phone'));
};

export const getTablets = () => {
  return client.get<Product[]>('/products.json')
    .then(products => products
      .filter(product => product.type === 'tablet'));
};

export const getAccessories = () => {
  return client.get<Product[]>('/products.json')
    .then(products => products
      .filter(product => product.type === 'accessory'));
};
