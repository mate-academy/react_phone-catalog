import React from 'react';
import cn from 'classnames';

import styles from './BadgeIcon.module.scss';

type Props = {
  icon: 'favourites' | 'cart';
  count: number;
  className?: string;
};

export const BadgeIcon: React.FC<Props> = ({ icon, count, className }) => {
  return (
    <span className={cn(styles.badgeIcon, styles[icon], className)}>
      {count > 0 && (
        <span className={styles.badge}>{count > 99 ? '99+' : count}</span>
      )}
    </span>
  );
};
