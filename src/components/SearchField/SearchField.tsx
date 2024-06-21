import { useSearchParams } from 'react-router-dom';
import './SearchField.scss';
import { SearchParams } from '../../types/SearchParams';
import React from 'react';
import classNames from 'classnames';

type Props = {
  searchIsShown?: boolean;
};

export const SearchField: React.FC<Props> = ({ searchIsShown = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query: string = searchParams.get(SearchParams.QUERY) ?? '';

  const newParams = new URLSearchParams(searchParams);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    if (newQuery.length === 0 || !searchIsShown) {
      newParams.delete(SearchParams.QUERY);
    } else {
      newParams.set(SearchParams.QUERY, newQuery);
    }

    setSearchParams(newParams);
  };

  const handleClear = () => {
    newParams.delete(SearchParams.QUERY);

    if (query) {
      setSearchParams(newParams);
    }
  };

  return (
    <div className={classNames('search-field', { hidden: !searchIsShown })}>
      <input
        type="text"
        value={query}
        placeholder="Search"
        maxLength={18}
        className="search-field__input"
        onChange={event => handleChange(event)}
      />

      <button
        className={classNames('search-field__button', {
          'search-field__button--type--delete': query,
        })}
        onClick={handleClear}
      ></button>
    </div>
  );
};
