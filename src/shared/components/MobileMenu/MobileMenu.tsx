import classNames from 'classnames';

import React from 'react';
import styles from './MobileMenu.module.scss';
import { Nav } from '@shared/components/Nav';
import { HeaderAction } from '@shared/components/Header/HeaderAction';
import FavouriteIcon from '@public/img/icons-nav/favourite.svg?react';
import CartIcon from '@public/img/icons-nav/shopping-cart.svg?react';

type Props = {
  isOpen: boolean;
};

export const MobileMenu: React.FC<Props> = ({ isOpen }) => {
  return (
    <div
      className={classNames(styles.mobileMenu, {
        [styles.mobileMenuOpen]: isOpen,
      })}
    >
      <Nav isMobile />

      <div className={styles.mobileMenuFooter}>
        <HeaderAction isMobile to="/Favourites" Icon={FavouriteIcon} />

        <HeaderAction isMobile to="/cart" Icon={CartIcon} />
      </div>
    </div>
  );
};
