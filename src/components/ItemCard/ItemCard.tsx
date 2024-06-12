import React from 'react';
import styles from './ItemCard.module.scss';
import { Footer } from '../Footer';

export const ItemCard: React.FC = () => {
  return (
    <div className="page">
      <section className={styles.details}>
        <div className={styles.details__container}>
          <h2 className={styles.details__title}></h2>
          <div className={styles.details__content}>
            <div className={styles.details__main}></div>
            <div className={styles.details__info}></div>
          </div>
          <div className={styles['details__related-items']}></div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
