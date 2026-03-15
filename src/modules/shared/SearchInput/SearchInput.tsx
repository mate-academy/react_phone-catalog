import React from 'react';
import styles from './SearchInput.module.scss';

type Props = {
  query: string;
  placeholder: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export const SearchInput: React.FC<Props> = ({
  query,
  placeholder,
  onChange,
  onClear,
}) => (
  <>
    <input
      type="search"
      className={styles.searchInput}
      placeholder={placeholder}
      value={query}
      onChange={e => onChange(e.target.value)}
    />
    {query ? (
      <button className={styles.searchClear} onClick={onClear}>
        <img src="img/icons/close.svg" alt="clear" />
      </button>
    ) : (
      <img
        src="img/icons/search.svg"
        alt="search"
        className={styles.searchIcon}
      />
    )}
  </>
);
