import React from 'react';

import { Nav } from '../Nav';
import { CartIcon } from '../ui/CartIcon';
import { Favourite } from '../ui/Favourite';
import styles from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  onClose: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClose }) => {
  return (
    <div className={styles.burger}>
      <div className={styles.burger__content}>
        <Nav
          className={styles.burger__nav}
          listClassName={styles.burger__list}
          linkClassName={styles.burger__link}
          onClick={onClose}
        />
      </div>
      <div className={styles.burger__footer}>
        <Favourite className={styles.burger__action} />
        <CartIcon className={styles.burger__action} />
      </div>
    </div>
  );
};
