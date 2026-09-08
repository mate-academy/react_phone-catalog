import React from 'react';
import styles from './BreadCrumbs.module.scss';
import { Link, useLocation } from 'react-router-dom';

interface BreadCrumbsProps {
  name?: string;
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ name }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link className={styles.link} to="/"></Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={to}>
              <li>
                <span className={styles.vector}></span>
              </li>

              <li>
                {isLast ? (
                  <span className="smallText">{name || value}</span>
                ) : (
                  <Link className="smallText" to={to}>
                    {value}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};
