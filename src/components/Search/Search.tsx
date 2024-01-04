/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { getSearchWith } from '../../helpers/getSearchWith';
import { useData } from '../../helpers/DataContext';

import './Search.scss';

export const Search: React.FC = () => {
  const { pageURL } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    const currentQuery = searchParams.get('query') || '';

    setQuery(currentQuery);
    setSearchParams(getSearchWith(searchParams, {
      query: currentQuery || null,
    }));
  }, [searchParams, setSearchParams]);

  const applyQuery = useMemo(
    () => debounce(setSearchParams, 200), [setSearchParams],
  );

  const deleteQuery = () => {
    setQuery('');
    setSearchParams(getSearchWith(searchParams, {
      query: null,
    }));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      deleteQuery();
    } else {
      setQuery(event.target.value);
      applyQuery(getSearchWith(searchParams, {
        query: event.target.value,
        page: '1',
      }));
    }
  };

  return (
    <>
      <div className="Search-container">
        <input
          className="Search__input"
          type="text"
          placeholder={`Search in ${pageURL?.slice(1)}..`}
          value={query}
          onChange={handleQueryChange}
        />
        {query
          ? (
            <button
              type="button"
              onClick={deleteQuery}
              title="clear input"
              data-cy="searchDelete"
              className="Search__button"
            >
              <span className="icon icon--close" />
            </button>
          )
          : (
            <div className="Search__button">
              <span className="icon icon--search" />
            </div>
          )}
      </div>
    </>
  );
};
