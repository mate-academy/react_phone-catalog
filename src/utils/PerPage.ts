import { BaseProduct } from '../types';

export function PerPage(
  products: BaseProduct[],
  perPage: string,
  page: string,
) {
  if (perPage === 'all') {
    return [...products];
  }

  const perPageNum = Number(perPage);
  const pageNum = Number(page);
  const start = (pageNum - 1) * perPageNum;
  const end = start + perPageNum;

  return [...products].slice(start, end);
}
