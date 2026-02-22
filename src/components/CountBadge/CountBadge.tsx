import React from 'react';
import classNames from 'classnames';
import styles from './CountBadge.module.scss';

interface CountBadgeProps {
  count: number;
  className: string;
}

export const CountBadge: React.FC<CountBadgeProps> = ({ count, className }) => {
  if (count <= 0) {
    return null;
  }

  return (
    <div className={classNames(styles.countContainer, styles[className])}>
      <span className={styles.countBadge}>{count}</span>
    </div>
  );
};
