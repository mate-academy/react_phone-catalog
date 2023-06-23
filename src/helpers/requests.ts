import { Product } from '../types/product';
import { ProductDetails } from '../types/productDetails';

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

const request = <T>(endpoint: string): Promise<T> => {
  return fetch(API_URL + endpoint).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
};

export const getHotPriceProducts = () => {
  return request<Product[]>('/products.json')
    .then(products =>
      products.filter(({ fullPrice, price }) => fullPrice - price > 0))
    .then(itemsWithDiscount =>
      itemsWithDiscount.sort((a, b) => {
        const aDiff = a.fullPrice - a.price;
        const bDiff = b.fullPrice - b.price;

        return bDiff - aDiff;
      }));
};

export const getBrandNewProducts = () => {
  return request<Product[]>('/products.json').then(products =>
    products.sort((a, b) => b.year - a.year));
};

export const getSelectedTypeProducts = (productType: string) => {
  return request<Product[]>('/products.json').then(products =>
    products.filter(({ category }) => category === productType));
};

export const getProductDetails = (productId: string) => {
  return request<ProductDetails>(`/products/${productId}.json`);
};
