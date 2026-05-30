import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const itemsPerPage = searchParams.get('itemsPerPage') || t('All');
  const sort = searchParams.get('sort') || 'new';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function sortBy(value: string) {
    if (label === 'Sort by') {
      const params = new URLSearchParams(searchParams);

      if (value === 'new') {
        params.delete('sort');
        setSearchParams(params);

        return;
      }

      params.set('sort', value);
      setSearchParams(params);
    }

    if (label === 'Items on page') {
      const params = new URLSearchParams(searchParams);

      if (value === 'all') {
        params.delete('itemsPerPage');
        params.delete('page');
        setSearchParams(params);

        return;
      }

      params.set('itemsPerPage', value);
      params.set('page', '1');
      setSearchParams(params);
    }
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <label className={styles.label}>{t(label)}</label>
      <button
        type="button"
        className={styles.control}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {label === 'Sort by' && t(sort)}
        {label === 'Items on page' && itemsPerPage}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`} />
      </button>

      {isOpen && (
        <ul className={styles.options}>
          {options.map(option => (
            <li
              key={option.value}
              className={styles.option}
              onClick={() => {
                sortBy(option.value);
                setIsOpen(false);
              }}
            >
              {t(option.label)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
