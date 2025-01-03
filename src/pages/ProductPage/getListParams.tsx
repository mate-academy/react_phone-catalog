import { DEFAULT_SORT, DEFAULT_PAGE } from './ProductPage';

export function getListParams(searchParams: URLSearchParams) {
  const sortBy = searchParams.get('sortBy') || DEFAULT_SORT;
  const perPage = searchParams.get('perPage') || DEFAULT_PAGE;
  const currentPage = searchParams.get('page') || '1';
  return { sortBy, perPage, currentPage };
}
