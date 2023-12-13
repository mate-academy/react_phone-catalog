import { DATA_URL } from '../variables';

export const fetchData = () => {
  return fetch(`${DATA_URL}/products.json`).then((response) => {
    return response.json();
  });
};

export const fetchProductDetails = (productId: string) => {
  return fetch(`${DATA_URL}/products/${productId}.json`).then((response) => {
    return response.json();
  });
};
