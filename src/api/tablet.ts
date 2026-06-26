import { client } from './fetchClient';
import { Tablet } from '../shared/types';

export function getTablets(): Promise<Tablet[]> {
  return client.get<Tablet[]>('./api/tablets.json');
}

export const getTabletById = async (
  id: string,
): Promise<Tablet | undefined> => {
  const tablets = await getTablets();

  return tablets.find(tablet => tablet.id === id);
};
