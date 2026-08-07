import React from 'react';
import styles from './SearchInput.module.scss';
import SearchIcon from '@public/img/icons/search.svg?react';
import ClearIcon from '@public/img/icons/remove.svg?react';
import { useTranslation } from 'react-i18next';

type Props = {
  query: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

export const SearchInput: React.FC<Props> = ({ query, onChange, onClear }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.search}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="search">
        <SearchIcon className={styles.searchIcon} />
      </label>

      <input
        id="search"
        type="text"
        value={query}
        placeholder={t('input.placeholder')}
        onChange={onChange}
        className={styles.searchInput}
      />

      {query && (
        <button type="button" onClick={onClear}>
          <ClearIcon className={styles.searchClear} />
        </button>
      )}
    </div>
  );
};
