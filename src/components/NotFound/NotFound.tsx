import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>{t('pageNotFound')}</p>
      <Link to="/" className={styles.back}>
        {t('backToHome')}
      </Link>
    </div>
  );
};
