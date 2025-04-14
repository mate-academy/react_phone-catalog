import { axiosInstance } from './axiosInstance';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getAllProducts(endpoint: string) {
  return wait(300).then(() => axiosInstance.get(endpoint));
}
