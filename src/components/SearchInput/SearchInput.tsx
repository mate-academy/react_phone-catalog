import React from 'react';
import styles from './SearchInput.module.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder = 'Search',
}) => (
  <label className={styles.search}>
    <span className={styles.icon} aria-hidden>
      🔍
    </span>
    <input
      type="search"
      className={styles.field}
      value={value}
      placeholder={placeholder}
      onChange={event => onChange(event.target.value)}
    />
  </label>
);
