import { SortOption } from '../types/SortOption';

const DEFAULT_SORT: SortOption = 'age';

export const getSortFromParams = (params: URLSearchParams): SortOption => {
  const sort = params.get('sort');

  if (sort === 'age' || sort === 'title' || sort === 'price') {
    return sort;
  }

  return DEFAULT_SORT;
};
