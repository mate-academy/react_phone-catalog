import { Accessories } from '@/types';
import accessoriesData from '../../public/api/accessories.json';

export const useAccessories = () => {
  return accessoriesData as Accessories[];
};
