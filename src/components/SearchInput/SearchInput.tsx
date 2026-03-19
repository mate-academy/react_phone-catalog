import React, { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../../store/ProductsContext';
import styles from './SearchInput.module.scss';
import icons from '../../assets/icons/icons.svg';

interface Props {
  category: string;
}

export const SearchInput: React.FC<Props> = ({ category }) => {
  const { searchTerm, setSearchTerm } = useContext(ProductsContext);
  const [localValue, setLocalValue] = useState(searchTerm);

  useEffect(() => {
    setLocalValue('');
    setSearchTerm('');
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localValue.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, setSearchTerm]);

  const handleClear = () => {
    setLocalValue('');
  };

  return (
    <div className={styles.searchWrapper}>
      {localValue ? (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg className={styles.iconClear}>
            <use href={`${icons}#icon-clear`} />
          </svg>
        </button>
      ) : (
        <svg className={styles.iconSearch}>
          <use href={`${icons}#icon-search`} />
        </svg>
      )}

      <input
        type="text"
        value={localValue}
        onChange={e => setLocalValue(e.target.value)}
        placeholder={`Search in ${category}...`}
        className={styles.headerSearchInput}
      />
    </div>
  );
};
