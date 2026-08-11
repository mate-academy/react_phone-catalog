import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SortSelect.module.scss';

export type SortOption = 'age' | 'title' | 'price';

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

export const SortSelect: React.FC<Props> = ({ value, onChange, className }) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as SortOption);
  };

  return (
    <div className={`${styles.sortSelect} ${className || ''}`}>
      <label htmlFor="sort" className={styles.label}>
        {t('sortBy')}
      </label>
      <select id="sort" className={styles.select} value={value} onChange={handleChange}>
        <option value="age">{t('newest')}</option>
        <option value="title">{t('alphabetically')}</option>
        <option value="price">{t('cheapest')}</option>
      </select>
    </div>
  );
};
