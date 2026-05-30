import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';

import notFoundImage from '@/assets/img/PageNotFound.png';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <img
        src={notFoundImage}
        alt="empty.page404.title"
        className={styles.image}
      />
      <h1 className={styles.title}>{t('empty.page404.title')}</h1>
      <Link to="/" className={styles.link}>
        {t('empty.back')}
      </Link>
    </div>
  );
};
