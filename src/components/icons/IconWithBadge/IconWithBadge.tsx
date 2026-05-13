import styles from './IconWithBadge.module.scss';
import React from 'react';

type Props = {
  icon: string;
  alt: string;
  badgeCount?: number;
};

export const IconWithBadge: React.FC<Props> = ({
  icon,
  alt,
  badgeCount = 0,
}) => {
  return (
    <div className={styles.wrapper}>
      <img src={icon} alt={alt} className={styles.icon} />

      {badgeCount > 0 && <span className={styles.badge}>{badgeCount}</span>}
    </div>
  );
};
