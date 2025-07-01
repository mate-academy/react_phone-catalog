import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <img
          src="img/page-not-found.png"
          alt={t('notFoundPage.imageAlt')}
          className={styles.image}
        />
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>{t('notFoundPage.subtitle')}</p>
        <p className={styles.description}>{t('notFoundPage.description')}</p>
        <Link to="/" className={styles.homeButton}>
          {t('notFoundPage.homeButton')}
        </Link>
      </div>
      <div className={styles.background}></div>
    </div>
  );
};
