import React from 'react';
import styles from './Breadcrumbs.module.scss';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface Props {
  items: Breadcrumb[];
  className?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ items, className = '' }) => {
  return (
    <div className={`${styles.breadcrumbs} ${className}`}>
      {items.map((item, idx) => (
        <React.Fragment key={item.label}>
          {idx === 0 ? (
            <a href={item.href} className={styles.breadcrumbs__home} aria-label="Home">
              <img src="/img/Home.png" alt="Home" />
            </a>
          ) : (
            <>
              <img src="/img/btn-next.png" alt="Next" className={styles.breadcrumbs__arrow} />
              {item.href ? (
                <a href={item.href} className={styles.breadcrumbs__route}>
                  {item.label}
                </a>
              ) : (
                <span className={`${styles.breadcrumbs__route} ${styles['breadcrumbs__route--last']}`}>{item.label}</span>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};