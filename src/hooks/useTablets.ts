import { Tablet } from '@/types';
import tabletsData from '../../public/api/tablets.json';

export const useTablets = () => {
  return tabletsData as Tablet[];
};
