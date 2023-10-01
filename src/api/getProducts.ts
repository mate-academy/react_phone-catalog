import axios from 'axios';

export async function getAllProducts(path: string) {
  const products = await axios.get(path);

  return products.data;
}
