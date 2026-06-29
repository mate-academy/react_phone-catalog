import { VALID_CATEGORIES } from '../router/constants';
import { Category } from '../types/ProductCategory';

export const isValidCategory = (value: Category) => {
  if (!value) {
    return false;
  }

  return VALID_CATEGORIES.includes(value);
};
