import React from 'react';
import { useLocation } from 'react-router-dom';
import { PreviousPage } from '../../components/PreviousPage';
import styles from './NotFoundPage.module.scss';
import { GoBack } from '../../components/GoBack';

export const NotFoundPage: React.FC = () => {
  const category = useLocation().pathname.slice(1);

  return (
    <div>
      <PreviousPage category={category} />
      <div className={styles.cartPage}>
        <div className={styles.topContainer}>
          <div className={styles.topLeft}>
            <GoBack />
          </div>

          <h1 className={styles.title}>Page not found</h1>
        </div>

        <div className={styles.emptyContainer}>
          <img
            src="img/page-not-found.png"
            className={styles.image}
            alt="Page not found"
          />
        </div>
      </div>
    </div>
  );
};
