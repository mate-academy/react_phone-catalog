import styles from './SearchForm.module.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../../utils/searchHelper';
import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

export const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setSearchWith(params: any) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  const debouncedSetSearchWith = useCallback(
    debounce(params => {
      setSearchWith(params);
    }, 400),
    [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    debouncedSetSearchWith({ query: event.target.value || null });
  };

  return (
    <form className={styles.searchForm}>
      <input
        value={value}
        type="text"
        className={styles.searchForm__input}
        placeholder="Search"
        onChange={handleQueryChange}
      />
    </form>
  );
};
