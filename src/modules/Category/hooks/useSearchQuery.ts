import { useSearchParams } from 'react-router-dom';
import { QUERY_KEY } from '../variables';
import { getSetSearchQuery } from '../utils/getSetSearchQuery';

export const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQueryParam = searchParams.get(QUERY_KEY.SEARCH) || '';

  const setSearchQuery = getSetSearchQuery(
    setSearchParams,
    searchParams,
    QUERY_KEY.SEARCH,
    { [QUERY_KEY.PAGE]: null },
  );

  return [searchQueryParam, setSearchQuery] as const;
};
