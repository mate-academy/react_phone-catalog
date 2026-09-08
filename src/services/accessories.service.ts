import { Device } from '../types/Device';

export function getAccessories(): Promise<Device[]> {
  return fetch('./api/accessories.json').then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Failed to fetch accessories');
  });
}
