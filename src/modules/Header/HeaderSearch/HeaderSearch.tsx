import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from './HeaderSearch.module.scss';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import search from './../../../images/icons/search.svg';
import close from './../../../images/icons/closeBar.svg';

export const HeaderSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const [openSearch, setOpenSearch] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [appliedQuery, setAppliedQuery] = useState(query);

  const [value, setValue] = useState(query);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    applyQuery(e.target.value);
  };

  useEffect(() => {
    searchParams.set('query', appliedQuery);
    if (!appliedQuery.trim()) {
      searchParams.delete('query');

      setValue('');
      applyQuery('');
    }

    searchParams.set('page', '1');
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedQuery]);

  const toggleInputSearch = () => {
    setOpenSearch(searchInput => !searchInput);
    if (inputRef.current && !openSearch) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <button
        className={classNames(styles.header__tools__toggle_search)}
        onClick={toggleInputSearch}
      >
        {!openSearch ? (
          <img src={search} alt="Search icon" />
        ) : (
          <img src={close} alt="Close icon" />
        )}
      </button>
      <div
        className={classNames(styles.header__tools_search, {
          [styles.header__tools_search_open]: openSearch,
        })}
      >
        <input
          type="text"
          ref={inputRef}
          value={value}
          onChange={handleQueryChange}
          className={styles.header__tools_input_search}
          placeholder="Search..."
        />
      </div>
    </>
  );
};
