import { Accessories } from '@/types';
import accessoriesData from '@/api/accessories.json';

export const useAccessories = () => {
  return accessoriesData as Accessories[];
};
