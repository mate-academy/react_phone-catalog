import { Product } from '../../api/types';

export const formatPrice = (price: number | undefined): string | null => {
  if (price === undefined) {
    return null;
  }

  return `$${Math.round(price)}`;
};

export const getProductPrice = (product: Product): number => {
  const price =
    product.price ??
    product.fullPrice ??
    product.priceRegular ??
    product.priceDiscount;

  return price ?? 0;
};

export const formatMemory = (value: string | undefined): string => {
  if (!value) {
    return '';
  }

  return value.replace(/(\d+)(GB|TB)/i, '$1 $2');
};
