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

  return (
    <input
      type="text"
      value={query}
      className={classNames('search-field', { hidden: !searchIsShown })}
      placeholder="Search"
      onChange={event => handleChange(event)}
    />
  );
};
