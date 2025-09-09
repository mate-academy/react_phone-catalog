import React, { useState, useRef } from 'react';
import styles from './Filters.module.scss';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

interface FiltersProps {
  visibleCount: number | 'all';
  setVisibleCount: (value: number | 'all') => void;
  setSortField: (field: 'age' | 'title' | 'price') => void;
}

const sortOptions = [
  { value: 'age', labelKey: 'filters.sort.newest' },
  { value: 'title', labelKey: 'filters.sort.alphabetically' },
  { value: 'price', labelKey: 'filters.sort.cheapest' },
];

const itemsPerPageOptions = ['4', '8', '16', '32', 'all'];

export const Filters: React.FC<FiltersProps> = ({
  visibleCount,
  setVisibleCount,
  setSortField,
}) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort') as
    | 'age'
    | 'title'
    | 'price'
    | null;
  const [sortValue, setSortValue] = useState<'age' | 'title' | 'price'>(
    sortParam || 'age',
  );

  const [sortOpen, setSortOpen] = useState(false);
  const [itemsOpen, setItemsOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const handleSortChange = (value: 'age' | 'title' | 'price') => {
    setSortValue(value);
    setSortField(value);

    const params: Record<string, string> = {};

    if (value !== 'age') {
      params.sort = value;
    }

    if (visibleCount !== 'all') {
      params.perPage = String(visibleCount);
    }

    setSearchParams(params, { replace: true });

    setSortOpen(false);
  };

  const handleItemsChange = (opt: string) => {
    const newCount = opt === 'all' ? 'all' : Number(opt);

    setVisibleCount(newCount);

    const params: Record<string, string> = {};

    if (sortValue !== 'age') {
      params.sort = sortValue;
    }

    if (newCount !== 'all') {
      params.perPage = String(newCount);
    }

    setSearchParams(params, { replace: true });

    setItemsOpen(false);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterItem}>
        <span className={styles.filterName}>{t('filters.sort.title')}</span>
        <div
          className={`${styles.selectWrapper} ${sortOpen ? styles.open : ''}`}
          ref={sortRef}
        >
          <div
            className={styles.selectDisplay}
            onClick={() => setSortOpen(prev => !prev)}
          >
            {t(sortOptions.find(o => o.value === sortValue)?.labelKey || '')}
            <span className={styles.arrow}></span>
          </div>
          {sortOpen && (
            <ul className={styles.selectList}>
              {sortOptions.map(option => (
                <li
                  key={option.value}
                  className={
                    sortValue === option.value ? styles.activeOption : ''
                  }
                  onClick={() => handleSortChange(option.value)}
                >
                  {t(option.labelKey)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.filterItem}>
        <span className={styles.filterName}>
          {t('filters.itemsPerPage.title')}
        </span>
        <div
          className={`${styles.selectWrapper} ${itemsOpen ? styles.open : ''}`}
          ref={itemsRef}
        >
          <div
            className={styles.selectDisplay}
            onClick={() => setItemsOpen(prev => !prev)}
          >
            {visibleCount === 'all'
              ? t('filters.itemsPerPage.all')
              : visibleCount}
            <span className={styles.arrow}></span>
          </div>
          {itemsOpen && (
            <ul className={styles.selectList}>
              {itemsPerPageOptions.map(opt => (
                <li
                  key={opt}
                  className={
                    visibleCount.toString() === opt ? styles.activeOption : ''
                  }
                  onClick={() => handleItemsChange(opt)}
                >
                  {opt === 'all' ? t('filters.itemsPerPage.all') : opt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
