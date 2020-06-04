import React, { useState, useCallback } from 'react';
import './SearchInput.scss';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';

type Props = {
  section: string;
};

const SearchInput: React.FC<Props> = ({ section }) => {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState('');

  const searchParams = new URLSearchParams(location.search);

  const onHandleChange = () => {
    history.push({
      search: '?query=',
    });
    setQuery('');
  };

  const updateQueryInURL = (inquiry: string) => {
    if (inquiry) {
      searchParams.set('query', inquiry);
    } else {
      searchParams.delete('query');
    }

    history.push({ search: searchParams.toString() });
  };

  const applyQuery = useCallback(debounce(updateQueryInURL, 1000), []);

  return (
    <section className="search-section">
      <div className="search">
        <input
          placeholder={`Search in ${section}...`}
          className="search__input"
          type="text"
          value={query}
          onChange={({ target }) => {
            setQuery(target.value);
            applyQuery(target.value);
          }}
        />
        {query
          ? (
            <button
              type="button"
              onClick={onHandleChange}
              className="search__img search__img-button"
            >
              <img src="./img/close.svg" alt="close" className="search__img-delete" />
            </button>
          )
          : (
            <div className="search__img">
              <img src="./img/Search.svg" alt="search" />
            </div>
          )}
      </div>
    </section>
  );
};

export default SearchInput;
