import React from 'react';
import styles from './Main.module.scss';

interface Props {
  children: React.ReactNode;
}

export const Main: React.FC<Props> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.main__content}>{children}</div>
    </main>
  );
};
