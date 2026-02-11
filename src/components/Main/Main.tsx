import React from 'react';
import styles from './Main.module.scss';

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export const Main: React.FC<MainProps> = ({ children, className }) => {
  return (
    <main className={`${styles.main} ${styles[`main--${className}`] || ''}`}>
      {children}
    </main>
  );
};
