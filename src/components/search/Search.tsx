import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import cn from 'classnames';

import { useSearch } from '@hooks/useSearch';

import styles from './Search.module.scss';
import { SearchBar, SearchResult } from './index';

export const Search: FC = () => {
  const { state } = useLocation();
  const { itemId } = (state as { itemId: string }) || {};
  const search = useSearch();

  useEffect(() => {
    if (search.query) {
      search.onChangeFilterProducts(search.query);
    }
  }, [search.query]);

  return (
    <div
      className={cn(styles.search, { [styles.hidden]: !search.isOpenInput })}
      ref={search.searchRef}
    >
      <SearchBar
        query={search.query}
        isOpenInput={search.isOpenInput}
        onSearch={search.onChangeFilterProducts}
        setIsOpenInput={search.setIsOpenInput}
        closeSearchBar={search.resetSearchBar}
      />

      {search.query && (
        <SearchResult
          currentItemId={itemId}
          filteredProducts={search.filteredProducts}
          resetSearchBar={search.resetSearchBar}
        />
      )}
    </div>
  );
};
