import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { SearchLabelsType } from '../types/SearchLabelsType';

function normalizeParams(params: SearchParams) {
  const newParams = { ...params };

  if (SearchLabelsType.ItemsPerPage in newParams) {
    newParams[SearchLabelsType.PageCatalog] = null;
  }

  return newParams;
}

export function useUpdateSearchParams() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const updateSearch = (params: SearchParams) => {
    const newParams = normalizeParams(params);

    navigate(
      { search: getSearchWith(searchParams, newParams) },
      {
        state: { keepScroll: true },
      },
    );
  };

  return updateSearch;
}
