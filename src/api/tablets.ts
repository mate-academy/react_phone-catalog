import type { TabletDetails } from '../types';

export const getTablets = async (): Promise<TabletDetails[]> => {
  const response = await fetch('./api/tablets.json');

  if (!response) {
    throw new Error('Failed to fetch tablets');
  }

  return response.json();
};
