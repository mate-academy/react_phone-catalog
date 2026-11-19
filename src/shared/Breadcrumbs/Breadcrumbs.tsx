import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
    {items.map((item, index) => {
      const isLast = index === items.length - 1;

      return (
        <Fragment key={`${item.label}-${index}`}>
          {index > 0 && <span className={styles.separator}>/</span>}
          {item.path && !isLast ? (
            <Link to={item.path} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </Fragment>
      );
    })}
  </nav>
);
