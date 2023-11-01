import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import './Search.scss';
import classNames from 'classnames';

 type SearchParams = {
   [key: string]: string | string[] | null,
 };

function getSearchWith(currentParams: URLSearchParams, paramsToUpdate: SearchParams): string {
  const newParams = new URLSearchParams(currentParams);

  for (const [key, value] of Object.entries(paramsToUpdate)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.set(key, value.join(','));
    } else {
      newParams.set(key, value);
    }
  }

  return newParams.toString();
}

export const Search = () => {
  const [searchQuery, setSearchQuery] = useSearchParams();

  const { pathname } = useLocation();

  const query = searchQuery.get('query') || '';

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(getSearchWith(searchQuery,
      { query: event.target.value || null }));
  };

  const isClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="form">
      <label className="form__label">
        <input
          type="text"
          className="form__input"
          value={query}
          placeholder={`Search in ${pathname.split('/')[1]}...`}
          onChange={onQueryChange}
        />
      </label>

      <button
        type="button"
        className={classNames('form__img', query ? 'form__cross' : 'form__search')}
        onClick={isClearSearch}
      />
    </div>
  );
};
