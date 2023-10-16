import classNames from 'classnames';
import {
  FC, memo, useEffect, useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';
import { useDebounce } from '../../hooks/useDebounce';

import './search.scss';

export const Search: FC = memo(() => {
  const { pathname } = useLocation();
  const placeholder = `Search in ${pathname.split('/')[1]}...`;
  const [searchParams, setSearchParams] = useSearchParams('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const isEmptyInput = appliedQuery.length !== 0;
  const debounceSearch = useDebounce(appliedQuery, 300) || null;

  useEffect(() => {
    setSearchParams(getSearchWith(searchParams, { query: debounceSearch }));
  }, [debounceSearch]);

  const handleResetValue = () => {
    setAppliedQuery('');
    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

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
