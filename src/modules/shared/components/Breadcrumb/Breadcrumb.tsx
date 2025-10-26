/* eslint-disable max-len */
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Breadcrumb.module.scss';

export const Breadcrumb = () => {
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean);

  return (
    <nav className={styles.navigation__list}>
      <NavLink to={{ pathname: '/' }} className={styles.navigation__link__home}>
        <div className={styles.navigation__icon__home}></div>
      </NavLink>
      {path.map((pa: string, i: number) => {
        if (i === path.length - 1) {
          return (
            <div key={i} className={styles.navigation__link__container}>
              <span className={styles.navigation__icon__arrow}></span>
              <div className={styles.navigation__disable}>{pa}</div>
            </div>
          );
        } else {
          return (
            <div key={i} className={styles.navigation__link__container}>
              <span className={styles.navigation__icon__arrow}></span>
              <NavLink to={{ pathname: `/${pa}` }} className={styles.navigation__link}>
                {pa}
              </NavLink>
            </div>
          );
        }
      })}
    </nav>
  );
};
