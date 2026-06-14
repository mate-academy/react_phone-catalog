/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import IconSearch from '@/assets/svg/search.svg';

import styles from './SearchInput.module.scss';
//#endregion

//#region STYLES
const {
  searchContainer,
  searchField,
  searchIcon,
} = styles;
//#endregion

export const SearchInput = () => {
  //#region STATE
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(urlQuery);
  //#endregion

  //#region EFFECTS
  useEffect(() => {
    if (query === urlQuery) {
      return;
    }

    const timerId = setTimeout(() => {
      setSearchParams(prevParams => {
        if (query.trim()) {
          prevParams.set('query', query.trim());
          prevParams.delete('page');
        } else {
          prevParams.delete('query');
          prevParams.delete('page');
        }

        return prevParams;
      });
    }, 500);

    return () => clearTimeout(timerId);
  }, [query, urlQuery, setSearchParams]);
  //#endregion

  //#region RENDER
  return (
    <div className={searchContainer}>
      <input
        className={searchField}
        type="text"
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <img
        className={searchIcon}
        src={IconSearch}
        alt="Search"
      />
    </div>
  );
  //#endregion
};
