import { createNumeratedArray } from '../../../../mocks/Functions/functions';

interface UsePaginationProps {
  totalItems: Product[];
  currentPage: number;
  itemsPerPage: number;
  rangeOfVisiblePages?: number;
}

export const usePagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  rangeOfVisiblePages = 2,
}: UsePaginationProps) => {
  const pages = itemsPerPage
    ? createNumeratedArray(Math.ceil(totalItems.length / itemsPerPage))
    : [0];

  const visiblePages = pages.filter(page => {
    if (
      currentPage + rangeOfVisiblePages >= page &&
      page >= currentPage - rangeOfVisiblePages
    ) {
      return true;
    }

    return false;
  });

  const disabledStates = {
    moveLeft: currentPage === 0,
    moveRigth: currentPage === Math.ceil(totalItems.length / itemsPerPage) - 1,
  };

  return {
    pages,
    visiblePages,
    disabledStates,
  };
};
