import styles from './SearchInput.module.scss';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../utils/searchHelper';

import closeIcon from '../../images/icons/close.svg';

type Props = {
  onSearchClose: () => void;
  toggleButtonRef: React.RefObject<HTMLButtonElement>;
};

export type SearchInputRef = {
  clearAndClose: () => void;
  focus: () => void;
};

export const SearchInput = forwardRef<SearchInputRef, Props>(
  ({ onSearchClose, toggleButtonRef }, ref) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [localQuery, setLocalQuery] = useState(query);

    const searchContainerRef = useRef<HTMLDivElement>(null);
    const inputElementRef = useRef<HTMLInputElement>(null);

    const debouncedSetSearchParams = useCallback(
      (value: string) => {
        const newSearch = getSearchWith(searchParams, {
          query: value || null,
          page: null,
        });

        setSearchParams(newSearch, { replace: true });
      },
      [searchParams, setSearchParams],
    );

    useEffect(() => {
      const timerId = setTimeout(() => {
        if (localQuery !== query) {
          debouncedSetSearchParams(localQuery);
        }
      }, 300);

      return () => clearTimeout(timerId);
    }, [localQuery, query, debouncedSetSearchParams]);

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalQuery(event.target.value);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          toggleButtonRef.current &&
          toggleButtonRef.current.contains(event.target as Node)
        ) {
          return;
        }

        if (
          searchContainerRef.current &&
          !searchContainerRef.current.contains(event.target as Node)
        ) {
          if (!localQuery) {
            onSearchClose();
          }
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, [localQuery, onSearchClose, toggleButtonRef]);

    const handleClearAndClose = () => {
      setLocalQuery('');
      const newSearch = getSearchWith(searchParams, {
        query: null,
        page: null,
      });

      setSearchParams(newSearch, { replace: true });
      onSearchClose();
    };

    useImperativeHandle(ref, () => ({
      clearAndClose: handleClearAndClose,
      focus: () => {
        inputElementRef.current?.focus();
      },
    }));

    return (
      <div className={styles.search} ref={searchContainerRef}>
        <input
          ref={inputElementRef}
          type="text"
          className={styles.search__searchInput}
          placeholder="Search..."
          value={localQuery}
          onChange={handleQueryChange}
        />
        {localQuery && (
          <button
            className={styles.search__clearButton}
            onClick={handleClearAndClose}
          >
            <img src={closeIcon} alt="Clear and close search" />
          </button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';
