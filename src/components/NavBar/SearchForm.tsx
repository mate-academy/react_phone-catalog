import { useLocation, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import classNames from 'classnames';

import { getSearchWith } from '../../utils/searchHelper';
import { QueryContext } from '../../context/QueryContext';

export const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const { applyQuery } = useContext(QueryContext);
  const { pathname } = useLocation();
  const searchCategory = pathname.slice(1);

  applyQuery(query);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
    applyQuery(event.target.value);
  };

  const resetQuery = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    setSearchParams(params.toString());
    applyQuery('');
  };

  return (
    <form className="search">
      <label className="search__bar">
        <input
          className="search__input"
          type="search"
          name="query"
          placeholder={`Search in ${searchCategory}...`}
          value={query}
          onChange={handleQueryChange}
        />
      </label>

      {query ? (
        <button
          type="button"
          data-cy="searchDelete"
          className={classNames(
            'search__icon',
            { 'search__icon--active': query },
          )}
          aria-label="close"
          onClick={resetQuery}
        />
      ) : (
        <div className="search__icon" />
      )}
    </form>
  );
};
