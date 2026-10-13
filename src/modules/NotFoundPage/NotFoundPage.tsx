import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../shared/context/LanguageContext';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>
      <img
        src="/img/page-not-found.png"
        alt="Page not found"
        className={styles.image}
      />
      <h1 className={styles.title}>{t('pageNotFound')}</h1>
      <Link to="/" className={styles.button}>
        {t('backToHome')}
      </Link>
    </div>
  );
};
