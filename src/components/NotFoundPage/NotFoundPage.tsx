import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('pageNotFound.title')}</h1>
        <p className={styles.text}>{t('pageNotFound.text')}</p>
        <button className={styles.button}>
          <Link to="/" className={styles.link}>
            {t('pageNotFound.link')}
          </Link>
        </button>
      </div>
    </div>
  );
};
