/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Search.scss';
import debounce from 'lodash/debounce';

type Props = {
  selectedPage: string,
};

export const Search: React.FC<Props> = ({ selectedPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(searchQuery);

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      navigate(`?${searchParams.toString()}`);
    }, 500), [selectedPage],
  );

  useEffect(() => {
    setQuery('');
  }, [selectedPage]);

  const handleQueryChange: React.ChangeEventHandler<HTMLInputElement>
    = (event) => {
      setQuery(event.target.value);
      applyQuery(event.target.value.toLowerCase());
    };

  const handleClearQuery = () => {
    applyQuery('');
    setQuery('');
  };

  return (
    <div className="navbar-item">
      <div className="search-input">
        <input
          className="input"
          type="text"
          placeholder={`Search in ${selectedPage}`}
          value={query}
          onChange={handleQueryChange}
        />
        {query
          ? (
            <span
              className="fa-solid fa-xmark input-icon"
              data-cy="searchDelete"
              onClick={() => handleClearQuery()}
            />
          )
          : (<span className="fa-solid fa-magnifying-glass input-icon" />)}
      </div>
    </div>
  );
};
