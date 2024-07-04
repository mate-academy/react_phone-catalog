import { SetURLSearchParams } from 'react-router-dom';
import { getSearchParams } from '../../../utils/getSearchParams';

export const getSelectPage = (
  setSearchParams: SetURLSearchParams,
  searchParams: URLSearchParams,
  searchKey: string,
) => {
  return (pageIndex: number) => {
    setSearchParams(
      getSearchParams(
        {
          [searchKey]: Math.max(pageIndex + 1, 1),
        },
        searchParams,
      ),
      { preventScrollReset: true },
    );

    setTimeout(() => scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };
};
