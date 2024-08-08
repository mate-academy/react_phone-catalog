import React, { ReactNode } from 'react';
import styles from './GridContainer.module.scss';

interface GridContainerProps {
  children: ReactNode;
}

export const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
