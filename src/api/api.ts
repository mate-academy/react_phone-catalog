/* eslint-disable no-console */
import { Category } from '../type/Category';
import { Product } from '../type/Product';
import { ProductInfo } from '../type/ProductInfo';

const BASE_URL = 'api/';
const CATALOG_URL = BASE_URL + 'products.json';

const PRODUCT_URLS = {
  phones: BASE_URL + 'phones.json',
  tablets: BASE_URL + 'tablets.json',
  accessories: BASE_URL + 'accessories.json',
};

export const fetchAllProductsFromApi = () => {
  return fetch(CATALOG_URL)
    .then(response => response.json())
    .then(products => products as Product[])
    .catch(error => {
      console.error('Error fetching products:', error);
      throw error;
    })
    .finally(() => {
      console.log('fetchAllProductsFromApi completed');
    });
};

export const fetchProductByIdFromApi = (id: string, category: Category) => {
  return fetch(PRODUCT_URLS[category])
    .then(response => response.json())
    .then(products => {
      const product = products.find(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (product: ProductInfo) => product.id === id,
      );

      return product;
    })
    .catch(error => {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    })
    .finally(() => {
      console.log(`fetchProductByIdFromApi completed for ID ${id}`);
    });
};
