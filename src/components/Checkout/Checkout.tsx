import React from 'react';
import styles from './Checkout.module.scss';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export const Checkout = ({ children, onClick }: Props) => {
  return (
    <button
      type="button"
      className={styles.btn}
      onClick={onClick}
    >
      {children}
    </button>
  );
};