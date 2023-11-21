import { useLocation, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import debounce from 'lodash.debounce';
import classNames from 'classnames';
import { getSearchWith } from '../../../services/getSearchWith';
import './search.scss';

type Props = {
  catPath: string;
};

export const Search: React.FC<Props> = ({ catPath }) => {
  const location = useLocation();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setQuery(appliedQuery);
  }, [location]);

  const setSearchWith = (params: { [key: string]: string | null }) => {
    const newParams = getSearchWith(params, searchParams);

    setSearchParams(newParams);
  };

  const applyQuery = useCallback(
    debounce(setSearchWith, 1000),
    [location],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery({ query: event.target.value || null });
  };

  return (
    <form
      className={classNames(
        'search',
        { 'search--focused': isFocused },
      )}
    >
      <label className="search__label">
        <input
          type="search"
          className="search__input"
          placeholder={`Search in ${catPath}...`}
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <img
          src="./img/icons/Search.svg"
          className="search__image"
          alt="Search"
        />
      </label>
    </form>
  );
};
