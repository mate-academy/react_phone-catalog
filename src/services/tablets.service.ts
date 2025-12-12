import { Device } from '../types/Device';

export function getTablets(): Promise<Device[]> {
  const BASE_URL = import.meta.env.BASE_URL;

  return fetch(`${BASE_URL}/api/tablets.json`).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Failed to fetch tablets');
  });
}
