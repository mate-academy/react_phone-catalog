import { Device } from '../types/Device';

export function getPhones(): Promise<Device[]> {
  const BASE_URL = import.meta.env.BASE_URL;

  return fetch(`${BASE_URL}/api/phones.json`).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Failed to fetch phones');
  });
}
