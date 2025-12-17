import { Device } from '../types/Device';

export function getTablets(): Promise<Device[]> {
  return fetch('/api/tablets.json').then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Failed to fetch tablets');
  });
}
