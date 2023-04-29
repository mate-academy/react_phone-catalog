import { CardDetail } from '../types/CardDetail';
import { Product } from '../types/Product';

const API_URL = './products.json';
const API_URL_PRODUCT = './products/';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getProducts = (): Promise<Product[]> => {
  return wait(300)
    .then(() => fetch(API_URL))
    .then(response => response.json());
};

export const getCardDetail = (productId: string): Promise<CardDetail> => {
  return wait(300)
    .then(() => fetch(`${API_URL_PRODUCT + productId}.json`))
    .then(response => response.json());
};
