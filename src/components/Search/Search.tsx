// Search.tsx
import React from 'react';
import styles from './Search.module.scss';

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};
