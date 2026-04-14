import React from 'react';
import styles from './Badge.module.scss';
import classNames from 'classnames';

interface BadgeProps {
  count?: number;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ count, children }) => {
  const showBadge = count !== undefined && count > 0;

  return (
    <div className={styles.container}>
      {children}
      {showBadge && (
        <span className={classNames(styles.badge, 'small-text')}>{count > 99 ? '99+' : count}</span>
      )}
    </div>
  );
};
