import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { getSearchWith } from '../../helpers/getSearchWidth';
import './style.scss';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryD = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(queryD);

  const { pathname } = useLocation();
  const placeholder = `Search in ${pathname.slice(1)}`;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const debouncedSearch = debounce((query: string) => {
    setSearchParams(
      getSearchWith(
        { query: query || null },
        searchParams,
      ),
    );
  }, 500);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const query = event.target.value;

    setSearchQuery(query);

    debouncedSearch(query);
  };

  const removeSearch = () => {
    setSearchParams(
      getSearchWith(
        { query: null },
        searchParams,
      ),
    );

    setSearchQuery('');
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={submit}>
        <div className="search__control control">
          <label>
            <input
              type="text"
              className="control__input"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span
              className="control__icons control__icons--search"
              style={{ pointerEvents: 'all' }}
            >
              {searchQuery.length > 0 ? (
                <button
                  aria-label="clear search"
                  data-cy="searchDelete"
                  type="button"
                  className="control__delete"
                  onClick={removeSearch}
                >
                  <span className="control__icon control__icon--deleteIcon" />
                </button>
              ) : (
                <i className="control__icon control__icon--searchLoop" />
              )}
            </span>
          </label>
        </div>
      </form>
    </div>
  );
};
