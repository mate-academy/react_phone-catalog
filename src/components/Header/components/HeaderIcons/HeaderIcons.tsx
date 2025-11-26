import React, { useContext } from 'react';
import classNames from 'classnames';

import styles from './HeaderIcons.module.scss';

import favIcon from '../../../../icons/Favourites.png';
import cartIcon from '../../../../icons/Shopping-bag.png';
import menuIcon from '../../../../icons/Menu.png';
import closeIcon from '../../../../icons/Close.png';

import { FavoritesContext } from '../../../../providers/FavoritesProvider';
import { CartContext } from '../../../../providers/CartProvider';
import { HeaderIconItem } from '../HeaderIconItem/HeaderIconItem';

type Props = {
  toggleBurger: () => void;
  isBurgerOpen: boolean;
};

export const HeaderIcons: React.FC<Props> = ({
  toggleBurger,
  isBurgerOpen,
}) => {
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className={styles.icons}>
      <HeaderIconItem
        to="/favorite"
        img={favIcon}
        count={favorites.length}
        className={classNames(
          styles.icons__icon,
          styles['icons__icon--type-like'],
        )}
        activeClass={styles['icons__icon--active']}
        countClass={styles.icons__count}
      />

      <HeaderIconItem
        to="/cart"
        img={cartIcon}
        count={cart.length}
        className={classNames(
          styles.icons__icon,
          styles['icons__icon--type-cart'],
        )}
        activeClass={styles['icons__icon--active']}
        countClass={styles.icons__count}
      />

      <button
        className={classNames(
          styles.icons__icon,
          styles['icons__icon--type-menu'],
        )}
        onClick={toggleBurger}
      >
        <img src={isBurgerOpen ? closeIcon : menuIcon} alt="Menu" />
      </button>
    </div>
  );
};
