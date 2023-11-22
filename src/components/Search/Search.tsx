import { useContext } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import {
  HandleIsMenuActiveContext,
} from '../../contexts/HandleIsMenuActiveContext';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setIsMenuActive = useContext(HandleIsMenuActiveContext);

  const location = useLocation();

  const query = searchParams.get('query') || '';

  const onClick = () => setIsMenuActive(false);

  const isSearch = (location.pathname === '/favourites')
    || (location.pathname === '/phones')
    || (location.pathname === '/tablets')
    || (location.pathname === '/accessories');

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    if (!params.get('query')) {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const resetQuery = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');

    setSearchParams(params);
  };

  return (
    <div
      className={classNames(
        'search',
        { 'search--is': isSearch },
      )}
    >
      <input
        type="text"
        className={classNames(
          'search__input',
          { 'search__input--active': query },
        )}
        placeholder={`Search in ${location.pathname.slice(1)}...`}
        onChange={handleQuery}
        value={query}
        onClick={onClick}
      />

      {query ? (
        <button
          type="button"
          className={classNames(
            'search__icon',
            { 'search__icon--active': query },
          )}
          aria-label="Close"
          onClick={resetQuery}
        />
      ) : (
        <div className="search__icon" />
      )}
    </div>
  );
};
