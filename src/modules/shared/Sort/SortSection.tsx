import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './SortSection.module.scss';
import { useTranslation } from 'react-i18next';

export type SortOption = 'age' | 'title' | 'price';
export type PerPageOption = '4' | '8' | '16' | 'all';

interface SortSectionProps {
  sort: SortOption;
  handleSortChange: (value: SortOption) => void;
  perPage: PerPageOption;
  handlePerPageChange: (value: PerPageOption) => void;
}

export const SortSection: React.FC<SortSectionProps> = ({
  sort,
  handleSortChange,
  perPage,
  handlePerPageChange,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);
  const { t } = useTranslation();

  const sortRef = useRef<HTMLDivElement>(null);
  const perPageRef = useRef<HTMLDivElement>(null);

  const sortLabels: Record<SortOption, string> = {
    age: t('Newest'),
    title: t('Alphabetically'),
    price: t('Cheapest'),
  };

  const perPageLabels: Record<PerPageOption, string> = {
    '4': '4',
    '8': '8',
    '16': '16',
    all: t('All'),
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (sortRef.current && !sortRef.current.contains(target)) {
        setIsSortOpen(false);
      }

      if (perPageRef.current && !perPageRef.current.contains(target)) {
        setIsPerPageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.sortSection}>
      <div className={styles.sort} ref={sortRef}>
        <p className={styles.sortText}>{t('Sort')}</p>
        <div className={styles.dropdownContainer}>
          <button
            type="button"
            className={classNames(styles.dropdownField, {
              [styles.focus]: isSortOpen,
            })}
            onClick={() => {
              setIsSortOpen(!isSortOpen);
              setIsPerPageOpen(false);
            }}
          >
            <span>{sortLabels[sort]}</span>
            <img
              src="/img/icons/arrow_down_noactive.svg"
              alt=""
              className={classNames(styles.arrow, {
                [styles.arrowActive]: isSortOpen,
              })}
            />
          </button>

          {isSortOpen && (
            <ul className={styles.dropdownList}>
              {(Object.keys(sortLabels) as SortOption[]).map(optionKey => (
                <li
                  key={optionKey}
                  className={classNames(styles.dropdownItem, {
                    [styles.selectedItem]: optionKey === sort,
                  })}
                  onClick={() => {
                    handleSortChange(optionKey);
                    setIsSortOpen(false);
                  }}
                >
                  {sortLabels[optionKey]}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.sort} ref={perPageRef}>
        <p className={styles.sortText}>{t('ItemsPage')}</p>
        <div className={styles.dropdownContainer}>
          <button
            type="button"
            className={classNames(styles.dropdownField, {
              [styles.focus]: isPerPageOpen,
            })}
            onClick={() => {
              setIsPerPageOpen(!isPerPageOpen);
              setIsSortOpen(false);
            }}
          >
            <span>{perPageLabels[perPage]}</span>
            <img
              src="/img/icons/arrow_down_noactive.svg"
              alt=""
              className={classNames(styles.arrow, {
                [styles.arrowActive]: isPerPageOpen,
              })}
            />
          </button>
          {isPerPageOpen && (
            <ul className={styles.dropdownList}>
              {(Object.keys(perPageLabels) as PerPageOption[]).map(
                optionKey => (
                  <li
                    key={optionKey}
                    className={classNames(styles.dropdownItem, {
                      [styles.selectedItem]: optionKey === perPage,
                    })}
                    onClick={() => {
                      handlePerPageChange(optionKey);
                      setIsPerPageOpen(false);
                    }}
                  >
                    {perPageLabels[optionKey]}
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
