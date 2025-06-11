import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { getAssetUrl } from '../../../api/utilis';

type BreadcrumbsProps = {
  category: string;
  name?: string;
};

export const Breadcrumbs = ({ category, name }: BreadcrumbsProps) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link className={styles.breadcrumbs__link} to="/">
        <img
          className={styles.breadcrumbs__img}
          src={getAssetUrl('icons/home.svg')}
          alt="return to home"
        />
      </Link>
      {category && (
        <>
          <span className={styles.breadcrumbs__arrow}>
            <img
              className={styles.breadcrumbs__img}
              src={getAssetUrl('icons/arrow_right.svg')}
              alt=""
            />
          </span>
          <NavLink to={`/${category}`} className={styles.breadcrumbs__active}>
            {category}
          </NavLink>
        </>
      )}
      {name && (
        <>
          <span className={styles.breadcrumbs__arrow}>
            <img
              className={styles.breadcrumbs__img}
              src={getAssetUrl('icons/arrow_right.svg')}
              alt=""
            />
          </span>
          <span className={styles.breadcrumbs__text}>{name}</span>
        </>
      )}
    </div>
  );
};
