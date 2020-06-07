import React, { useMemo } from 'react';
import cn from 'classnames';
import { LOCATIONS } from '../../common/constants';
import { useRouter } from '../_hooks/useRouter';
import { useSearch } from '../_hooks/useSearch';

export const Search = () => {
  const { location } = useRouter();
  const {
    inputValue,
    searchProducts,
    onKeyDown,
    handleResetAndFocus,
    inputEl,
  } = useSearch();

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
        onKeyDown={onKeyDown}
      />
      <button
        type="button"
        aria-label="Clear input"
        className={cn({
          search__button: true,
          'search__button--clear': inputValue,
        })}
        onClick={handleResetAndFocus}
        disabled={inputValue.length === 0}
      />
    </div>
  );
};
