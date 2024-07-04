import { SetURLSearchParams } from 'react-router-dom';

import { Params, getSearchParams } from '../../../utils/getSearchParams';

export const getSetSearchQuery = (
  setSearchParams: SetURLSearchParams,
  searchParams: URLSearchParams,
  searchKey: string,
  extraParams: Params,
) => {
  return (search: string) => {
    setSearchParams(
      getSearchParams(
        {
          [searchKey]: search.length ? search : null,
          ...extraParams,
        },
        searchParams,
      ),
      { preventScrollReset: true },
    );
  };
};
