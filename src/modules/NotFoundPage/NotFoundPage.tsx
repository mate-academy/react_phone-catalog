import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.notFoundPage}>
      <h2 className={styles.notFoundPage__text}> {t('page_not_found')}</h2>
      <img
        className={styles.notFoundPage__image}
        src="./img/page-not-found.png"
        alt="error 404"
      />
      <Link className={styles.goHome} to="/">
        {t('click_go_home')}
      </Link>
    </div>
  );
};
