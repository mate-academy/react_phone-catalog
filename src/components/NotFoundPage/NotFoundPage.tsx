import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles['not-found']}>
      <h1 className={styles['not-found__title']}>{t('not_found.title')}</h1>

      <img
        src="/images/icons/shoppingbag-icon.svg"
        alt="Not found"
        className={styles['not-found__icon']}
      />

      <Link to="/" className={styles['not-found__button']}>
        {t('not_found.back_home')}
      </Link>
    </div>
  );
};
