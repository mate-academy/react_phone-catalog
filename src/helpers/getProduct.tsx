import { DetailProduct } from '../types/DetailProduct';

const API_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/products/';

export async function getProduct(productId: string): Promise<DetailProduct> {
  return fetch(`${API_URL}/${productId}.json`)
    .then(response => response.json());
}
