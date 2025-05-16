import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import styles from './SearchInput.module.scss';
export const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(initialQuery);

  const debouncedSetQuery = debounce((value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  }, 200); // 500мс затримка

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);
    debouncedSetQuery(value);
  };

  useEffect(() => {
    setInputValue(initialQuery);
  }, [initialQuery]);

  return (
    <input
      className={styles.searchInput}
      type="search"
      placeholder="Search..."
      value={inputValue}
      onChange={handleChange}
    />
  );
};
