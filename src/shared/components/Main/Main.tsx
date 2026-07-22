import React from 'react';
import styles from './Main.module.scss';

type Props = {
  children: React.ReactNode;
};

export const Main: React.FC<Props> = ({ children }) => (
  <main className={styles.main}>{children}</main>
);
