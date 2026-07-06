import { PerPage } from '../types/PerPage';

const DEFAULT_PER_PAGE: PerPage = 'all';

export const getPerPageFromParams = (params: URLSearchParams): PerPage => {
  const perPageFromParams = params.get('perPage');

  if (perPageFromParams === null) {
    return DEFAULT_PER_PAGE;
  }

  if (perPageFromParams === 'all') {
    return 'all';
  }

  const perPageNumber = Number(perPageFromParams);

  if (Number.isNaN(perPageNumber) || perPageNumber <= 0) {
    return DEFAULT_PER_PAGE;
  }

  return perPageNumber;
};
