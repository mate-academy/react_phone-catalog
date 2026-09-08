import React from 'react';
import styles from './ErrorPage.module.scss';
import { useNavigate } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.error}>
          <h1 className={styles.error__title}>Something went wrong</h1>
          <button className={styles.error__btn} onClick={() => navigate('/')}>
            Go Home
          </button>
          <img
            className={styles.error__img}
            src="./img/error.png"
            alt="Error"
          />
        </div>
      </div>
    </main>
  );
};
