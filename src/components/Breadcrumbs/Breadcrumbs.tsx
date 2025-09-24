import { Link, useLocation, useParams } from 'react-router-dom';
import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { useProductDetails } from '../../hooks/useProductDetails';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { itemId } = useParams();
  const category = location.state?.category;

  const pathnames = location.pathname.split('/').filter(Boolean);

  const { product } = useProductDetails(itemId, category);

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link to="/" className={styles.breadcrumbs__link}>
            <img
              src="/img/Icons/home.svg"
              alt="Home"
              className={styles.breadcrumbs__icon}
            />
          </Link>
        </li>

        {pathnames.map((segment, index) => {
          const to = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;

          const capitalizeFirst = (text: string) =>
            text.charAt(0).toUpperCase() + text.slice(1);

          const label =
            isLast && product?.name
              ? product.name
              : capitalizeFirst(decodeURIComponent(segment));

          return (
            <React.Fragment key={to}>
              <li className={styles.breadcrumbs__separator}>
                <img
                  src="/img/Icons/arrow-right.svg"
                  alt=""
                  aria-hidden="true"
                  className={styles.breadcrumbs__arrow}
                />
              </li>

              <li className={styles.breadcrumbs__item}>
                {isLast ? (
                  <span className={styles.breadcrumbs__current}>{label}</span>
                ) : (
                  <Link to={to} className={styles.breadcrumbs__link}>
                    {label}
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
