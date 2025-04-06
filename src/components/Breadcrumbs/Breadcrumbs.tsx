import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

import homeIcon from '../../imgs/svg/home-icon.svg';
import arrowRight from '../../imgs/svg/arrow-right-icon.svg';

interface BreadcrumbsProps {
  category: string;
  name: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category, name }) => (
  <div className={styles.breadcrumbs}>
    <NavLink className={styles.breadcrumbs__link} to="/">
      <img src={homeIcon} alt="Home" className={styles.breadcrumbs__icon} />
    </NavLink>
    <img
      src={arrowRight}
      alt="arrow-right"
      className={styles.breadcrumbs__icon}
    />
    <NavLink className={styles.breadcrumbs__link} to={`/${category}`}>
      <span className={styles.breadcrumbs__category}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    </NavLink>
    <img
      src={arrowRight}
      alt="arrow-right"
      className={styles.breadcrumbs__icon}
    />
    <span className={styles.breadcrumbs__name}>{name}</span>
  </div>
);
