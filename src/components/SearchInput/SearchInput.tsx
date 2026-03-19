import React, { useState, useEffect } from 'react';
import styles from './SearchInput.module.scss';
import icons from '../../assets/icons/icons.svg';

interface Props {
  value: string;
  onChange: (v: string) => void;
  category: string;
}

export const SearchInput: React.FC<Props> = ({ value, onChange, category }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue, onChange]);

  return (
    <div className={styles.searchWrapper}>
      {inputValue ? (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
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
        value={inputValue}
        onChange={handleInput}
        placeholder={`Search in ${category}...`}
        className={styles.headerSearchInput}
      />
    </div>
  );
};
