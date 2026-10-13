import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
  return (
    <nav
      className={styles.breadcrumbs}
      aria-label="Breadcrumb"
      data-cy="breadcrumbs"
    >
      <Link to="/" className={styles.homeLink} aria-label="Home">
        <i className="fas fa-home" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={item.label}>
            <span className={styles.separator}>
              <i className="fas fa-chevron-right" />
            </span>

            {isLast || !item.path ? (
              <span className={styles.current}>{item.label}</span>
            ) : (
              <Link to={item.path} className={styles.link}>
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
