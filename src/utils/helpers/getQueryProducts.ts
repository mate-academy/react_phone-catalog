import { Product } from '../../types/Product';

export const getQueryProducts = (products: Product[], query: string) => {
  const queryParts = query.toLowerCase().split(' ');

  return products.filter(product => queryParts
    .every(part => product.name
      .toLowerCase()
      .includes(part)));
};
