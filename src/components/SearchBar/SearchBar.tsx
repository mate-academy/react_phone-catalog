import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import { generatePlaceHolderText } from './utils';

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

  useEffect(() => {
    if (appliedQuery === '' && searchQuery !== '') {
      setSearchQuery('');
    }
  }, [appliedQuery]);

  const isNotEmpty = searchQuery !== '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value.trimStart();

    setSearchQuery(newQuery);
    applyQuery(newQuery, pathname, searchParams);
  };

  const handleClearInput = () => {
    setSearchQuery('');
    applyQuery('', pathname, searchParams);
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder={generatePlaceHolderText(pathname)}
        value={searchQuery}
        className={classNames(
          'SearchBar__input',
          { 'SearchBar__input--has-text': isNotEmpty },
        )}
        onChange={handleInputChange}
      />
      {
        isNotEmpty && (
          <button
            type="button"
            data-cy="searchDelete"
            className="SearchBar__clear-button"
            onClick={handleClearInput}
          >
            {' '}
          </button>
        )
      }
    </div>
  );
};
