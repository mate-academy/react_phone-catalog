import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './IconBadge.module.scss';

interface Props {
  to: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
  mobile?: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IconBadge: React.FC<Props> = ({
  to,
  icon,
  label,
  count,
  mobile = false,
  setIsMenuOpen,
}) => (
  <Link
    to={to}
    className={styles.wrapper}
    aria-label={label}
    onClick={() => setIsMenuOpen(false)}
  >
    <span className={styles.icon}>{icon}</span>
    <span
      className={classNames(mobile ? styles.mobileBadge : styles.badge, {
        [styles.visible]: count,
      })}
    >
      {count}
    </span>
  </Link>
);
