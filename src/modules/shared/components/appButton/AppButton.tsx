import React from 'react';
import styles from './AppButton.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const AppButton: React.FC<Props> = ({ children, className }) => {
  return (
    <button className={`${styles.button} ${className}`}>{children}</button>
  );
};
