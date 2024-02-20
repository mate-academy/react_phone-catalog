/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { getSearchWith } from '../../helpers/getSearchWith';

import './Search.scss';

type Props = {
  type?: string;
};

export const Search: React.FC<Props> = ({ type = 'tablet' }) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const queryField = useRef<HTMLInputElement>(null);

  const applyQuery = useCallback(
    debounce(setSearchParams, 500),
    [setSearchParams],
  );

  function setSearchWith(params: any) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(getSearchWith(
      { query: event.target.value.trim() || null },
      searchParams,
    ));
  };

  const handleClickFocus = () => {
    if (queryField.current) {
      queryField.current.focus();
    }
  };

  const handleClearQuery = () => {
    setSearchWith({ query: null });
    setQuery('');
    handleClickFocus();
  };

  return (
    <div className={classNames('search search__content', {
      'search__content--mobile': type === 'mobile',
      'search__content--tablet': type === 'tablet',
    })}
    >
      <input
        type="text"
        ref={queryField}
        className="search__input"
        placeholder={`Search in ${pathname.replace('/', '')}...`}
        value={query}
        onChange={handleQueryChange}
      />

      {query
        ? (
          <button
            data-cy="searchDelete"
            type="button"
            className="button-icon button-icon--search-close"
            onClick={handleClearQuery}
          />
        ) : (
          <button
            type="button"
            className="button-icon button-icon--search"
            onClick={handleClickFocus}
          />
        )}
    </div>
  );
};
