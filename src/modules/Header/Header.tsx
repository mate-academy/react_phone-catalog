import React, { useContext, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Logo from '../shared/components/Logo';
import Menu from '../Menu';
import { StateContext } from '../../context/context';
import IconNumber from '../shared/icons/IconNumber';
import classNames from 'classnames';

const Header: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [menuActive, setMenuActive] = useState(false);
  const { favorites, cart } = useContext(StateContext);
  const numberOfCartProducts = cart.reduce(
    (sum, item) => item.quantity + sum,
    0,
  );
  const pages = ['Home', 'Phones', 'Tablets', 'Accessories'];
  const location = useLocation();
  const [type = ''] = location.pathname.split('/').filter(item => item !== '');

  function handleMenuOpen() {
    setMenuActive(true);
  }

  useEffect(() => {
    setMenuActive(false);
  }, [location]);

  return (
    <header className={styles.header}>
      {!isMobile ? (
        <>
          <Logo />
          <ul className={styles.nav}>
            {pages.map((page, i) => {
              const path = page === 'Home' ? '' : page.toLowerCase();

              return (
                <li key={i}>
                  <Link
                    to={`/${path}`}
                    className={classNames(styles.nav__link, 'uppercase', {
                      [styles['nav__link--active']]: type === path,
                    })}
                  >
                    {page}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={styles.icons}>
            <Link
              to="/favorites"
              className={classNames(styles.icons__icon, {
                [styles['icons__icon--active']]: type === 'favorites',
              })}
            >
              <img src="img/icons/heart.svg" alt="Heart Icon" />
              {favorites.length > 0 && <IconNumber items={favorites.length} />}
            </Link>
            <Link
              to="/cart"
              className={classNames(styles.icons__icon, {
                [styles['icons__icon--active']]: type === 'cart',
              })}
            >
              <img src="img/icons/bag.svg" alt="Bag Icon" />
              {cart.length > 0 && <IconNumber items={numberOfCartProducts} />}
            </Link>
          </div>
        </>
      ) : (
        <>
          {menuActive ? (
            <Menu type={type} setMenuActive={setMenuActive} />
          ) : (
            <>
              <Logo />
              <div className={styles.icons__icon} onClick={handleMenuOpen}>
                <img src="img/icons/BurgerMenu.svg" alt="Burger Icon" />
              </div>
            </>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
