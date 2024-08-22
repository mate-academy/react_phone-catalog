import { useSearchParams } from 'react-router-dom';
import styles from './SearchBar.module.scss';
import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import debounce from 'debounce';
import { useTranslation } from 'react-i18next';

interface SearchParams {
  [key: string]: string | string[] | null;
}

interface SearchBarType {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar: React.FC<SearchBarType> = ({ setLoader }) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [localQuery, setLocalQuery] = useState(searchParams.get('query') || '');
  const isDark = useAppSelector(state => state.boolean.isDark);

  function getSearchWith(
    currentParams: URLSearchParams,
    paramsToUpdate: SearchParams,
  ): URLSearchParams {
    const newParams = new URLSearchParams(currentParams.toString());

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });

    return newParams;
  }

  const updateParams = debounce((value: string) => {
    const updatedParams = getSearchWith(searchParams, {
      query: value,
    });

    setLoader(false);
    setSearchParams(updatedParams);
  }, 1000);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setLoader(true);

    setLocalQuery(value);

    updateParams(value);
  };

  const asd = `${t('search')}`;

  return (
    <div className={styles.ssearchBar}>
      {isDark ? (
        <img
          className={styles.searchIco}
          src="./icons/dark-theme-icons/search-ico.svg"
          alt="search"
        />
      ) : (
        <img
          className={styles.searchIco}
          src="./icons/search-ico.svg"
          alt="search"
        />
      )}
      <input
        value={localQuery}
        type="search"
        className={`${styles.searchField} ${isDark && styles.darkSearchField}`}
        placeholder={asd}
        onChange={handleQueryChange}
      />
    </div>
  );
};
