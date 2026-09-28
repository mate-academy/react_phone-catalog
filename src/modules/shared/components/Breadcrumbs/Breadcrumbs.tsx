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
  <nav aria-label="Breadcrumb">
    <ol className={styles.list}>
      {items.map((item, index) => (
        <li key={item.label} className={styles.item}>
          {index > 0 && <span className={styles.separator}>/</span>}
          {item.to ? (
            <Link to={item.to} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
