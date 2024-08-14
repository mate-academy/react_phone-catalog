import React from 'react';
import styles from './Search.module.scss';

export const Search: React.FC = () => {
  return (
    <div className={styles.search}>
      <input
        id="search"
        type="search"
        value="Not implemented yet"
        className={styles.searchInput}
      />
    </div>
  );
};
