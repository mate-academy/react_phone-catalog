import React, { useEffect, useState } from 'react';
import styles from './SearchInput.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../../hooks/useDebounce';
import { getAssetUrl } from '../../../../api/utilis';

export const SearchInput = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState<string>(queryParam);
  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    if (debouncedValue.trim()) {
      searchParams.set('query', debouncedValue.trim());
      setSearchParams(searchParams);
    } else {
      searchParams.delete('query');
      setSearchParams(searchParams);
    }
  }, [debouncedValue, searchParams, setSearchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const handleClick = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setInputValue(queryParam);
    }
  };

  return (
    <div className={styles.navigationMenu__wrapper}>
      <button
        onClick={handleClick}
        className={styles.navigationMenu__button}
        type="button"
      >
        <img
          className={styles.navigationMenu__img}
          src={getAssetUrl('icons/magnifying-glass.png')}
          alt=""
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <input
          type="search"
          value={inputValue}
          onChange={handleChange}
          autoFocus
          onKeyDown={e => {
            if (e.key === 'Escape') {
              setIsOpen(false);
              setInputValue('');
              searchParams.delete('query');
              setSearchParams(searchParams);
            }
          }}
          placeholder="Find product"
          className={styles.searchInput}
        />
      )}
    </div>
  );
};
