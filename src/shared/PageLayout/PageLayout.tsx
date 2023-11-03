import React, { ReactNode } from 'react';
import styles from './PageLayout.module.scss';

type Props = {
  children: ReactNode
};

export const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};
