import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import homeIcon from '../../../../public/img/icons/Home.svg';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  const pathParts = location.pathname.split('/').filter(Boolean);

  const crumbs = [];

  // Always add a house icon as the first crumb
  crumbs.push({
    label: '',
    path: '/',
    isHome: true,
  });

  let path = '';

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];

    if (part === 'products' || part === 'books') {
      continue;
    }

    path += `/${part}`;

    const label = decodeURIComponent(part)
      .replace(/-/g, ' ') // i-phone → i phone
      .replace(/\b\w/g, char => char.toUpperCase()); // the first letter is capital

    crumbs.push({ label, path });
  }

  return (
    <nav className={styles.breadcrumbs}>
      {crumbs.map((crumb, index) => (
        <span key={index} className={styles.crumb}>
          <Link to={crumb.path} className={styles.link}>
            {crumb.isHome ? (
              <span className={styles.homeIcon}>
                <img src={homeIcon} alt="Home" />
              </span>
            ) : (
              crumb.label
            )}
          </Link>

          {index < crumbs.length - 1 && (
            <span className={styles.separator}>&gt;</span>
          )}
        </span>
      ))}
    </nav>
  );
};
