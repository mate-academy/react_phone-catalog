import React from 'react';
import styles from './Breadcrumbs.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Breadcrumbs: React.FC<{
  currentCategory: string;
  currentProduct: string;
}> = ({ currentCategory, currentProduct }) => {
  return (
    <nav className={styles.breadcrumbs}>
      <NavLink to={'/'} className={styles['home-link']}>
        <img
          src="Images/Home.svg"
          alt="Home"
          className={classNames(styles['home-image'])}
        />
      </NavLink>
      {currentCategory ? (
        <img
          src="Images/Arrow-right.svg"
          alt="Arrow"
          className={styles['arrow-image']}
        />
      ) : (
        ''
      )}
      {currentProduct ? (
        <NavLink
          to={`/catalog/${currentCategory}`}
          className={classNames(styles['small-title'], {
            [styles['is-active']]: currentProduct,
          })}
        >
          {currentCategory}
        </NavLink>
      ) : (
        <p
          className={classNames(styles['small-title'], {
            [styles['is-active']]: currentProduct,
          })}
        >
          {currentCategory}
        </p>
      )}
      {currentProduct && (
        <>
          <img
            src="Images/Arrow-right.svg"
            alt="Arrow"
            className={styles['arrow-image']}
          />
          <p className={styles['small-title']}> {currentProduct}</p>
        </>
      )}
    </nav>
  );
};
