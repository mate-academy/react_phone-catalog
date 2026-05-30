import { useMemo } from 'react';
import { SortTypes } from '../types/sort';
import { getSortedProducts } from '../features/getSortedProducts';
import { MergedDevice } from '../types/devices';

export const useSortedProducts = (sort: SortTypes, devices: MergedDevice[]) => {
  return useMemo(() => getSortedProducts(sort, devices), [sort, devices]);
};
