import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  pathnames: string[];
};

export const Breadcrumbs: React.FC<Props> = ({ pathnames }) => {
  return (
    <nav className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link className={styles.breadcrumbs__linkHome} to="/">
            <img
              className={styles.breadcrumbs__icon}
              src="icons/home-icon.svg"
              alt="Home icon link"
            />
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={to} className={styles.breadcrumbs__item}>
              <img src="icons/breadcrumbs-arrow-icon.svg" alt="" />

              {!last ? (
                <Link to={to} className={styles.breadcrumbs__link}>
                  {value}
                </Link>
              ) : (
                <span className={styles.breadcrumbs__text}>{value}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
