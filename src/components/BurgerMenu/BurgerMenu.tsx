import React from 'react';

import { Nav } from '../Nav';
import { CartIcon } from '../ui/CartIcon';
import { FavouriteIcon } from '../ui/FavouriteIcon';
import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import { PathType } from '../../types/Types';

interface BurgerMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClose, isOpen }) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    [styles.burger__action, isActive ? 'active' : ''].filter(Boolean).join(' ');

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
          className={getLinkClass}
          onClick={onClose}
        >
          <FavouriteIcon className={styles.icon} />
        </NavLink>
        <NavLink to={PathType.CART} className={getLinkClass} onClick={onClose}>
          <CartIcon className={styles.icon} />
        </NavLink>
      </div>
    </div>
  );
};
