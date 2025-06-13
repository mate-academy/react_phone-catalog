import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { Arrow } from './components/Arrow';
import { themeIconHome } from '../../../utils/iconsTheme';
import { useAppContext } from '../../../hooks/useAppContext';

type BreadcrumbsProps = {
  category: string;
  name?: string;
};

export const Breadcrumbs = ({ category, name }: BreadcrumbsProps) => {
  const { state } = useAppContext();

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/">
        <img
          className={styles.breadcrumbs__img}
          src={themeIconHome(state.theme)}
          alt="return to home"
        />
      </Link>
      {category && !name && (
        <>
          <Arrow />
          <span className={styles.breadcrumbs__inactive}>{category}</span>
        </>
      )}
      {category && name && (
        <>
          <Arrow />
          <NavLink to={`/${category}`} className={styles.breadcrumbs__active}>
            {category}
          </NavLink>
          <Arrow />
          <span className={styles.breadcrumbs__text}>{name}</span>
        </>
      )}
    </div>
  );
};
