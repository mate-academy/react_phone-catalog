import { Product, ProductDetail } from '../typies';

const BASE_URL = './api';
const PRODUCTS = 'products.json';

export const getProducts = async (): Promise<Product[]> => {
  return fetch(`${BASE_URL}/${PRODUCTS}`).then(response => response.json());
};

export const getProductDetails = async (
  productURL: string,
): Promise<ProductDetail[]> => {
  return fetch(`${BASE_URL}/${productURL}.json`).then(response =>
    response.json(),
  );
};
