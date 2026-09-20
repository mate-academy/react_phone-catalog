import { publicPath } from '../utils/publicPath';
const API_URL = publicPath('api');

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getApi<T>(url: string): Promise<T> {
  return wait(500)
    .then(() => fetch(API_URL + `${url}`))
    .then(response => response.json());
}
