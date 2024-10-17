import { FC, useEffect, useRef } from 'react';

import { SearchIcon } from '@ui/icon/SearchIcon';
import { CloseIcon } from '@ui/icon/CloseIcon';

import styles from './SearchBar.module.scss';

type TProps = {
  query: string;
  onSearch: (query: string) => void;
  setFilteredProducts: () => void;
};

export const SearchBar: FC<TProps> = ({
  query,
  onSearch,
  setFilteredProducts,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const clearQuery = () => {
    onSearch('');
    setFilteredProducts();
  };

  return (
    <>
      <input
        className={styles.search}
        ref={inputRef}
        value={query}
        onChange={onChangeQuery}
        name="search"
        placeholder="Search..."
        aria-label="Search"
      />

      <div className={styles.icons}>
        {query && (
          <div className={styles.icon} onClick={clearQuery}>
            <CloseIcon />
          </div>
        )}

        <div onClick={() => inputRef.current?.focus()} className={styles.icon}>
          <SearchIcon />
        </div>
      </div>
    </>
  );
};
