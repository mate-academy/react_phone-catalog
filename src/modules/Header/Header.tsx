import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SideBar } from '../../modules/components/SideBar';
import styles from './Header.module.scss';
import burger from '../../images/icons/Burger.png';
import close from '../../images/icons/Close.png';
import Logo from '../../images/icons/Logo.png';
import { Navigation } from './Navigation';
import { Action } from './Actions/Action';

export const Header = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setBurgerOpen(!burgerOpen);
  };

  useEffect(() => {
    setBurgerOpen(false);
  }, [location]);

  const links = [
    { title: 'Home', path: '/' },
    { title: 'Phones', path: '/phones' },
    { title: 'Tablets', path: '/tablets' },
    { title: 'Accessories', path: '/accessories' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapp}>
        <Link className={styles.header__link} to={'/'}>
          <img src={Logo} alt="Logo" className={styles.header__logo} />
        </Link>
        <div className={styles.header__burger}>
          <img
            src={burgerOpen ? close : burger}
            className={styles.header__icon}
            onClick={toggleMenu}
          />
        </div>
        <div className={styles.header__navbar}>
          <Navigation links={links} />
          <Action />
        </div>
      </div>

      {burgerOpen && <SideBar links={links} burgerOpen={burgerOpen} />}
    </header>
  );
};
