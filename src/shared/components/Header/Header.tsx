// #regionImport
import React from 'react';
import styles from './Header.module.scss';

import { Link } from 'react-router-dom';
import { Nav } from '../Nav';
import { HeaderAction } from './HeaderAction';
import { useFavourites } from '@shared/context/FavouritesContext';
import { useCart } from '@shared/context/CartContext';

import Logo from '@public/img/logo/logo.svg?react';
import IconBurgerMenu from '@public/img/icons/burger-menu.svg?react';
import IconMenuClose from '@public/img/icons/menu-close.svg?react';
import FavouriteIcon from '@public/img/icons-nav/favourite.svg?react';
import CartIcon from '@public/img/icons-nav/shopping-cart.svg?react';

import { LanguageSwitcher } from '@shared/ui/LanguageSwitcher';
import { ThemeSwitcher } from '@shared/ui/ThemeSwitcher';
// #endregion
type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { items: favourites } = useFavourites();
  const { items: cart } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLeftSide}>
          <Link to="/" className={styles.headerLogoLink}>
            <Logo className={styles.headerLogo} />
          </Link>

          <Nav />
        </div>

        <div className={styles.headerRightSide}>
          <div className={styles.headerSwitcher}>
            <LanguageSwitcher />

            <ThemeSwitcher />
          </div>

          <button
            className={styles.headerBurgerMenuButton}
            onClick={() => setIsMenuOpen(current => !current)}
          >
            {isMenuOpen ? (
              <IconMenuClose className={styles.headerBurgerMenu} />
            ) : (
              <IconBurgerMenu className={styles.headerBurgerMenu} />
            )}
          </button>

          <HeaderAction
            to="/favourites"
            Icon={FavouriteIcon}
            count={favourites.length}
          />
          <HeaderAction to="/cart" Icon={CartIcon} count={cart.length} />
        </div>
      </div>
    </header>
  );
};
