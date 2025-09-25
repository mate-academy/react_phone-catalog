import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../modules/shared/hooks/useDebounce';
import styles from './Search.module.scss';

interface Props {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export const Search: React.FC<Props> = ({
  onSearch,
  placeholder = 'Search...',
  initialValue = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className={styles.search}>
      <input
        type="search"
        className={styles.search__input}
        placeholder={placeholder}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <img
        src="img/icons/icon-search.png"
        alt="Search"
        className={styles.search__icon}
      />
    </div>
  );
};
