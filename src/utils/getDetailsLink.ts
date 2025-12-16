import { Product } from '../types/Product';

type ProductWithDetails = Product & {
  detailsLink?: string;
  detailsAvailable?: boolean;
};

export const getDetailsLink = (prod: ProductWithDetails): string => {
  if (!prod) {
    return '/not-found';
  }

  if (typeof prod.detailsLink === 'string') {
    return prod.detailsLink;
  }

  if (prod.detailsAvailable === false) {
    return '/not-found';
  }

  return `/product/${prod.id}`;
};
