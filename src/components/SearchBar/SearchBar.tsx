import { debounce } from 'lodash';
import { useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import './SearchBar.scss';

export const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(query);
  const location = useLocation();
  const currentLocation = location.pathname.slice(1);

  useMemo(() => {
    setInputValue(query);
  }, [query]);

  const handleDebounceChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams(
        getSearchWith(searchParams,
          { query: event.target.value.trim() || null }),
      );
    }, 1000,
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    handleDebounceChange(event);
  };

  const handleDeleteChange = () => {
    setInputValue('');
    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  return (
    <div className="searchbar">
      <input
        className="searchbar__input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Search in ${currentLocation}...`}
      />

      {!inputValue && (
        <span
          className="searchbar__icon searchbar__icon--search"
        />
      )}

      { inputValue.length > 0 && (
        <div
          data-cy="searchDelete"
          role="button"
          tabIndex={0}
          onKeyDown={() => handleDeleteChange()}
          onClick={() => handleDeleteChange()}
        >
          <span
            className="searchbar__icon searchbar__icon--close"
          />
        </div>
      )}
    </div>
  );
};
