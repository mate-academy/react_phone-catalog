import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './PerPageSelect.module.scss';

export type PerPageOption = '4' | '8' | '16' | 'all';

interface Props {
  value: PerPageOption;
  onChange: (value: PerPageOption) => void;
  className?: string;
}

export const PerPageSelect: React.FC<Props> = ({ value, onChange, className }) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as PerPageOption);
  };

  return (
    <div className={`${styles.perPageSelect} ${className || ''}`}>
      <label htmlFor="perPage" className={styles.label}>
        {t('itemsOnPage')}
      </label>
      <select id="perPage" className={styles.select} value={value} onChange={handleChange}>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="all">{t('all')}</option>
      </select>
    </div>
  );
};
