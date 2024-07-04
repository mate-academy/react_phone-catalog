import { SetURLSearchParams } from 'react-router-dom';

import { getSearchParams, Params } from '../../../utils/getSearchParams';
import { TAKE_SELECT_OPTIONS } from '../variables';

export const getHandleTakeChange = (
  setSearchParams: SetURLSearchParams,
  searchParams: URLSearchParams,
  searchKey: string,
  extraParams: Params,
) => {
  return (value: unknown) => {
    const foundTakeOption = TAKE_SELECT_OPTIONS.find(item => item === value);

    if (!foundTakeOption) {
      return;
    }

    setSearchParams(
      getSearchParams(
        {
          [searchKey]: foundTakeOption.default ? null : foundTakeOption.value,
          ...extraParams,
        },
        searchParams,
      ),
      { preventScrollReset: true },
    );
  };
};
