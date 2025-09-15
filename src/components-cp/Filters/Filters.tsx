import React, { useState, useEffect } from 'react';
import styles from './Filters.module.scss';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

interface FiltersProps {
  visibleCount: number | 'all';
  setVisibleCount: (value: number | 'all') => void;
  setSortField: (field: 'age' | 'title' | 'price') => void;
  setSortDirection: (dir: 'asc' | 'desc') => void;
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
  setSortDirection,
}) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort') as
    | 'age'
    | 'title'
    | 'price'
    | null;
  const directionParam = searchParams.get('direction') as 'asc' | 'desc' | null;

  const [sortValue, setSortValue] = useState<'age' | 'title' | 'price'>(
    sortParam || 'age',
  );
  const [directionValue, setDirectionValue] = useState<'asc' | 'desc'>(
    directionParam || 'desc',
  );
  const [sortOpen, setSortOpen] = useState(false);
  const [itemsOpen, setItemsOpen] = useState(false);

  useEffect(() => {
    setSortField(sortValue);
    setSortDirection(directionValue);
  }, [sortValue, directionValue, setSortField, setSortDirection]);

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

    params.direction = directionValue;

    setSearchParams(params, { replace: true });
    setSortOpen(false);
  };

  const toggleDirection = () => {
    const newDir = directionValue === 'asc' ? 'desc' : 'asc';

    setDirectionValue(newDir);
    setSortDirection(newDir);

    const params: Record<string, string> = {};

    if (sortValue !== 'age') {
      params.sort = sortValue;
    }

    if (visibleCount !== 'all') {
      params.perPage = String(visibleCount);
    }

    params.direction = newDir;

    setSearchParams(params, { replace: true });
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

    params.direction = directionValue;

    setSearchParams(params, { replace: true });
    setItemsOpen(false);
  };

  return (
    <div className={styles.filters}>
      {/* Сортировка */}
      <div className={styles.filterItem}>
        <span className={styles.filterName}>{t('filters.sort.title')}</span>
        <div
          className={`${styles.selectWrapper} ${sortOpen ? styles.open : ''}`}
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
        <span className={styles.filterName}>{t('filters.sort.order')}</span>
        <div
          className={`${styles.directionToggle} ${directionValue}`}
          onClick={toggleDirection}
        >
          <span className={styles.arrow}></span>
        </div>
      </div>

      {/* Элементы на странице */}
      <div className={styles.filterItem}>
        <span className={styles.filterName}>
          {t('filters.itemsPerPage.title')}
        </span>
        <div
          className={`${styles.selectWrapper} ${itemsOpen ? styles.open : ''}`}
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
