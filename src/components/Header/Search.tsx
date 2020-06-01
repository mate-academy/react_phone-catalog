import React, { useCallback, useMemo, useRef } from 'react';
import cn from 'classnames';
import { LOCATIONS } from '../../common/constants';
import { useSearch } from '../_hooks/useSearch';

export const Search = ({
  inputValue,
  searchProducts,
  searchReset,
}: SearchProps) => {
  const inputEl = useRef<HTMLInputElement>(null);

  const { location } = useSearch();

  const handleClick = useCallback(() => {
    searchReset();

    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  }, [searchReset]);

  const placeholderItems = useMemo(() => {
    switch (location.pathname) {
      case LOCATIONS.phones:
        return 'phones';
      case LOCATIONS.tablets:
        return 'tablets';
      case LOCATIONS.favorites:
        return 'favorites';
      default:
        return 'products';
    }
  }, [location.pathname]);

  return (
    <div className="search">
      <input
        ref={inputEl}
        type="text"
        value={inputValue}
        className="search__input"
        placeholder={`Search in ${placeholderItems}...`}
        onChange={searchProducts}
      />
      <button
        type="button"
        aria-label="Clear input"
        className={cn({
          search__button: true,
          'search__button--clear': inputValue,
        })}
        onClick={handleClick}
        disabled={inputValue.length === 0}
      />
    </div>
  );
};
