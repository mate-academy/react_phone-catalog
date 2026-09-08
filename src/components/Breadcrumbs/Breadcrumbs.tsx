import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import homeSvg from '/img/icons/home.svg';

import styles from './Breadcrumbs.module.scss';

const breadcrumbNameMap: { [key: string]: string } = {
  catalog: 'Catalog',
  favorites: 'Favorites',
  cart: 'Cart',
  product: 'Product',
};

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const [productName, setProductName] = useState<string | null>(null);

  useEffect(() => {
    const productIdIndex = pathnames.findIndex(p => p === 'product');
    const productId = pathnames[productIdIndex + 1];

    if (productId) {
      const formattedName = productId.replace(/-/g, ' ');

      setProductName(formattedName);
    }
  }, [pathnames, location]);

  return (
    <nav
      className={`main-text main-text--sm main-text--secondary`}
      aria-label="breadcrumb"
      style={{ margin: '1rem 0' }}
    >
      <img
        className={styles['breadcrumb-home-img']}
        src={homeSvg}
        alt="Navigate to home page"
      />
      <Link className={styles.breadcrumbs__link} to="/">
        Home
      </Link>
      {pathnames.map((value, index) => {
        if (value === 'product') {
          return null;
        } // skip "product" in productPage

        const isLast =
          index === pathnames.length - 1 ||
          (pathnames[index - 1] === 'product' &&
            index === pathnames.length - 1);
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        const name =
          pathnames[index - 1] === 'product'
            ? productName
            : breadcrumbNameMap[value] ||
              value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <span key={to}>
            {' | '}
            {isLast ? <span>{name}</span> : <Link to={to}>{name}</Link>}
          </span>
        );
      })}
    </nav>
  );
};
