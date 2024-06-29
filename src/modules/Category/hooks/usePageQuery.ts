import { useSearchParams } from 'react-router-dom';

import { getSelectPage } from '../utils/getSelectPage';
import { QUERY_KEY } from '../variables';

export const usePageQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageQuery = Number(searchParams.get(QUERY_KEY.PAGE) || '') || 1;

  const selectPage = getSelectPage(
    setSearchParams,
    searchParams,
    QUERY_KEY.PAGE,
  );

  return [pageQuery, selectPage] as const;
};
