import { Dropdowns } from '../Dropdowns/Dropdowns';
import s from './ProductFilters.module.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import { useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import closeIcon from '../../assets/images/icons/Close.svg';
import searchIcon from '../../assets/images/icons/Search.svg';
import classNames from 'classnames';

const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const itemsOptions = [
  { value: 'all', label: 'all' },
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
];

export const ProductFilters = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [query, setQuery] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('query') || '';

  const inputRef = useRef<HTMLInputElement>(null);

  const applyQuery = useMemo(
    () =>
      debounce((newQuery: string) => {
        setSearchParams((prevParams) => {
          const newValue = newQuery === '' ? null : newQuery;
          return getSearchWith(prevParams, { query: newValue, page: null });
        });
      }, 1000),
    [setSearchParams],
  );

  useEffect(() => {
    if (query !== value) {
      applyQuery(query);
    }

    return () => applyQuery.cancel();
  }, [query, value, applyQuery]);

  useEffect(() => {
    setQuery(value);
    if (value) {
      setIsSearchExpanded(true);
    }
  }, [value]);

  useEffect(() => {
    if (isSearchExpanded) {
      inputRef.current?.focus();
    }
  }, [isSearchExpanded]);

  const perPage = searchParams.get('perPage') || 'all';
  const sortBy = searchParams.get('sort') || 'age';

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);
    setSearchParams(search);
  }

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    setQuery('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className={s.container}>
      <div className={s.contentSort}>
        <span className={s.label}>Sort by</span>
        <Dropdowns
          selected={sortBy}
          onChange={(newSort) => {
            setSearchWith({ sort: newSort });
          }}
          options={sortOptions}
        />
      </div>
      <div className={s.contentItems}>
        <label className={s.label}>Items on page</label>
        <Dropdowns
          selected={perPage}
          onChange={(newPerPage) => {
            const valueToSet = newPerPage === 'all' ? null : newPerPage;
            setSearchWith({ perPage: valueToSet, page: null });
          }}
          options={itemsOptions}
        />
      </div>
      <div className={classNames(s.searchBlock, { [s.activeSearch]: isSearchExpanded })}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Search..."
          className={s.search}
          value={query}
          onChange={handleInputChange}
        />
      </div>
      <button className={s.searchButton} onClick={toggleSearch} aria-label="Toggle search">
        <img src={isSearchExpanded ? closeIcon : searchIcon} alt="menuIcon" />
      </button>
    </div>
  );
};
