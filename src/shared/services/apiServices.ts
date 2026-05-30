import { axiosInstance } from './axiosInstance';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getAllProducts(path: string) {
  return wait(600)
    .then(() => axiosInstance.get(path))
    .catch(error => {
      throw new Error(error);
    });
}
