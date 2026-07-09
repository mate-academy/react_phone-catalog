import { PhoneType } from '../features/types/phoneType';
import { getData } from '../features/utils/client';

export async function getPhones(): Promise<PhoneType[]> {
  const phones = await getData<PhoneType[]>('/api/phones.json');

  return phones;
}
