import { client } from '../helpers/httpClient';

export function getAllProducts<T>(): Promise<T> {
  return client.get('/_new/products.json');
}

export function getProduct<T>(id: string): Promise<T> {
  return client.get(`/_new/products/${id}.json`);
}

export function getPhones<T>(): Promise<T[]> {
  return client.get('/_new/products.json');
}
