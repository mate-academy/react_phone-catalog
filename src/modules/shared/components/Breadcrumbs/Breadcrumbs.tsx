import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface Crumb {
  label: string;
  to?: string;
}

interface Props {
  items: Crumb[];
}

export const Breadcrumbs: React.FC<Props> = ({ items }) => (
  <nav className={styles.breadcrumbs} aria-label="breadcrumb">
    <Link to="/" className={styles.homeIcon} aria-label="Home">
      <i className="fa-solid fa-house" />
    </Link>
    {items.map((crumb, i) => (
      <span key={crumb.label} className={styles.item}>
        <i className={`fa-solid fa-chevron-right ${styles.arrow}`} />
        {crumb.to && i < items.length - 1 ? (
          <Link to={crumb.to} className={styles.link}>
            {crumb.label}
          </Link>
        ) : (
          <span className={styles.current}>{crumb.label}</span>
        )}
      </span>
    ))}
  </nav>
);
