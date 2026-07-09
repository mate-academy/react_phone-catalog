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
  <nav aria-label="Breadcrumbs" className={styles.breadcrumbs}>
    <ol className={styles.list}>
      <li className={styles.item}>
        <Link to="/" className={styles.homeLink}>
          <img src="/img/icons/home.svg" alt="Home" />
        </Link>
      </li>

      {items.map((item, index) => (
        <li className={styles.item} key={`${item.path ?? item.label}-${index}`}>
          <span className={styles.separator}>
            <img src="/img/icons/arrow-right.svg" alt="" aria-hidden="true" />
          </span>

          {item.path ? (
            <Link to={item.path} className={styles.link}>
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
