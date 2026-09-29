import {
  DEFAULT_PAGE,
  PER_PAGE_ALL,
  PER_PAGE_OPTIONS,
} from '@/shared/components/Pagination';
import { isSortBy, SelectOption, SORT_BY, SortBy } from '@/shared/types';

// initial values for catalog params
export const SORT_PARAM = 'sort';
export const PER_PAGE_PARAM = 'perPage';
export const PAGE_PARAM = 'page';
export const QUERY_PARAM = 'query';

export const VALID_CATEGORIES = ['phones', 'tablets', 'accessories'] as const;
// category titles
export const CATEGORY_TITLES: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const SORT_OPTIONS: SelectOption[] = [
  { value: SORT_BY.AGE, label: 'Newest' },
  { value: SORT_BY.TITLE, label: 'Alphabetically' },
  { value: SORT_BY.PRICE, label: 'Cheapest' },
];

// process products by query, sort and pagination
export function getSortByFromSearchParams(
  searchParams: URLSearchParams,
): SortBy {
  const sort = searchParams.get(SORT_PARAM);

  return isSortBy(sort) ? sort : SORT_BY.AGE;
}

export function getPageFromSearchParams(searchParams: URLSearchParams): number {
  const page = searchParams.get(PAGE_PARAM);
  const parsedPage = Number(page);

  return parsedPage && !isNaN(parsedPage) && parsedPage > 0
    ? parsedPage
    : DEFAULT_PAGE;
}

export function getPerPageFromSearchParams(
  searchParams: URLSearchParams,
): string {
  const perPage = searchParams.get(PER_PAGE_PARAM);
  const validValues = PER_PAGE_OPTIONS.map(option => option.value);

  return perPage && validValues.includes(perPage) ? perPage : PER_PAGE_ALL;
}
