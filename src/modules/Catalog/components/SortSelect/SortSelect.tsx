import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './SortSelect.module.scss';

import { SortType } from '../../../../types/sorting.types';
import { ArrowIcon } from '../../../../components/ArrowIcon';

interface SortSelectProps {
  sortBy: string;
  perPage: string;
  onSortChange: (value: string) => void;
  onPerPage: (value: string) => void;
}

export const SortSelect: React.FC<SortSelectProps> = ({
  sortBy,
  perPage,
  onSortChange,
  onPerPage,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.sortByContainer}>
      <div className={styles.selectWrapper}>
        <label className={styles.sortLabel} aria-label="Sort by">
          {t('sortBy')}
          <select
            className={styles.select}
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
          >
            <option value={SortType.Newest}>{t('sorts.Newest')}</option>
            <option value={SortType.Alphabetically}>
              {t('sorts.Alphabetically')}
            </option>
            <option value={SortType.Cheapest}>{t('sorts.Cheapest')}</option>
          </select>
        </label>

        <ArrowIcon direction="down" className={styles.selectArrow} />
      </div>

      <div className={styles.selectWrapper}>
        <label className={styles.sortLabel} aria-label="Items on page">
          {t('items')}
          <select
            className={styles.select}
            value={perPage}
            onChange={e => onPerPage(e.target.value)}
          >
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="64">64</option>
            <option value="all">All</option>
          </select>
        </label>

        <ArrowIcon direction="down" className={styles.selectArrow} />
      </div>
    </div>
  );
};
