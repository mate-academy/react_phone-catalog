import type { Accessory } from '../types/Accessory';
import { wait } from './wait';

export const getAccessories = async (): Promise<Accessory[]> => {
  await wait(200);

  const response = await fetch(
    `${import.meta.env.BASE_URL}api/accessories.json`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch accessory');
  }

  return response.json();
};
