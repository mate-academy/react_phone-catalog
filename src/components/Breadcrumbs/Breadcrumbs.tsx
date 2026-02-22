import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<Props> = ({ items }) => (
  <div className={styles.breadcrumbs}>
    <Link to="/" className={styles.homeLink}>
      <img src="img/icons/home.svg" alt="Home" />
    </Link>

    {items.map(item => (
      <React.Fragment key={item.label}>
        <span className={styles.separator}>
          <img src="img/icons/arrow-right.svg" alt="" />
        </span>

        {item.path ? (
          <Link to={item.path} className={styles.link}>
            {item.label}
          </Link>
        ) : (
          <span className={styles.current}>{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </div>
);
