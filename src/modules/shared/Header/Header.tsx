import styles from './Header.module.scss';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import Logo from '../../../img/Logo.png';
import IconHeart from '../../../img/icons/icon-heart.png';
import IconCart from '../../../img/icons/icon-shopping-cart.png';
import IconMenu from '../../../img/icons/icon-menu.png';
import IconClose from '../../../img/icons/icon-close.png';
import { GlobalContext } from '../../../store/GlobalContext';
import { BurgerMenu } from '../BurgerMenu';

const navLink = [
  { to: '/', tab: 'Home' },
  { to: '/phones', tab: 'Phones' },
  { to: '/tablets', tab: 'Tablets' },
  { to: '/accessories', tab: 'Accessories' },
];

export const Header = () => {
  const getLinkActive = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.navbar__link, {
      [styles.activeHeaderLink]: isActive,
    });
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isMenuClose, setIsMenuClose, MOBILE_MAX_WIDTH } =
    useContext(GlobalContext);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > MOBILE_MAX_WIDTH) {
        setIsMenuClose(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const params = useParams();

  return (
    <>
      <header id="header" className={styles.header}>
        <div className={styles.header__container}>
          <nav className={styles.navbar}>
            <Link to="/" className={styles.navbar__logo}>
              <img src={Logo} alt="Logo" />
            </Link>
            <ul className={styles.navbar__list}>
              {navLink.map(({ to, tab }) => (
                <li key={to} className={styles.navbar__item}>
                  <NavLink to={to} className={getLinkActive}>
                    {tab}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.header__icons}>
            <Link
              className={`${styles.header__icon} ${styles.header__icon_heart}`}
              to="/"
            >
              <img src={IconHeart} alt="Icon-heart" />
            </Link>
            <Link
              className={`${styles.header__icon} ${styles.header__icon_cart}`}
              to="/"
            >
              <img src={IconCart} alt="Icon-cart" />
            </Link>
            <Link
              className={classNames(styles.header__icon, {
                [styles.header__icon_menu]: true,
              })}
              to={params}
              onClick={() => setIsMenuClose(!isMenuClose)}
            >
              <img src={isMenuClose ? IconMenu : IconClose} alt="Icon-cart" />
            </Link>
          </div>
        </div>
      </header>

      {!isMenuClose && <BurgerMenu />}
    </>
  );
};
