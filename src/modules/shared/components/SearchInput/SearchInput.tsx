/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import IconSearch from '@/assets/svg/search.svg?react';

import styles from './SearchInput.module.scss';
//#endregion

//#region STYLES
const { searchContainer, searchField, searchIcon } = styles;
//#endregion

export const SearchInput = () => {
  //#region STATE
  const { t } = useTranslation();
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
        placeholder={t('searchInput.placeholder')}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <IconSearch
        className={searchIcon}
        aria-label={t('searchInput.alt')}
      />
    </div>
  );
  //#endregion
};
