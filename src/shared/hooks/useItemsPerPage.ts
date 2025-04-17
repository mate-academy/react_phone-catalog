import { useMemo } from 'react';

export function useItemsPerPage(
  itemsOnPageParam: string,
  isAllSelected: boolean,
) {
  return useMemo(() => {
    return isAllSelected ? Infinity : Number(itemsOnPageParam);
  }, [itemsOnPageParam, isAllSelected]);
}
