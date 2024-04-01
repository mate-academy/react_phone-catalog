import { useCallback, useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../helper/ProductContext';
import './Search.scss';
import debounce from 'lodash.debounce';

export const Search = () => {
  const { setAppliedQuery } = useContext(ProductContext);
  const [query, setQuery] = useState('');

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.currentTarget.value;

    setQuery(newQuery);
    applyQuery(newQuery);
  };
  
  useEffect(() => {
    return () => {
      applyQuery('');
    };
  }, [applyQuery]);

  return (
    <div className="search">
      {!query && <img className="search__icon" src="img/Search.png" />}

      <input
        className="search__input"
        placeholder="Search in phones..."
        type="text"
        value={query}
        onChange={handleInput}
      ></input>
      {query && (
        <div
          className="search__button"
          data-cy="searchDelete"
          onClick={() => {
            setQuery('');
            applyQuery('');
          }}
        >
          <img className="search__icon" src="img/Close.png" />
        </div>
      )}
    </div>
  );
};
