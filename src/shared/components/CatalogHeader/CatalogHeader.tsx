import React from 'react';
import styles from './CatalogHeader.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  itemsCount: number;
}

export const CatalogHeader: React.FC<Props> = ({ title, itemsCount }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{t(title)}</h1>

      <p className={styles.description}>
        {t('ui.models_count', { count: itemsCount })}
      </p>
    </div>
  );
};
