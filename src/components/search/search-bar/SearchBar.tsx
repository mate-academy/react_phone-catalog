import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import cn from 'classnames';

import { Icons } from '@ui/index';

import { SearchButton } from '../index';
import styles from './SearchBar.module.scss';

type TProps = {
  query: string;
  isOpenInput: boolean;
  onSearch: (query: string) => void;
  setIsOpenInput: (bol: boolean) => void;
  closeSearchBar: () => void;
};

export const SearchBar: FC<TProps> = ({
  query,
  isOpenInput,
  onSearch,
  setIsOpenInput,
  closeSearchBar,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const localSearch = t('search.search');
  const localClear = t('search.clear');
  const localFocus = t('search.focus');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  useEffect(() => {
    if (isOpenInput && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpenInput && inputRef.current) {
      inputRef.current.blur();
    }
  }, [isOpenInput]);

  const onClick = () => {
    inputRef.current?.focus();
    setIsOpenInput(true);
  };

  return (
    <>
      <div className={cn(styles.wrapper, isOpenInput && styles.modal)}>
        <input
          className={cn(styles.searchBar, { [styles.active]: isOpenInput })}
          ref={inputRef}
          value={query}
          onChange={e => onSearch(e.target.value)}
          name="search"
          type="search"
          placeholder={`${localSearch}...`}
          aria-label={localSearch}
        />

        {query && (
          <SearchButton
            name="close"
            onClick={closeSearchBar}
            label={localClear}
          >
            <Icons.CloseIcon />
          </SearchButton>
        )}
      </div>

      {!query && (
        <SearchButton
          name="search"
          onClick={onClick}
          label={localFocus}
          disabled={isOpenInput}
        >
          <Icons.SearchIcon />
        </SearchButton>
      )}
    </>
  );
};
