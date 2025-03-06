import { useContext, useState } from 'react';

import { PerPage } from '../../../modules/Categories/Products/enums/PerPage';
import { SortBy } from '../../../modules/Categories/Products/enums/SortBy';
import { SearchContext } from '../../SearchContext';
import { DSContext } from '../DSContext';
import { DSContextType } from '../types/DSContextType';

interface Props {
  children: React.ReactNode;
}

export const DSContextProvider: React.FC<Props> = ({ children }) => {
  const { searchParams } = useContext(SearchContext);

  // #region states

  const [pageNumber, setPageNumber] = useState(0);
  const [sortBy, setSortBy] = useState<SortBy | ''>('');
  const [perPage, setPerPage] = useState<PerPage | ''>('');

  // #endregion
  // #region variables

  const PAGE_PARAM = 'page';
  const searchPageParam = searchParams.get(PAGE_PARAM);

  const SORT_TITLE = 'Sort by';
  const SORT_PARAM = 'sort';
  const searchSortParam = searchParams.get(SORT_PARAM);

  const PER_PAGE_TITLE = 'Items on page';
  const PER_PAGE_PARAM = 'per-page';
  const searchPerPageParam = searchParams.get(PER_PAGE_PARAM);

  // #endregion
  // #region value

  const dropdownContextValue: DSContextType = {
    pageNumber,
    PAGE_PARAM,
    searchPageParam,
    setPageNumber,

    SORT_TITLE,
    sortBy,
    searchSortParam,
    SORT_PARAM,
    setSortBy,

    PER_PAGE_TITLE,
    perPage,
    searchPerPageParam,
    PER_PAGE_PARAM,
    setPerPage,
  };

  // #endregion

  return (
    <DSContext.Provider value={dropdownContextValue}>
      {children}
    </DSContext.Provider>
  );
};
