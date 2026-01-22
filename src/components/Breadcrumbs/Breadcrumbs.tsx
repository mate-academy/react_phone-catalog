/* src/components/Breadcrumbs/Breadcrumbs.tsx */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

// 👇 Zmieniono na Angielski dla spójności z resztą sklepu
const breadcrumbNameMap: { [key: string]: string } = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  favorites: 'Favourites', // lub 'Favorites' zależnie od wersji
  cart: 'Cart',
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Nie pokazujemy breadcrumbs na stronie głównej
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <div className="container">
      <nav className={styles.breadcrumbs} aria-label="breadcrumb">
        <Link to="/" className={styles.homeLink}>
          <img
            src="/img/icons/Home.svg"
            alt="Home"
            className={styles.homeIcon}
          />
        </Link>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          const name = breadcrumbNameMap[value] || value;

          return (
            <React.Fragment key={to}>
              <span className={styles.separator}>
                <img src="/img/icons/arrow-right.svg" alt=">" />
              </span>

              {last ? (
                <span className={styles.current}>{name}</span>
              ) : (
                <Link to={to} className={styles.link}>
                  {name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};
