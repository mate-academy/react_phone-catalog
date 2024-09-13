import { Product, ProductDetail } from '../typies';

// const BASE_URL = './api'; // if HashRoute
const BASE_URL = '/api'; // if BrowserRoute

const PRODUCTS = 'products.json';
// const PRODUCTS = 'products_error.json';
// const PRODUCTS = 'products_empty.json';

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
