import { getValidNumber } from '../../../../helpers/getValidNumber';
import { getInRange } from '../../../../helpers/getInRange';
import { useSingleSearchParam } from '../../../../hooks/useSingleSearchParam';
import { TAKE_SELECT_DATA } from '../../variables';

export const usePagination = (numberOfProducts: number) => {
  const [takeSearchParam] = useSingleSearchParam('take');
  const [currentPage, setPage] = useSingleSearchParam('page');

  const take = (() => {
    switch (takeSearchParam) {
      case TAKE_SELECT_DATA['4']:
        return +TAKE_SELECT_DATA['4'];
      case TAKE_SELECT_DATA['8']:
        return +TAKE_SELECT_DATA['8'];
      case TAKE_SELECT_DATA.all:
        return numberOfProducts;
      default:
        return +TAKE_SELECT_DATA['16'];
    }
  })();

  const lastPage = getValidNumber(Math.ceil(numberOfProducts / take), 1);

  const validCurrentPage = getInRange(
    getValidNumber(currentPage, 1),
    1,
    lastPage,
  );

  const selectPage = (newPage: number) => {
    const validNewPage = getInRange(newPage, 1, lastPage);

    setPage(String(validNewPage));
  };

  return {
    selectPage,
    currentPage: validCurrentPage,
    lastPage,
  };
};
