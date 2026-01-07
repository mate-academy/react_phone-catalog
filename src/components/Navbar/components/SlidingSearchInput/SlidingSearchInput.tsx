import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './SlidingSearchInput.module.scss';
import { CloseIcon } from '../../../icons';

interface SlidingSearchInputProps {
  isSearchOpen: boolean;
  searchQuery: string;
  handleSearchChange: (query: string) => void;
  closeSearch: () => void;
  category: string | undefined;
}

const SlidingSearchInput: React.FC<SlidingSearchInputProps> = ({
  isSearchOpen,
  searchQuery,
  handleSearchChange,
  closeSearch,
  category,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState(searchQuery);

  // ЛОГІКА АВТОФОКУСУ
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Синхронізуємо локальний стан, якщо searchQuery зміниться зовні (наприклад, при очищенні)
  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  const isFirstRender = useRef(true);

  // ЛОГІКА DEBOUNCE
  useEffect(() => {
    // Пропускаємо перший рендер, щоб не тригерити handleSearchChange дарма
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    // Встановлюємо таймер
    const handler = setTimeout(() => {
      handleSearchChange(localValue);
    }, 1500);

    // Очищуємо таймер, якщо користувач ввів наступний символ до завершення 300мс
    return () => {
      clearTimeout(handler);
    };
  }, [localValue, handleSearchChange]);

  const placeholderText =
    category && ['phones', 'tablets', 'accessories'].includes(category)
      ? `Search in ${category}`
      : 'Search...';

  return (
    <div
      className={classNames(styles.searchContainer, {
        [styles.open]: isSearchOpen,
      })}
    >
      <div className={styles.searchContent}>
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder={placeholderText}
          value={localValue}
          onChange={e => setLocalValue(e.target.value)}
        />

        {/* Кнопка закриття (X) - обов'язково для виїжджаючого пошуку */}
        <button
          className={styles.closeButton}
          onClick={closeSearch}
          aria-label="Close search"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default SlidingSearchInput;
