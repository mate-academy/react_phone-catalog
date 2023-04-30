import classNames from 'classnames';
import {
  FC, memo, useEffect, useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { updateSearchParams } from '../../helpers/searchHelper';
import { useDebounce } from '../../hooks/useDebounce';

import './search.scss';

export const Search: FC = memo(() => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const debounceSearch = useDebounce(appliedQuery, 300) || null;

  useEffect(() => {
    setSearchParams(updateSearchParams(searchParams,
      { query: debounceSearch }));
  }, [debounceSearch]);

  const handleResetValue = () => {
    setAppliedQuery('');
    setSearchParams(updateSearchParams(searchParams, { query: null }));
  };

  const getPlaceholderText = () => {
    const searchCategory = pathname.split('/')[1];

    return `Search in ${searchCategory}...`;
  };

  const placeholder = getPlaceholderText();
  const isEmptyInput = appliedQuery.length !== 0;

  return (
    <div className="search">
      <input
        className={classNames('search__input', {
          'search__input--show': isEmptyInput,
        })}
        type="text"
        placeholder={placeholder}
        value={appliedQuery}
        onChange={(e) => {
          setAppliedQuery(e.target.value);
        }}
      />
      <button
        aria-label="reset"
        type="button"
        className={classNames('search__reset-btn', {
          'search__reset-btn--show': !isEmptyInput,
        })}
        onClick={handleResetValue}
      />
    </div>
  );
});
