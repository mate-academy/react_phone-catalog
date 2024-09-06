import { FC } from 'react';

import styles from './Header.module.scss';

import { Menu } from './menu/Menu';
import { Favorite } from 'components/favorite/Favorite';
import { CartIcon } from 'components/cart/cart-icon/CartIcon';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Menu />
      </nav>
      <div className={styles.wrapper}>
        <Favorite />
        <CartIcon />
      </div>
    </header>
  );
};
