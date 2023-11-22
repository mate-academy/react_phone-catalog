import { Product } from '../types/Product';

export const filterProducts = (
  products: Product[],
  searchQuery: string,
) => {
  if (!searchQuery) {
    return products;
  }

  const formattedSearchQuery = searchQuery.trim().toLowerCase().split(' ');

  return products.filter(({ name }) => {
    const normalizedProductName = name.toLowerCase().replace(/\s/g, '');

    return formattedSearchQuery
      .every(searchTerm => normalizedProductName.includes(searchTerm));
  });
};
