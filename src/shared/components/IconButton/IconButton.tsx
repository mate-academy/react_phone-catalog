import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './IconButton.module.scss';

export type IconButtonProps = {
  to: string;
  src: string;
  alt: string;
  count?: number;
};

export const IconButton: React.FC<IconButtonProps> = ({
  to,
  src,
  alt,
  count,
}) => (
  <NavLink to={to} className={styles.iconBox}>
    <div className={styles.iconWrapper}>
      <img className={styles.icon} src={src} alt={alt} />
      {count! > 0 && <span className={styles.badge}>{count}</span>}
    </div>
  </NavLink>
);
