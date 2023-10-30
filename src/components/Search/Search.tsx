import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { debounce } from 'lodash';
import './Search.scss';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { actions as queryActions } from '../../features/query';

type Props = {
  currentPage: string;
};

export const Search: FC<Props> = ({ currentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get('query') || '');
  const dispatch = useAppDispatch();

  const debounceSearch = useCallback(debounce((searchQuery: string) => {
    dispatch(queryActions.change(searchQuery));
  }, 500), []);

  const immediatelySetter = (value: string) => {
    dispatch(queryActions.change(value));
  };

  useEffect(() => {
    immediatelySetter(query);
  }, []);

  useEffect(() => {
    debounceSearch(query);
  }, [query]);

  const updateSearchQuery = (searchQuery: string) => {
    if (searchQuery.length === 0) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', searchQuery);
    }

    setSearchParams(searchParams);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchQuery(event.target.value);
    setQuery(event.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    updateSearchQuery('');
    immediatelySetter('');
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder={`Search in ${currentPage}...`}
        className="search__input"
        value={query}
        onChange={handleChange}
      />
      <button
        data-cy="searchDelete"
        type="button"
        aria-label="search__button"
        className={classNames(
          'search__button',
          { 'search__button--clear': query.length !== 0 },
        )}
        onClick={clearSearch}
      />
    </div>
  );
};
