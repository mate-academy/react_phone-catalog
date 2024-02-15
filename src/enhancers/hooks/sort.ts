import { useCallback, useMemo } from 'react';
import { SearchParam } from '../../definitions/enums/Router';
import { SortQuery } from '../../api/products/server/types';
import { useSearchParams } from './searchParams';

export enum SortBy {
  All = 'All',
  Name = 'Name',
  Age = 'Age',
  Price = 'Price',
}

function getSortQueryBy(sortBy: SortBy): SortQuery {
  switch (sortBy) {
    case SortBy.All: return SortQuery.Unsorted;
    case SortBy.Name: return SortQuery.Alphabet;
    case SortBy.Age: return SortQuery.Newest;
    case SortBy.Price: return SortQuery.Cheapest;
    default: throw new Error('Unknown SortBy');
  }
}

function prepareSortBy(rawSortBy: string | null) {
  if (rawSortBy === null) {
    return SortBy.All;
  }

  return Object.hasOwn(SortBy, rawSortBy) ? (rawSortBy as SortBy) : SortBy.All;
}

type SortByArray = (keyof typeof SortBy)[];

type ReturnType = [
  SortBy,
  SortByArray,
  (rawNewSortBy: string) => void,
  SortQuery,
];

export function useProductsSort(): ReturnType {
  const searchParams = useSearchParams();
  const sortBy = prepareSortBy(searchParams.get(SearchParam.Sort));
  let sortQuery = getSortQueryBy(sortBy);

  const sortByOptions: SortByArray = useMemo(
    () => ['All', 'Name', 'Age', 'Price'], [],
  );

  const setSortBy = useCallback((rawNewSortBy: string) => {
    const newSortBy = prepareSortBy(rawNewSortBy);

    sortQuery = getSortQueryBy(newSortBy);
    searchParams.set(SearchParam.Sort, newSortBy);
  }, [searchParams]);

  return [sortBy, sortByOptions, setSortBy, sortQuery];
}
