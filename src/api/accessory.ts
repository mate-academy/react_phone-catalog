import { client } from './fetchClient';
import { Accessory } from '../shared/types';

export function getAccessories(): Promise<Accessory[]> {
  return client.get<Accessory[]>('./api/accessories.json');
}

export const getAccessoryById = async (
  id: string,
): Promise<Accessory | undefined> => {
  const accessories = await getAccessories();

  return accessories.find(accessory => accessory.id === id);
};
