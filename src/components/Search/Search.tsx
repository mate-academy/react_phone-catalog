// src/components/Search/Search.tsx
import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import { useSearchVisibility } from '../../context/SearchVisibilityContext';
import styles from './Search.module.css';

type SearchProps = {
  /** opcional: callback que recebe o termo de busca debounced */
  onSearch?: (term: string) => void;
  /** debounce em ms */
  debounceMs?: number;
};

const Search: React.FC<SearchProps> = ({ onSearch, debounceMs = 350 }) => {
  const { visible } = useSearchVisibility();
  const [term, setTerm] = useState('');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // limpa timer ao desmontar
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // debounce: chama onSearch apenas após o usuário parar de digitar
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      onSearch?.(term.trim());
      timerRef.current = null;
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [term, onSearch, debounceMs]);

  if (!visible) {
    return null;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  return (
    <div
      className={styles.searchWrapper}
      role="search"
      aria-label="Buscar produtos"
    >
      <span className={styles.searchIcon} aria-hidden="true">
        🔍
      </span>
      <input
        className={`${styles.searchInput} ${styles.withIcon}`}
        type="search"
        aria-label="Buscar produtos"
        placeholder="Buscar produtos..."
        value={term}
        onChange={handleChange}
        data-testid="header-search-input"
      />
    </div>
  );
};

export default Search;
