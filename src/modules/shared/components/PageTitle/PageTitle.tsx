import React from 'react';
import styles from './PageTitle.module.scss';

interface Props {
  children: React.ReactNode;
}

export const PageTitle: React.FC<Props> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};
