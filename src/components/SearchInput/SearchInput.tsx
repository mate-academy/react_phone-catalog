import classNames from 'classnames';
import styles from './SearchInput.module.scss';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductType } from '../../types/ProductType';

interface Props {
  handleMobileMenu: (open: boolean) => void;
}

export const SearchInput: React.FC<Props> = ({ handleMobileMenu }) => {
  const [isSearchBtnVisible, setIsSearchBtnVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const category = Object.keys(ProductType).find(
    productType => productType === pathname.slice(1),
  );

  const searchInput = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (category) {
      setIsSearchBtnVisible(true);
      setQuery('');
    }

    return () => setIsSearchBtnVisible(false);
  }, [category]);

  useEffect(() => {
    if (searchInput.current && isSearchOpen) {
      searchInput.current.focus();
    }
  }, [isSearchOpen]);

  const openSearch = () => {
    setIsSearchOpen(true);
    handleMobileMenu(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSearchInput: React.ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value);

    const trimmedQuery = e.target.value.trim().toLowerCase();

    if (trimmedQuery) {
      searchParams.set(
        'query',
        trimmedQuery
          .split(' ')
          .map(str => str.trim())
          .filter(str => str)
          .join(' '),
      );
      searchParams.set('page', '1');
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Escape') {
      setQuery('');
      setIsSearchOpen(false);
      searchParams.delete('query');
      setSearchParams(searchParams);
    }
  };

  return (
    isSearchBtnVisible && (
      <>
        <button
          className={classNames('buttonSearch', styles.btnSearch)}
          aria-label="Search products"
          onClick={openSearch}
        ></button>

        <div
          className={classNames(styles.searchInputContainer, {
            [styles.searchInputContainerIsActive]: isSearchOpen,
          })}
        >
          <input
            ref={searchInput}
            type="text"
            className={classNames(styles.searchInput, {
              [styles.searchInputCaretActive]: !!query,
            })}
            placeholder={`Search in ${category}...`}
            aria-label={`Search in ${category}...`}
            inputMode="text"
            value={query}
            onBlur={() => setIsSearchOpen(false)}
            onKeyDown={handleKeyPress}
            onChange={handleSearchInput}
          />
          <button
            className={classNames('buttonClose', styles.btnCloseSearch)}
            aria-label="Reset search"
            onClick={closeSearch}
          ></button>
        </div>
      </>
    )
  );
};
