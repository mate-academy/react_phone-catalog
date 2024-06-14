import { SetURLSearchParams } from 'react-router-dom';

import { getInRange } from '../../../utils/getInRange';
import { getSearchParams } from '../../../utils/getSearchParams';

export const getSelectPage = (
  setSearchParams: SetURLSearchParams,
  searchParams: URLSearchParams,
  searchKey: string,
  numberOfPages: number,
) => {
  return (pageIndex: number) => {
    setSearchParams(
      getSearchParams(
        {
          [searchKey]: getInRange(pageIndex + 1, 1, numberOfPages),
        },
        searchParams,
      ),
      { preventScrollReset: true },
    );

    setTimeout(() => scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };
};
