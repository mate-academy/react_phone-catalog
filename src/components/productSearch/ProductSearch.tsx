import { useState } from 'react';
import styles from './ProductSearch.module.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';

export const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    const newSearchParam = getSearchWith(searchParams, {
      query: newValue || null,
    });

    setQuery(newValue);
    setSearchParams(newSearchParam);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleQueryChange}
        className={styles.search__input}
      />
    </div>
  );
};
