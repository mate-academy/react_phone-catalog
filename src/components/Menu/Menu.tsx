/* eslint-disable react/react-in-jsx-scope */
import styles from './Menu.module.scss';

import { Navbar } from '../Navbar';
import { Favourites } from '../Favourites';
import { ShoppingCart } from '../ShoppingCart';

export const Menu = () => {
  return (
    <nav className={styles.menu}>
      <div className={styles.menu__container}>
        <div className={styles.menu__top}>
          <Navbar className={styles.menu__navbar} />
        </div>

        <div className={styles.menu__bottom}>
          <Favourites className={styles.menu__favourites} />
          <ShoppingCart className={styles.menu__cart} />
        </div>
      </div>
    </nav>
  );
};
