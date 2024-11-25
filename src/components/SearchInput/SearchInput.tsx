/* eslint-disable max-len */
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
          aria-label="Open search input"
          onClick={openSearch}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.66683 7.33334C2.66683 4.75601 4.75617 2.66668 7.3335 2.66668C9.91083 2.66668 12.0002 4.75601 12.0002 7.33334C12.0002 8.59061 11.503 9.73176 10.6945 10.5709C10.6716 10.5884 10.6497 10.6077 10.6287 10.6286C10.6078 10.6495 10.5886 10.6715 10.571 10.6943C9.73189 11.5028 8.59075 12 7.3335 12C4.75617 12 2.66683 9.91067 2.66683 7.33334ZM11.0786 12.0213C10.0522 12.8424 8.75016 13.3333 7.3335 13.3333C4.01979 13.3333 1.3335 10.6471 1.3335 7.33334C1.3335 4.01963 4.01979 1.33334 7.3335 1.33334C10.6472 1.33334 13.3335 4.01963 13.3335 7.33334C13.3335 8.75003 12.8425 10.052 12.0214 11.0785L14.4715 13.5286C14.7319 13.789 14.7319 14.2111 14.4715 14.4714C14.2112 14.7318 13.7891 14.7318 13.5287 14.4714L11.0786 12.0213Z" />
          </svg>
        </button>

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
            className={styles.btnCloseSearch}
            aria-label="Close search"
            onClick={closeSearch}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894 12.4716 3.52859C12.2112 3.26824 11.7891 3.26824 11.5288 3.52859L8.00016 7.05719L4.47157 3.52859C4.21122 3.26824 3.78911 3.26824 3.52876 3.52859C3.26841 3.78894 3.26841 4.21105 3.52876 4.4714L7.05735 7.99999L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.9428L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99999L12.4716 4.4714Z" />
            </svg>
          </button>
        </div>
      </>
    )
  );
};
