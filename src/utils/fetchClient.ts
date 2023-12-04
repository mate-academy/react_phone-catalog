import { BASE_URL } from './constants';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function getProducts<T>(address: string): Promise<T> {
  return wait(300)
    .then(() => fetch(`${BASE_URL}${address}`))
    .then(response => response.json());
}
