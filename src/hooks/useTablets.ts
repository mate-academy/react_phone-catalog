import { Tablet } from '@/types';
import tabletsData from '@/api/tablets.json';

export const useTablets = () => {
  return tabletsData as Tablet[];
};
