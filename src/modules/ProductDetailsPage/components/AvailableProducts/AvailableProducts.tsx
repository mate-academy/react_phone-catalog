import React from 'react';
import styles from './AvailableProducts.module.scss';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const AvailableProducts: React.FC<Props> = ({ title, children }) => {
  return (
    <article className={styles['available-products']}>
      <p className={styles['available-products__title']}>{title}</p>
      <div className={styles['available-products__content']}>{children}</div>
    </article>
  );
};
