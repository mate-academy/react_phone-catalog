import React from 'react';

import { Nav } from '../Nav';
import { CartIcon } from '../ui/CartIcon';
import { FavouriteIcon } from '../ui/FavouriteIcon';
import { NavLink } from 'react-router-dom';
import { PathType } from '../../types/Types';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';
import styles from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClose, isOpen }) => {
  const { favourites } = useFavourites();
  const { cartItems } = useCart();

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const favouritesCount = favourites.length;

  const getActiveLinkClass = ({ isActive }: { isActive: boolean }) =>
    [styles.burger__action, isActive ? styles.active : '']
      .filter(Boolean)
      .join(' ');

  return (
    <div
      className={[styles.burger, isOpen ? styles['burger--open'] : ''].join(
        ' ',
      )}
    >
      <div className={styles.burger__content}>
        <Nav
          className={styles.burger__nav}
          listClassName={styles.burger__list}
          linkClassName={styles.burger__link}
          onClick={onClose}
        />
      </div>
      <div className={styles.burger__footer}>
        <NavLink
          to={PathType.FAVOURITES}
          className={getActiveLinkClass}
          onClick={onClose}
        >
          <div className={styles.burger__iconContainer}>
            <FavouriteIcon className={styles.icon} />
            {favouritesCount > 0 && (
              <span className={styles.burger__counter}>{favouritesCount}</span>
            )}
          </div>
        </NavLink>
        <NavLink
          to={PathType.CART}
          className={getActiveLinkClass}
          onClick={onClose}
        >
          <div className={styles.burger__iconContainer}>
            <CartIcon className={styles.icon} />
            {cartItemsCount > 0 && (
              <span className={styles.burger__counter}>{cartItemsCount}</span>
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
