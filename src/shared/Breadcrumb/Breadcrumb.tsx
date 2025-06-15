import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumb.module.scss';

type Props = {
  pathnames: string[];
};

export const Breadcrumb: React.FC<Props> = ({ pathnames }) => {
  return (
    <nav className={styles.breadcrumb}>
      <ul className={styles.breadcrumb__list}>
        <li className={styles.breadcrumb__item}>
          <Link to="/" className={styles.breadcrumb__link}>
            <img
              src="img/icons/home.svg"
              alt="home"
              className={styles.breadcrumb__icon}
            />
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className={styles.breadcrumb__item}>
              <img
                src="img/icons/arrow-right-gray.svg"
                alt="arrow"
                className={styles.breadcrumb__arrow}
              />

              {!isLast ? (
                <Link to={to} className={styles.breadcrumb__link}>
                  {value}
                </Link>
              ) : (
                <span className={styles.breadcrumb__text}>{value}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
