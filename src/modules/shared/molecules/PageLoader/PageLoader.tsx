import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './PageLoader.module.scss';

export const PageLoader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <img
        src="images/loading.png"
        alt={t('loading')}
        className={styles.astronaut}
      />
    </div>
  );
};
