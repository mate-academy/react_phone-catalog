import { DetailsProduct } from '../types/DetailsProduct';

export function getTablets(): Promise<DetailsProduct[]> {
  return fetch('./api/tablets.json').then(response => {
    return response.json();
  });
}
