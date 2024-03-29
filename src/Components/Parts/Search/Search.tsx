import { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../hooks/useDebonce';
import { getSearchWith } from '../../helpers/searchHelper';
import './Search.scss';

const Search: FC = memo(() => {
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

  const handleSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setAppliedQuery(ev.target.value);
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
        onChange={handleSearchChange}
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

Search.displayName = 'Search';

export default Search;
