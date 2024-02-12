import { client } from '../helpers/httpClient';

export function getAllProducts<T>(): Promise<T> {
  return client.get('/products.json');
}
