import { DetailsProduct } from '../types/DetailsProduct';

export function getPhones(): Promise<DetailsProduct[]> {
  return fetch('./api/phones.json').then(response => {
    return response.json();
  });
}
