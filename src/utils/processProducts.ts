import { Product, SortBy } from '@/shared/types';
import { filterProductsByQuery } from './filterProductsByQuery';
import { getSortBySelected } from './getSortBySelected';

interface ProcessOptions {
  query?: string;
  sortBy?: SortBy;
  page?: number;
  perPage?: number | 'all';
}

interface ProcessResult {
  totalCount: number; // count of products after filtering and sorting
  processedProducts: Product[]; // the final list of products after filtering, sorting, and pagination
}

export function processProducts(
  products: Product[],
  { query = '', sortBy, page = 1, perPage = 'all' }: ProcessOptions,
): ProcessResult {
  // Step 1: Filtering
  const filtered = filterProductsByQuery(products, query);
  const totalCount = filtered.length;

  // Step 2: Sorting
  const sorted = sortBy ? getSortBySelected(filtered, sortBy) : filtered;

  // Step 2: Pagination
  if (perPage === 'all') {
    return { totalCount, processedProducts: sorted };
  }

  const perPageNum = Number(perPage);
  const startIndex = (page - 1) * perPageNum;
  const processedProducts = sorted.slice(startIndex, startIndex + perPageNum);

  return { totalCount, processedProducts };
}
