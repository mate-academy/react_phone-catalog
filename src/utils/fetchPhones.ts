import { getPhones } from './getData';
import { Phone } from '../types/Phone';

export const fetchPhones = async (): Promise<Phone[]> => {
  return getPhones();
};
