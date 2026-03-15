import { Product } from '../../types/Product';

export const getSortedProducts = (products: Product[], sortType: string) => {
  const copy = [...products];

  switch (sortType) {
    case 'title':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return copy.sort((a, b) => a.price - b.price);
    default:
      return copy.sort((a, b) => b.year - a.year);
  }
};

export const getVisibleProducts = (
  products: Product[],
  page: number,
  perPage: string | number,
) => {
  const limit = perPage === 'all' ? products.length : Number(perPage);
  const startIndex = (page - 1) * limit;

  return products.slice(startIndex, startIndex + limit);
};
