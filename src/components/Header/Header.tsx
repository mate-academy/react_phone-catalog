import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import logo from '../../assets/icons/logo.png';
import stylesButton from '../../styles/buttons.module.scss';
import React from 'react';
import classNames from 'classnames';
import { Navigation } from '../Navigation';

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
        ></Link>
        <Link
          to="/cart"
          className={classNames(stylesButton.buttonCart, styles.button)}
        ></Link>
      </div>
    </div>
  );
};
