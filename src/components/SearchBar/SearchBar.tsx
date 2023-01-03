import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import { generatePlaceHolderText, MAX_SEARCH_CHARS } from './utils';
import './SearchBar.scss';

export const SearchBar = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);

  const appliedQuery = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(appliedQuery);

  const applyQuery = useCallback(
    debounce((
      newQuery: string,
      currentPathname: string,
      currentSearchParams: URLSearchParams,
    ) => {
      if (newQuery) {
        currentSearchParams.set('query', newQuery);
      } else {
        currentSearchParams.delete('query');
      }

      navigate({
        pathname: currentPathname,
        search: currentSearchParams.toString(),
      });
    }, 500),
    [],
  );

  // this useEffect resets state when query gets reset from a product page
  useEffect(() => {
    if (appliedQuery === '' && searchQuery !== '') {
      setSearchQuery('');
    }
  }, [appliedQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value.trimStart();

    if (newQuery.length >= MAX_SEARCH_CHARS) {
      return;
    }

    setSearchQuery(newQuery);
    applyQuery(newQuery, pathname, searchParams);
  };

  const isNotEmpty = searchQuery !== '';

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder={generatePlaceHolderText(pathname)}
        value={searchQuery}
        className={classNames(
          'searchbar',
          { 'searchbar--has-text': isNotEmpty },
        )}
        onChange={handleInputChange}
      />
      {
        isNotEmpty && (
          <button
            type="button"
            className="searchbar__clear-button"
            onClick={() => {
              setSearchQuery('');
              applyQuery('', pathname, searchParams);
            }}
          >
            {}
          </button>
        )
      }
    </div>
  );
};
