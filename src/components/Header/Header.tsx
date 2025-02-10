import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../media/img/Logo.svg';
import { CartAndFavouritesButtons } from '../CartAndFavouritesButtons';
import { Nav } from '../Nav';
import styles from './Header.module.scss';

interface Props {
  onMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<Props> = ({ onMenu }) => {
  const toggleMenu = () => {
    onMenu(prev => !prev);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <Link
            to="home"
            className={styles.header__link}
            onClick={() => onMenu(false)}
          >
            <img src={logo} alt="logo" className={styles.header__logo} />
          </Link>

          <Nav variant="header" />
        </div>

        <div className={styles.header__right}>
          <CartAndFavouritesButtons variant="header" />

          <Link
            to="#"
            className={styles.header__menu}
            onClick={toggleMenu}
          ></Link>
        </div>
      </div>
    </>
  );
};
