import './Search.scss';

import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';

type Props = {
  page: string,
};

export const Search: React.FC<Props> = ({ page }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SearchParams.query) || '';
  const [inputValue, setInputValue] = useState(query);
  const timeoutId = useRef(0);

  const setQuery = (value: string) => {
    if (value === '' && query === '') {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);

    if (value !== '') {
      newSearchParams.set(SearchParams.query, value);
    } else {
      newSearchParams.delete(SearchParams.query);
    }

    newSearchParams.set(SearchParams.activePage, '1');

    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    window.clearTimeout(timeoutId.current);

    timeoutId.current = window.setTimeout(() => {
      setQuery(inputValue);
    }, 1000);
  }, [inputValue]);

  return (
    <div className="Search">
      <input
        type="text"
        className="Search__input"
        placeholder={`Search in ${page}...`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button
        type="button"
        className={classNames('Search__icon', {
          'Search__icon--not-empty-search': query !== '',
        })}
        aria-label="Clear search"
        onClick={() => setInputValue('')}
      />
    </div>
  );
};
