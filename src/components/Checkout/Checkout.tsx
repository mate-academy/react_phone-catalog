import React from 'react';
import styles from './Checkout.module.scss';

type Props = {
  children: React.ReactNode;
};

export const Checkout: React.FC<Props> = ({ children }) => {
  return (
    <button type="button" className={styles.btn}>
      {children}
    </button>
  );
};
