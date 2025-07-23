import type { Phone } from '../types/Phone';
import { wait } from './wait';

export const getPhones = async (): Promise<Phone[]> => {
  await wait(200);

  const response = await fetch(`${import.meta.env.BASE_URL}api/phones.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch phones');
  }

  return response.json();
};
