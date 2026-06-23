import { ProductDetails } from '../types/ProductDetails';

const BASE_URL = './api/';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function productAll() {
  return fetch(BASE_URL + 'products.json').then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

function request(url: string, productID: string) {
  return wait(500)
    .then(() => fetch(BASE_URL + url + '.json'))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json().then();
    })
    .then((products: ProductDetails[]) =>
      products.find(product => product.id === productID),
    );
}

export const getProduct = (category: string, productID: string) => {
  return request(category, productID);
};

export const getProductAll = () => {
  return productAll();
};
