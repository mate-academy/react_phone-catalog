import React from 'react';

import styles from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../ui/ArrowRightIcon';
import { HomeIcon } from '../ui/HomeIcon';

interface BreadcrumbsProps {
  category: string | undefined;
  productName: string | undefined;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  category,
  productName,
}) => {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.nav__link}>
        <HomeIcon />
      </Link>
      <span className={styles.nav__separator}>
        <ArrowRightIcon />
      </span>
      <Link to={`/${category}`} className={styles.nav__link}>
        {category}
      </Link>
      <span className={styles.nav__separator}>
        <ArrowRightIcon />
      </span>
      <span className={styles.nav__linkActive}>{productName}</span>
    </nav>
  );
};
