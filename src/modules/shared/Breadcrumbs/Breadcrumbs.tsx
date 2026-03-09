import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
  return (
    <div className={styles.box}>
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          {index > 0 && <span className={styles.separator}>&gt;</span>}
          {item.path ? (
            <Link to={item.path} className={styles.link}>
              {index === 0 ? (
                <img src="/img/icons/home.svg" alt="Home" />
              ) : (
                item.label
              )}
            </Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
