import axios from 'axios';

const BASE_URL = './_new/products';

export async function getAllProducts() {
  const products = await axios.get(`${BASE_URL}.json`);

  return products.data;
}

export async function getDetails(path: string) {
  const products = await axios.get(`${BASE_URL}/${path}.json`);

  return products.data;
}
