import { useSearchParams } from 'react-router-dom';
import './SearchField.scss';
import { SearchParams } from '../../types/SearchParams';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDebounce } from '../../utils/hooks/useDebounce';

type Props = {
  searchIsShown?: boolean;
};

export const SearchField: React.FC<Props> = ({ searchIsShown = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryInput, setQueryInput] = useState('');
  const queryFromParams: string = searchParams.get(SearchParams.QUERY) ?? '';

  useEffect(() => {
    setQueryInput(queryFromParams);
  }, [queryFromParams]);

  const newParams = new URLSearchParams(searchParams);
  const setParamsWithDebounce = useDebounce(params => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setSearchParams(params);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    if (newQuery.length === 0 || !searchIsShown) {
      newParams.delete(SearchParams.QUERY);
    } else {
      newParams.set(SearchParams.QUERY, newQuery);
    }

    setQueryInput(newQuery);
    setParamsWithDebounce(newParams);
  };

  const handleClear = () => {
    newParams.delete(SearchParams.QUERY);

    if (queryFromParams) {
      setSearchParams(newParams);
    }
  };

  return (
    <div className={classNames('search-field', { hidden: !searchIsShown })}>
      <input
        type="text"
        value={queryInput}
        placeholder="Search"
        maxLength={18}
        className="search-field__input"
        onChange={event => handleChange(event)}
      />

      <button
        className={classNames('search-field__button', {
          'search-field__button--type--delete': queryFromParams,
        })}
        onClick={handleClear}
      ></button>
    </div>
  );
};
