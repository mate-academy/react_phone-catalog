import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { useApp } from '../../context/AppContext';

export const NotFoundPage: React.FC = () => {
  const { language } = useApp();

  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFound__title}>404</h1>

      <p className={styles.notFound__text}>
        {language === 'eng' ? 'Page not found' : 'Сторінку не знайдено'}
      </p>

      <Link to="/" className={styles.notFound__btn}>
        {language === 'eng' ? 'Back to home' : 'На головну'}
      </Link>
    </div>
  );
};
