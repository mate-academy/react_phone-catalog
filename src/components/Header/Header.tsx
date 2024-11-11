import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';

import styles from './Header.module.scss';
import logo from '../../assets/icons/logo.png';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { Navigation } from '../Navigation';
import { CartContext, FavouriteContext } from '../../ContextProvider';
import { BtnType } from '../../types/BtnType';

interface Props {
  isMobileMenuOpen: boolean;
  handleMobileMenu: (open: boolean) => void;
}

const activeLink = (isActive: boolean, btnType: BtnType) => {
  return classNames(styles.button, {
    buttonFavourite: btnType === BtnType.favorites,
    buttonCart: btnType === BtnType.cart,
    [styles.buttonActive]: isActive,
  });
};

export const Header: React.FC<Props> = ({
  isMobileMenuOpen,
  handleMobileMenu,
}) => {
  const handleMenu = () => {
    handleMobileMenu(!isMobileMenuOpen);
  };

  const { cartProducts } = useContext(CartContext);
  const { favouriteProducts } = useContext(FavouriteContext);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  return (
    <header className={styles.topBarContainer} id="header">
      <div className={styles.topBar} id="header">
        <Link
          to="/"
          className={styles.topBarLogo}
          onClick={() => handleMobileMenu(false)}
        >
          <img src={logo} alt="Nice gadgets logo" />
        </Link>
        <button
          className={classNames('buttonMenu', styles.buttonMenu, {
            buttonClose: isMobileMenuOpen,
          })}
          onClick={handleMenu}
        ></button>

        <div className={styles.navContainer}>
          <Navigation />
        </div>

        <div className={styles.buttonsContainer}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              activeLink(isActive, BtnType.favorites)
            }
            aria-label="My favourite products"
          >
            {!!favouriteProducts.length && (
              <span className="buttonFavouriteWrapper">
                {favouriteProducts.length}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            state={{ search: searchParams.toString(), pathname }}
            className={({ isActive }) => activeLink(isActive, BtnType.cart)}
            aria-label="Products added to cart"
          >
            {!!cartProducts.length && (
              <span className="buttonCartWrapper">{cartProducts.length}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
