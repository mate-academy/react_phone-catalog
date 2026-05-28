import { Phone } from '@/shared/type';

const BASE_URL = './api';

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function getData<T>(url: string): Promise<T> {
  return wait(1200)
    .then(() => fetch(BASE_URL + url))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    });
}

function getPhones() {
  return getData<Phone[]>('/phones.json');
}

export const api = {
  getPhones: getPhones,
}
