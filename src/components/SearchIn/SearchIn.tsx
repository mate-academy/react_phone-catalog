import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchIn.scss';

type Props = {
  activePage: string,
  searchProducts: (query: string) => void,
};

export const SearchIn: React.FC<Props> = ({ activePage, searchProducts }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const query = searchParams.get('query') || '';

  const handleQueryChange = (param: string) => {
    if (param.length) {
      searchParams.set('query', param);
    } else {
      searchParams.delete('query');
    }

    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (query) {
      searchProducts(query);
    }
  }, []);

  return (
    <div className="SearchIn">
      <label
        htmlFor="search"
        className="SearchIn__label"
      >
        <input
          id="search"
          className="SearchIn__input"
          type="text"
          placeholder={`Search in ${activePage}...`}
          name="query"
          value={query}
          onChange={(event) => {
            handleQueryChange(event.target.value);
            searchProducts(event.target.value);
          }}
        />
        {query && (
          <button
            type="button"
            className="CartItem__removeItem"
            onClick={() => {
              handleQueryChange('');
              searchProducts('');
            }}
            data-cy="searchDelete"
            aria-label="remove search"
          />
        )}
      </label>
    </div>
  );
};
