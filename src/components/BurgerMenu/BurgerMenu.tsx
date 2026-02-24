import React from 'react';

import { Nav } from '../Nav';
import { CartIcon } from '../ui/CartIcon';
import { FavouriteIcon } from '../ui/FavouriteIcon';
import styles from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClose, isOpen }) => {
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
        <FavouriteIcon className={styles.burger__action} />
        <CartIcon className={styles.burger__action} />
      </div>
    </div>
  );
};
