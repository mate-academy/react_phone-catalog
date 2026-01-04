import { Category, Product, ProductDetails } from '../types';

const URL_API = 'api';

export const get = <T>(path: string): Promise<T> => {
  return fetch(URL_API + path, {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Not Ok response');
      }

      return response.json();
    })
    .catch(error => {
      throw new Error(`Error with connect: ${error.message}`);
    });
};

export function getProducts() {
  return get<Product[]>('/products.json');
}

export function getPhones() {
  return get<ProductDetails[]>('/phones.json');
}

export function getTablets() {
  return get<ProductDetails[]>('/tablets.json');
}

export function getAccessories() {
  return get<ProductDetails[]>('/accessories.json');
}

export async function getProductDetails(category: Category, id: string) {
  let products: ProductDetails[];

  switch (category) {
    case 'phones':
      products = await getPhones();
      break;
    case 'tablets':
      products = await getTablets();
      break;
    case 'accessories':
      products = await getAccessories();
      break;
  }

  return products.find(product => product.id === id);
}
