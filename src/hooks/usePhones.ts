import { Phone } from '@/types';
import phonesData from '@/api/phones.json';

export const usePhones = () => {
  return phonesData as Phone[];
};
