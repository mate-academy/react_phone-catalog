import React, { Children, ReactNode } from 'react';
import styles from './Actions.module.scss';

type Props = {
  children: ReactNode,
};

export const Actions: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.actions}>
      {Children.toArray(children).map(child => (
        <div className={styles.action}>
          {child}
        </div>
      ))}
    </div>
  );
};
