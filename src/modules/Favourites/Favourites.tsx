import { NavLink } from 'react-router-dom';

import styles from './Favoutires.module.scss';
import { FavoutiresCatalog } from './FavoutiresCatalog';

export const Favourites = () => {
  return (
    <div className={styles.category_page}>
      <div className={styles.category_page__navigation}>
        <NavLink to={'/'} className={styles.category_page__navigation__home} />
        <div className={styles.category_page__navigation__arrow}></div>
        <p className={styles.category_page__navigation__text__active}>
          Favourites
        </p>
      </div>
      <FavoutiresCatalog />
    </div>
  );
};
