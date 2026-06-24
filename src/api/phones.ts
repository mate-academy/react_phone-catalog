import { client } from './fetchClient';
import { Phone } from '../shared/types';

export function getPhones(): Promise<Phone[]> {
  return client.get<Phone[]>('./api/phones.json');
}

export const getPhoneById = async (id: string): Promise<Phone | undefined> => {
  const phones = await getPhones();

  return phones.find(phone => phone.id === id);
};
