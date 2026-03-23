import { Phone } from '@/types';
import phonesData from '../../public/api/phones.json';

export const usePhones = () => {
  return phonesData as Phone[];
};
