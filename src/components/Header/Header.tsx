import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import logo from '../../assets/icons/logo.png';
import stylesButton from '../../styles/buttons.module.scss';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { Navigation } from '../Navigation';
import { CartContext, FavouriteContext } from '../../ContextProvider';

interface Props {
  isMobileMenuOpen: boolean;
  handleMobileMenu: (open: boolean) => void;
}

export const Header: React.FC<Props> = ({
  isMobileMenuOpen,
  handleMobileMenu,
}) => {
  const handleMenu = () => {
    handleMobileMenu(!isMobileMenuOpen);
  };

  const { cartProducts } = useContext(CartContext);
  const { favouriteProducts } = useContext(FavouriteContext);

  return (
    <div className={styles.topBar}>
      <Link to="/" className={styles.topBarLogo}>
        <img src={logo} alt="Nice gadgets logo" />
      </Link>
      <button
        className={classNames(stylesButton.buttonMenu, styles.buttonMenu, {
          [stylesButton.buttonClose]: isMobileMenuOpen,
        })}
        onClick={handleMenu}
      ></button>

      <div className={styles.navContainer}>
        <Navigation />
      </div>

      <div className={styles.buttonsContainer}>
        <Link
          to="/fovourites"
          className={classNames(stylesButton.buttonFavourite, styles.button)}
          aria-label="My favourite products"
        >
          {!!favouriteProducts.length && (
            <span
              className={classNames({
                [styles.buttonFavouriteWrapper]: true,
              })}
            >
              {favouriteProducts.length}
            </span>
          )}
        </Link>

        <Link
          to="/cart"
          className={classNames(stylesButton.buttonCart, styles.button)}
          aria-label="Products added to cart"
        >
          {!!cartProducts.length && (
            <span
              className={classNames({
                [styles.buttonCartWrapper]: true,
              })}
            >
              {cartProducts.length}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};
