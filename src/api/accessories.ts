import { DetailsProduct } from '../types/DetailsProduct';

export function getAccessories(): Promise<DetailsProduct[]> {
  return fetch('./api/accessories.json').then(response => {
    return response.json();
  });
}
