import { CardDetail } from '../types/CardDetail';
import { Product } from '../types/Product';

const API_URL = './products.json';
const API_URL_PRODUCT = './products/';

export const getProducts = (): Promise<Product[]> => {
  return fetch(API_URL)
    .then(response => response.json());
};

export const getCardDetail = (productId: string): Promise<CardDetail> => {
  return fetch(`${API_URL_PRODUCT + productId}.json`)
    .then(response => response.json());
};
