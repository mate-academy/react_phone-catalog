import { useEffect, useState } from 'react';
import styles from './Search.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../../../../hooks/useDebounce';
import { useWidth } from '../../../../../../hooks/useWidth';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('');
  const { pathname } = useLocation();
  const width = useWidth();
  const applyQuery = useDebounce(setSearchParams, 1000);

  useEffect(() => {
    setValue('');
  }, [pathname]);

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const newValue = e.target.value;

    params.delete('page');

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
        className={`${styles.search} border--left`}
        placeholder="Search"
        value={value}
        onChange={onQueryChange}
        style={{
          paddingLeft: `${width < 680 && value.length >= 1 ? '8px' : 'calc(1.5em + 16px)'}`,
        }}
      />
      {(value.length === 0 || width > 680) && (
        <div className={`icon icon--search ${styles.search__icon} `}></div>
      )}
      {value.length > 0 && (
        <div
          onClick={clearQuery}
          className={`icon icon--close ${styles.search__iconClose} `}
        ></div>
      )}
    </form>
  );
};
