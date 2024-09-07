import { FC } from 'react';

import styles from './Header.module.scss';

import { Menu } from './menu/Menu';
<<<<<<< HEAD

import { Favorite } from '@components/favorite/Favorite';
import { CartIcon } from '@components/cart/cart-icon/CartIcon';
=======
import { Favorite } from 'components/favorite/Favorite';
import { CartIcon } from 'components/cart/cart-icon/CartIcon';
>>>>>>> 3d29229bf5a890910a3e7c1d3c6b79a9929789c2

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
