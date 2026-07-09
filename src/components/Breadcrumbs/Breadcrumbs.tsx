import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import React from 'react';
type Props = {
  product?: {
    name: string;
    category: string;
  };
};
export const Breadcrumbs: React.FC<Props> = ({ product }) => {
  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  const location = useLocation();
  const allPageNav = [{ label: 'Home', to: '/' }];

  if (!product) {
    if (location.pathname.startsWith('/phones')) {
      allPageNav.push({ label: 'Phones', to: '/phones' });
    }

    if (location.pathname.startsWith('/tablets')) {
      allPageNav.push({ label: 'Tablets', to: '/tablets' });
    }

    if (location.pathname.startsWith('/accessories')) {
      allPageNav.push({ label: 'Accessories', to: '/accessories' });
    }

    if (location.pathname.startsWith('/cart')) {
      allPageNav.push({ label: 'Cart', to: '/cart' });
    }

    if (location.pathname.startsWith('/favorites')) {
      allPageNav.push({ label: 'Favorites', to: '/favorites' });
    }
  }

  if (product) {
    allPageNav.push({
      label: capitalize(product.category),
      to: `/${product.category}`,
    });

    allPageNav.push({
      label: product.name,
      to: location.pathname,
    });
  }

  return (
    <nav className={styles.pageNavigation}>
      {allPageNav.map((crumb, index) => (
        <span key={crumb.to} className={styles.pageNavigation__item}>
          {index > 0 && (
            <img
              src="./img/icons/arrowRightBtn.svg"
              alt="arrow"
              className={styles.pageNavigation__separator}
            />
          )}

          {index < allPageNav.length - 1 ? (
            <Link to={crumb.to} className={styles.pageNavigation__link}>
              {crumb.to === '/' ? (
                <img
                  src="./img/icons/Home.svg"
                  alt="Home"
                  className={styles.pageNavigation__homeImg}
                />
              ) : (
                crumb.label
              )}
            </Link>
          ) : (
            <span className={styles.pageNavigation__current}>
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};
