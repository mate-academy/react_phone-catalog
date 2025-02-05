import { useSearchParams } from 'react-router-dom';
import { SortOption } from '../types/enums';
import { getAmountOfPages } from '../functions';
import { Pagination } from '../types/types';
import { useCallback } from 'react';

enum SearchParamName {
  Sort = 'sort',
  PerPage = 'perPage',
  Page = 'page',
  Query = 'query',
}

enum SortParam {
  Age = 'age',
  Price = 'price',
  Title = 'title',
}

const sortOptionMap = {
  [SortOption.Age]: SortParam.Age,
  [SortOption.Price]: SortParam.Price,
  [SortOption.Title]: SortParam.Title,
  [SortParam.Age]: SortOption.Age,
  [SortParam.Price]: SortOption.Price,
  [SortParam.Title]: SortOption.Title,
};

type ListControls = {
  sort?: SortOption;
  pagination?: Pagination;
  page?: number;
  search?: string;
};

const getSort = (searchParams: URLSearchParams): SortOption => {
  const sort = searchParams.get(SearchParamName.Sort) || SortOption.Title;

  if (Object.values(SortParam).includes(sort as SortParam)) {
    return sortOptionMap[sort as SortParam];
  } else {
    return SortOption.Title;
  }
};

const getPagination = (searchParams: URLSearchParams): Pagination => {
  const pagination: Pagination = parseInt(
    searchParams.get(SearchParamName.PerPage) || '0',
  );

  return pagination > 0 ? pagination : null;
};

const getSearch = (searchParams: URLSearchParams): string =>
  searchParams.get(SearchParamName.Query) || '';

const getPage = (
  searchParams: URLSearchParams,
  amountOfPages?: number,
): number => {
  const page = parseInt(searchParams.get(SearchParamName.Page) || '1');

  if (isNaN(page) || page < 1) {
    return 1;
  }

  if (amountOfPages) {
    return page > amountOfPages ? amountOfPages : page;
  }

  return page;
};

export const useListControls = (amountOfItems?: number) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = getSort(searchParams);
  const pagination = getPagination(searchParams);
  const search = getSearch(searchParams);

  const page = getPage(
    searchParams,
    amountOfItems && getAmountOfPages(pagination, amountOfItems),
  );

  const setListControls = useCallback(
    (controls: ListControls) =>
      setSearchParams(params => {
        if (controls.sort !== undefined) {
          params.set(SearchParamName.Sort, sortOptionMap[controls.sort]);

          if (controls.sort === SortOption.Title) {
            params.delete(SearchParamName.Sort);
          }
        }

        if (controls.pagination) {
          params.set(SearchParamName.PerPage, controls.pagination.toString());
        } else if (controls.pagination === null) {
          params.delete(SearchParamName.PerPage);
        }

        if (controls.search) {
          params.set(SearchParamName.Query, controls.search);
        } else if (controls.search === '') {
          params.delete(SearchParamName.Query);
        }

        if (controls.page) {
          params.set(SearchParamName.Page, controls.page.toString());

          if (controls.page === 1) {
            params.delete(SearchParamName.Page);
          }
        }

        return params;
      }),
    [setSearchParams],
  );

  return { sort, pagination, page, search, setListControls };
};
