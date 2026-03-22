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

export const Search: React.FC<Props> = ( { onClose}) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(searchParams.get('query') || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Custom hook to delay the update of the search term
  const debouncedValue = useDebounce(value, 400);

  useMouseLeave(containerRef, () => setIsOpen(false), isOpen);

  // Reset search state when navigating via Menu (if URL has no query)
  useEffect(() => {
    const queryInUrl = searchParams.get('query');

    if (!queryInUrl && value !== '') {
      setValue('');
      setIsOpen(false);
    }
  }, [pathname, searchParams]);

  // Handle Search Navigation & URL Cleanup
  useEffect(() => {
    if (!isOpen && !searchParams.has('query')) return;

    const trimmedValue = debouncedValue.trim();

    // CASE: Input is empty -> Remove "query" from URL
    if (trimmedValue === '') {
      if (searchParams.has('query')) {
        const params = new URLSearchParams(searchParams);
        params.delete('query');

        navigate({ pathname, search: params.toString() }, { replace: true });

        if (onClose) {
          onClose();
          setIsOpen(false);
        }
      }
      return;
    }

    // CASE: Navigate to global search results
    navigate(`/search?query=${encodeURIComponent(trimmedValue)}`, {
      replace: true,
    });
  }, [debouncedValue, navigate, pathname]);


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
              setIsOpen(false);
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
      </div>
    </div>
  );
};;
