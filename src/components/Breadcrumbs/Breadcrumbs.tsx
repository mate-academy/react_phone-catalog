import styles from './Breadcrumbs.module.scss';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useProducts } from '../../context/useProducts';

import homeIcon from '../../images/icons/home.svg';
import arrowRightGreyIcon from '../../images/icons/arrow-right-grey.svg';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const [productName, setProductName] = useState<string | null>(null);
  const { products } = useProducts();

  useEffect(() => {
    const lastSegment = pathnames[pathnames.length - 1];

    const product = products.find(p => p.itemId === lastSegment);

    if (product) {
      setProductName(product.name);
    } else {
      setProductName(null);
    }
  }, [location.pathname, pathnames, products]);

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/">
        <div className={styles.breadcrumbs__home}>
          <img
            className={styles.breadcrumbs__homeImg}
            src={homeIcon}
            alt="home"
          />
        </div>
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        const label = isLast && productName ? productName : capitalize(value);

        return isLast ? (
          <div key={to} className={styles.breadcrumbs__current}>
            <img src={arrowRightGreyIcon} alt="arrow-right" />
            <span className={styles.breadcrumbs__currenText}>{label}</span>
          </div>
        ) : (
          <div key={to} className={styles.breadcrumbs__link}>
            <img src={arrowRightGreyIcon} alt="arrow-right" />
            <Link to={to} className={styles.breadcrumbs__linkText}>
              {label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};
