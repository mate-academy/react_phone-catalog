import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.home}></Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('&gt;')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = name.charAt(0).toUpperCase() + name.slice(1);

        return isLast ? (
          <span key={routeTo} className={styles.current}>
            &gt; {displayName}
          </span>
        ) : (
          <React.Fragment key={routeTo}>
            <span className={styles.separator}>&gt;</span>
            <Link to={routeTo} className={styles.link}>
              {displayName}
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
};
