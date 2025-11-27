/* eslint-disable max-len */
import { FC, useRef } from 'react';
import s from './SearchBar.module.scss';
import { useSearchParamsState } from '../../../CategoryPage/hooks/useSearchParamsState';

export const SearchBar: FC = () => {
  const { query, setQuery } = useSearchParamsState();
  const inputRef = useRef(null);

  const clearSearch = () => {
    setQuery('');
    //inputRef.current.focus();
  };

  return (
    <div className={s.wrapper}>
      <span className={s.iconSearch}></span>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className={s.input}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {query && (
        <button className={s.clearBtn} onClick={clearSearch}>
          ×
        </button>
      )}
    </div>
  );
};
