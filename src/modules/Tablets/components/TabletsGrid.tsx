'use client';

import { PhonesGridWithPaginationProps, Product } from '@/types/Product';
import { TabletsGridWithPagination } from './TabletsGridWithPagination';

const getSortFunction = (sortBy: string) => {
  switch (sortBy) {
    case 'Alphabetically':
      return (a: Product, b: Product) => a.name.localeCompare(b.name);
    case 'Cheapest':
      return (a: Product, b: Product) => a.priceRegular - b.priceDiscount;
    case 'Newest':
      return (a: Product, b: Product) => {
        const getModelNumber = (id: string) => {
          const match = id.match(/iphone-(\d+)/);
          return match ? parseInt(match[1], 10) : 0;
        };
        return getModelNumber(b.namespaceId) - getModelNumber(a.namespaceId);
      };
    default:
      return undefined;
  }
};

export const TabletsGrid = ({
  sortBy,
  itemsOnPage,
  currentPage,
  setCurrentPage,
}: PhonesGridWithPaginationProps) => {
  return (
    <TabletsGridWithPagination
      sortFunction={getSortFunction(sortBy)}
      itemsOnPage={itemsOnPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      sortBy={''}
    />
  );
};
