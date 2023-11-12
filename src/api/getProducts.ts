import axios from 'axios';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products';

export async function getAllProducts() {
  const products = await axios.get(`${BASE_URL}.json`);

  return products.data;
}

export async function getDetails(path: string) {
  const products = await axios.get(`${BASE_URL}/${path}.json`);

  return products.data;
}
