import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';
import { useLanguage } from '../../context/LanguageContext';

import { getAssetUrl } from '../../utils/helpers';

export const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t('notFound.documentTitle');
  }, [t]);

  return (
    <div
      className={`${styles.notFoundPage} container`}
      data-testid="not-found-page"
    >
      <img
        src={getAssetUrl('img/page-not-found.png')}
        alt={t('notFound.title')}
        className={styles.image}
      />
      <h1 className={styles.title}>{t('notFound.title')}</h1>
      <p className={styles.text}>{t('notFound.text')}</p>
      <Link to="/" className={styles.homeBtn}>
        {t('notFound.goHome')}
      </Link>
    </div>
  );
};
