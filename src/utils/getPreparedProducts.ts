import { Product } from '../types/Product';

export const getPreparedProducts = (
  products: Product[],
  sortBy: string,
  perPage: string,
  currentPage: number,
) => {
  let preparedProducts = [...products];

  // 1. Сортування
  switch (sortBy) {
    case 'alphabetically':
      preparedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'cheapest':
      preparedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'age':
    default:
      preparedProducts.sort((a, b) => b.year - a.year);
      break;
  }

  const totalItems = preparedProducts.length;

  // 2. Пагінація
  if (perPage !== 'all') {
    const limit = Number(perPage) || 8;
    const startIndex = (currentPage - 1) * limit;

    preparedProducts = preparedProducts.slice(startIndex, startIndex + limit);
  }

  return {
    preparedProducts,
    totalItems,
  };
};
