import { axiosInstance } from './axiosInstance';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getAllProducts(endpoint: string) {
  return wait(600)
    .then(() => axiosInstance.get(endpoint))
    .catch(err => {
      throw new Error(err);
    });
}
