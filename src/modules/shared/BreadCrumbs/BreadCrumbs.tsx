import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import styles from './BreadCrumbs.module.scss';
import homeIcon from '/icons/home-icon.png';
import arrowRight from '/icons/arrow-right-icon.png';

type Props = {
  productName?: string;
};

export const BreadCrumbs: React.FC<Props> = ({ productName }) => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <div>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <ul className={styles.breadcrumbs_list}>
          <li className={styles.breadcrumbs_item}>
            <Link to="/" className={styles.breadcrumbs_link}>
              <img
                src={homeIcon}
                alt="Home"
                className={styles.breadcrumbs_icon}
              />
            </Link>
          </li>
          {pathnames.map((segment, index) => {
            const to = '/' + pathnames.slice(0, index + 1).join('/');
            const isLast = index === pathnames.length - 1;
            const capitalFirstLetter = (text: string) =>
              text.charAt(0).toUpperCase() + text.slice(1);
            const label =
              isLast && productName
                ? productName
                : capitalFirstLetter(decodeURIComponent(segment));

            return (
              <React.Fragment key={to}>
                <li className={styles.breadcrumbs_separation}>
                  <img
                    src={arrowRight}
                    alt="Arrow right"
                    aria-hidden="true"
                    className={styles.breadcrumbs_arrow}
                  />
                </li>
                <li className={styles.breadcrumbs_item}>
                  {isLast ? (
                    <span className={styles.breadcrumbs_current}>{label}</span>
                  ) : (
                    <Link to={to} className={styles.breadcrumbs_link}>
                      {label}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
