import { Product } from '../types/Product';
import { SortOptions } from '../types/SearchParamsOptions';

interface PrepareProductsParams {
  category: string | undefined;
  sort: string | null;
  query: string | null;
  onPage: string;
  currentPage: number;
}

export const getPreparedProducts = (
  products: Product[],
  { category, sort, query, onPage, currentPage }: PrepareProductsParams,
) => {
  let filteredProducts = products;

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      item => item.category === category,
    );
  }

  // Filter by query
  if (query) {
    const normalizedQuery = query.toLowerCase();

    filteredProducts = filteredProducts.filter(item =>
      item.name.toLowerCase().includes(normalizedQuery),
    );
  }

  // Sort the products
  if (sort) {
    filteredProducts.sort((a, b) => {
      switch (sort) {
        case SortOptions.Newest:
          return b.year - a.year;
        case SortOptions.HighPrice:
          return b.price - a.price;
        case SortOptions.LowPrice:
          return a.price - b.price;
        default:
          return 0;
      }
    });
  } else {
    filteredProducts = filteredProducts.sort((a, b) => b.year - a.year);
  }

  // Pagination
  const total = filteredProducts.length;
  const itemsPerPage = onPage === 'All' ? total : +onPage;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, total);
  const visibleItems = filteredProducts.slice(startIndex, endIndex);

  return { total, itemsPerPage, visibleItems };
};
