import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__content}>
        <img
          src="/img/page-not-found.png"
          alt="Page not found"
          className={styles.notFound__image}
        />
        <h1 className={styles.notFound__title}>Page not found</h1>

        <button
          type="button"
          className={styles.notFound__button}
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
