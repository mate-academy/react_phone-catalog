// import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';
import bag from '../../../public/img/Icons/bag-Icon.svg';
import favorite from '../../../public/img/Icons/favoriteIcon.svg';
import figmaLogo from '../../../public/img/Icons/Logo.svg';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          <img src={figmaLogo} alt="NiceGadgets logo" />
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/" end className={getLinkClass}>
            HOME
          </NavLink>

          <NavLink to="/phones" className={getLinkClass}>
            PHONES
          </NavLink>

          <NavLink to="/tablets" className={getLinkClass}>
            TABLETS
          </NavLink>

          <NavLink to="/accessories" className={getLinkClass}>
            ACCESSORIES
          </NavLink>
        </nav>
      </div>

      <div className={styles.icons}>
        <Link to="/favorites">
          <img src={favorite} alt="favorites" />
        </Link>
        <Link to="/cart">
          <img src={bag} alt="cart" />
        </Link>
      </div>
    </header>
  );
};
