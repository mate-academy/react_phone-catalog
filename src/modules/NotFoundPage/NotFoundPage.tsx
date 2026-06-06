import React from 'react';

import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1>{t('errors.pageNotFound')}</h1>
      <img className={styles.image} src="./img/page-not-found.png" alt="Image page not found" />
    </div>
  );
};
