import { FC, useRef, useState } from 'react';

import { SearchIcon } from '@ui/icon/SearchIcon';

import styles from './SearchBar.module.scss';

export const SearchBar: FC = () => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const onFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <input
        className={styles.search}
        ref={inputRef}
        value={query}
        onChange={e => setQuery(e.target.value)}
        name="search"
        placeholder="Search..."
      />
      <div onClick={onFocus} className={styles.icon}>
        <SearchIcon />
      </div>
    </>
  );
};
