import { SetURLSearchParams } from 'react-router-dom';

import { getSearchParams } from '../../../utils/getSearchParams';
import { SORT_SELECT_OPTIONS } from '../variables';

export const getHandleSortChange = (
  setSearchParams: SetURLSearchParams,
  searchParams: URLSearchParams,
  searchKey: string,
) => {
  return (value: unknown) => {
    const foundSortOption = SORT_SELECT_OPTIONS.find(item => item === value);

    if (!foundSortOption) {
      return;
    }

    setSearchParams(
      getSearchParams(
        {
          [searchKey]: foundSortOption.default ? null : foundSortOption.value,
        },
        searchParams,
      ),
      { preventScrollReset: true },
    );
  };
};
