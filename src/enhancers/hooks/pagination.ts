import { useCallback } from 'react';
import { SearchParam } from '../../definitions/enums/Router';
import { SearchParamsWithRouter, useSearchParams } from './searchParams';
import { PerPageOption } from '../../api/products/server/types';

type Options = {
  perPageOptions: PerPageOption[],
  itemsAmount: number,
  defaultIndex?: number,
};

type ReturnType = [
  number,
  (newPage: number) => void,
  PerPageOption,
  (newPerPage: PerPageOption) => void,
];

function getPage(searchParams: SearchParamsWithRouter) {
  const page = +(searchParams.get(SearchParam.Page) || 1);

  return Number.isNaN(page) ? 1 : page;
}

function getPerPage(searchParams: SearchParamsWithRouter, options: Options) {
  const { perPageOptions, defaultIndex = 0 } = options;
  const defaultOption = perPageOptions[defaultIndex];
  const perPageRaw = searchParams.get(SearchParam.PerPage) || defaultOption;

  if (perPageRaw !== 'All' && Number.isNaN(+perPageRaw)) {
    return defaultOption;
  }

  const perPage = perPageRaw === 'All' ? 'All' : +perPageRaw;

  if (!perPageOptions.includes(perPage)) {
    return defaultOption;
  }

  return perPage;
}

export function usePagination(options: Options): ReturnType {
  const { itemsAmount } = options;
  const searchParams = useSearchParams();

  const page = getPage(searchParams);
  const setPage = useCallback((newPage: number) => {
    searchParams.set(SearchParam.Page, newPage);
  }, [searchParams]);

  const perPage = getPerPage(searchParams, options);
  const setPerPage = useCallback((newPerPage: PerPageOption) => {
    const page = getPage(searchParams);

    const currentPageExist = !(newPerPage !== 'All' && newPerPage * page > itemsAmount);
    const itemsExist = itemsAmount > 0;
    const needSetUserOnLastPage = !currentPageExist && itemsExist;

    if (needSetUserOnLastPage) {
      const lastPage = Math.ceil(itemsAmount / newPerPage);

      searchParams.multiSet([
        [SearchParam.Page, lastPage],
        [SearchParam.PerPage, newPerPage],
      ]);
    } else {
      searchParams.set(SearchParam.PerPage, newPerPage);
    }
  }, [searchParams, itemsAmount]);

  return [page, setPage, perPage, setPerPage];
}
