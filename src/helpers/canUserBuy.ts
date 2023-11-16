import { Sizes } from '../types/Good';

export const canUserBuy = (
  sizes: Sizes[] | undefined,
  selectedSize: string | null,
): boolean => {
  if (!sizes?.length) {
    return true;
  }

  if (sizes.length && selectedSize) {
    return true;
  }

  return false;
};
