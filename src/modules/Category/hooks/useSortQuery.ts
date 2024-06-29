import { useSearchParams } from 'react-router-dom';

import { getValidOption } from '../../../utils/getValidOption';
import { getHandleSortChange } from '../utils/getHandleSortChange';
import {
  QUERY_KEY,
  SORT_SELECT_OPTIONS,
  sortSelectDefaultOption,
} from '../variables';

export const useSortQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOption = getValidOption(
    SORT_SELECT_OPTIONS,
    searchParams.get(QUERY_KEY.SORT) || '',
    sortSelectDefaultOption,
  );

  const handleSortChange = getHandleSortChange(
    setSearchParams,
    searchParams,
    QUERY_KEY.SORT,
  );

  return [sortOption, handleSortChange] as const;
};
