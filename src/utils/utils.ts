import { PER_PAGE_PARAMS, SORT_PARAMS } from '../config';

export const validateParams = (
  params: URLSearchParams,
  productsLength: number,
): URLSearchParams => {
  const newParams = new URLSearchParams(params.toString());

  const sort = newParams.get('sort');
  const perPage = newParams.get('perPage');
  const page = newParams.get('page');

  if (sort && !Object.keys(SORT_PARAMS).includes(sort)) {
    newParams.delete('sort');
  }

  if (perPage) {
    if (!Object.keys(PER_PAGE_PARAMS).includes(perPage)) {
      newParams.delete('perPage');
      newParams.delete('page');
    }

    if (perPage === 'all') {
      newParams.delete('page');
    } else {
      if (productsLength > 0) {
        const totalPages =
          +perPage > 0 ? Math.ceil(productsLength / +perPage) : 0;

        if (!page || +page < 1 || +page > totalPages) {
          newParams.set('page', '1');
        }
      }
    }
  } else {
    if (page) {
      newParams.delete('page');
    }
  }

  return newParams;
};

export const prettifyItemId = (id: string): string => {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
