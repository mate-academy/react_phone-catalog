import { CATEGORY_LIST } from '@/const';
import { useAccessories } from './useAccessories';
import { usePhones } from './usePhones';
import { useTablets } from './useTablets';

export type CategoriesCounts = {
  [CATEGORY_LIST.accessories]: number;
  [CATEGORY_LIST.phones]: number;
  [CATEGORY_LIST.tablets]: number;
};

export const useCategoryCount = (): CategoriesCounts => {
  return {
    [CATEGORY_LIST.accessories]: useAccessories().length,
    [CATEGORY_LIST.phones]: usePhones().length,
    [CATEGORY_LIST.tablets]: useTablets().length,
  };
};
