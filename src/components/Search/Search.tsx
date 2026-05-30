import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Search.module.scss';
import SearchIcon from '@/assets/icons/Search.svg?react';
import CloseIcon from '@/assets/icons/Close.svg?react';
import { useDebounce } from '@/hooks/useDebounce';
import { useMouseLeave } from '@/hooks/useMouseLeave';

interface Props {
  onClose?: () => void;
}

export const Search: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(searchParams.get('query') || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ----CUSTOM HOOK ---
  // // Automatically closes the search bar when the mouse leaves the container area
  useMouseLeave(containerRef, () => setIsOpen(false), isOpen);

  // --- CUSTOM HOOKS ---
  // Delays updating the search term to prevent excessive URL updates while typing
  const debouncedValue = useDebounce(value, 400);

  // --- SEARCH HANDLER ---
  const handleSearch = (searchTerm: string) => {
    const trimmed = searchTerm.trim();

    if (trimmed === '') {
      const params = new URLSearchParams(searchParams);
      params.delete('query');
      navigate({ pathname, search: params.toString() }, { replace: true });
    } else {
      navigate(`/search?query=${encodeURIComponent(trimmed)}`, {
        replace: true,
      });
    }

    setIsOpen(false);
    if (onClose) onClose();
  };

  // --- EFFECTS ---
  // Syncs the URL with the debounced input value (live search updates)
  useEffect(() => {
    if (!isOpen && !searchParams.has('query')) return;

    const trimmedValue = debouncedValue.trim();

    if (trimmedValue === '') {
      if (searchParams.has('query')) {
        const params = new URLSearchParams(searchParams);
        params.delete('query');

        navigate({ pathname, search: params.toString() }, { replace: true });
      }

      return;
    }

    navigate(`/search?query=${encodeURIComponent(trimmedValue)}`, {
      replace: true,
    });
  }, [debouncedValue, navigate, pathname]);


  // Resets local input state when user navigates away or clears the search via URL
  useEffect(() => {
    const queryInUrl = searchParams.get('query');

    if (!queryInUrl && value !== '') {
      setValue('');
      setIsOpen(false);
    }
  }, [pathname, searchParams]);



  return (
    <div className={styles.search} ref={containerRef}>
      <button
        className={styles.search__trigger}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setTimeout(() => inputRef.current?.focus(), 300);
        }}
      >
        <SearchIcon title="Search" className={styles.search__icon} />
      </button>

      <div
        className={`${styles.wrapper} ${isOpen ? styles['wrapper--active'] : ''}`}
      >
        <div className={styles.wrapper__content}>
          <form
            className={styles.form}
            onSubmit={e => {
              e.preventDefault();
              handleSearch(value);
            }}
          >
            <SearchIcon className={styles.form__icon} />
            <input
              ref={inputRef}
              type="text"
              className={styles.form__input}
              placeholder={t('search.placeholder')}
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <button
              type="button"
              className={styles.form__close}
              onClick={() => {
                setIsOpen(false);
                setValue('');
              }}
            >
              <CloseIcon title="Close" className={styles.form__icon} />
            </button>
          </form>
        </div>
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      </div>
    </div>
  );
};
