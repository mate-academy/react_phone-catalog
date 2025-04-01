import React from 'react';
import styles from './Icons.module.scss';

interface HeartIconProps {
  count?: number;
}

export const HeartIcon: React.FC<HeartIconProps> = ({ count = 0 }) => {
  return (
    <div className={styles.icon}>
      <span className={styles.icon__heart}>
        {count > 0 && <span className={styles.icon__count}>{count}</span>}
      </span>
    </div>
  );
};
