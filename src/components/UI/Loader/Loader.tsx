import React from 'react';
import styles from './Loader.module.scss';
import { useTranslation } from 'react-i18next';

export const Loader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.loader}>
      <div className={styles.phone}>
        <div className={styles.screen}>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
        </div>
      </div>
      <p className={styles.text}>{t('gadgetsLoad')}</p>
    </div>
  );
};
