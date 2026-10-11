import type { PhoneDetails } from '../types';

export const getPhones = async (): Promise<PhoneDetails[]> => {
  const response = await fetch('./api/phones.json');

  if (!response) {
    throw new Error('Failed to fetch phones');
  }

  return response.json();
};
