import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductNotFound.module.scss';
import { useTranslation } from 'react-i18next';

export const ProductNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('productNotFound.title')}</h1>
        <p className={styles.text}>{t('productNotFound.text')}</p>
        <button className={styles.button}>
          <Link to="/" className={styles.link}>
            {t('productNotFound.link')}
          </Link>
        </button>
      </div>
    </div>
  );
};
