import { Device } from '../types/Device';

export function getPhones(): Promise<Device[]> {
  return fetch('./api/phones.json').then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Failed to fetch phones');
  });
}
