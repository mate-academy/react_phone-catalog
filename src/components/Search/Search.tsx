import { useCallback, useEffect, useState } from 'react';
import styles from './Search.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('');
  const applyQuery = useCallback(debounce(setSearchParams, 1000), []);
  const { pathname } = useLocation();

  useEffect(() => {
    setSearchParams('');
  }, [pathname]);

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const newValue = e.target.value;

    if (newValue.length === 0 || newValue.trim().length === 0) {
      searchParams.delete('query');
    } else {
      params.set('query', e.target.value);
      applyQuery(params);
    }

    setValue(e.target.value);
  };

  const clearQuery = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    setSearchParams(params);
    setValue('');
  };

  return (
    <form
      action=""
      className={` ${styles.form} `}
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <input
        autoFocus
        type="search"
        name=""
        className={`${styles.search} border`}
        placeholder="Search"
        value={value}
        onChange={onQueryChange}
      />
      <div className={`icon icon--search ${styles.search__icon} `}></div>
      {value.length > 0 && (
        <div
          onClick={clearQuery}
          className={`icon icon--close ${styles.search__iconClose} `}
        ></div>
      )}
    </form>
  );
};
