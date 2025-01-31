import React from 'react';
import styles from './Checkout.module.scss';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export const Checkout: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button type="button" className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};
