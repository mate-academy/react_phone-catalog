import React, { useContext, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import styles from './Search.module.scss';
import close from '../../images/icons/close.svg';
import closeDark from '../../images/icons/close_for_dark.svg';
import search from '../../images/icons/search.svg';
import searchDark from '../../images/icons/search_for_dark.svg';
import { ThemeContext } from '../../store/ThemeContex';
import cn from 'classnames';
import { Theme } from '../../types/Theme';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  placeholder: string;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
};

export const Search: React.FC<Props> = ({
  query,
  setQuery,
  placeholder,
  searchParams,
  setSearchParams,
}) => {
  const { theme } = useContext(ThemeContext);

  const debouncedQuery = useMemo(() => {
    const debounced = debounce((value: string) => {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        searchParams.delete('query');
      } else {
        searchParams.set('query', trimmedValue);
      }

      setSearchParams(searchParams);
    }, 400);

    return debounced;
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    return () => {
      debouncedQuery.cancel();
    };
  }, [debouncedQuery]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debouncedQuery(event.target.value);
  };

  const clearQuery = () => {
    setQuery('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.search}>
      <p className={styles.search__title}>Search</p>
      <div
        className={cn({
          [styles.search__container]: theme === Theme.Light,
          [styles['search__container--dark']]: theme === Theme.Dark,
        })}
      >
        <input
          value={query}
          onChange={handleQueryChange}
          type="text"
          placeholder={placeholder}
          className={styles.search__input}
        />

        {query.length > 0 ? (
          <button onClick={clearQuery} className={styles.search__button}>
            <img
              className={styles.search__img}
              src={theme === Theme.Dark ? closeDark : close}
              alt="Cross"
            />
          </button>
        ) : (
          <img
            className={styles.search__img}
            src={theme === Theme.Dark ? searchDark : search}
            alt="Search"
          />
        )}
      </div>
    </div>
  );
};
