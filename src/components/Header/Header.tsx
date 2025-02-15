import React, { useState } from 'react';
import styles from './Header.module.scss';
import { Menu } from '../Menu/Menu';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const Header = ({ headerRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const allProducts = useSelector((state: RootState) => state.favorites.items);
  const favoriteCount = allProducts.length;
  const cartProducts = useSelector((state: RootState) => state.cart.items);

  return (
    <>
      <header className={styles.header} id={'header'} ref={headerRef}>
        <NavLink to="/" className={styles.logo}></NavLink>

        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles['nav__item']}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames(styles.nav__link, {
                    [styles['nav__link--active']]: isActive,
                  })
                }
              >
                Home
              </NavLink>
            </li>
            <li className={styles['nav__item']}>
              <NavLink
                to="/catalog/phones"
                className={({ isActive }) =>
                  classNames(styles.nav__link, {
                    [styles['nav__link--active']]: isActive,
                  })
                }
              >
                Phones
              </NavLink>
            </li>
            <li className={styles['nav__item']}>
              <NavLink
                to="/catalog/tablets"
                className={({ isActive }) =>
                  classNames(styles.nav__link, {
                    [styles['nav__link--active']]: isActive,
                  })
                }
              >
                Tablets
              </NavLink>
            </li>
            <li className={styles['nav__item']}>
              <NavLink
                to="/catalog/accessories"
                className={({ isActive }) =>
                  classNames(styles.nav__link, {
                    [styles['nav__link--active']]: isActive,
                  })
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.search}>
            <input type="text" placeholder="Search" />
          </div>
          <NavLink
            to={'/favorites'}
            className={({ isActive }) =>
              classNames(styles.icon, { [styles['icon--is-active']]: isActive })
            }
          >
            <img
              src="Images/Favorites-icon.svg"
              alt="Favorites"
              className={styles['cover-image']}
            />
            {favoriteCount > 0 && (
              <span className={styles.badge}>{favoriteCount}</span>
            )}
          </NavLink>
          <NavLink
            to={'/cart'}
            className={({ isActive }) =>
              classNames(styles.icon, { [styles['icon--is-active']]: isActive })
            }
          >
            <img
              src="Images/Store-icon.svg"
              alt="Cart"
              className={styles['cover-image']}
            />
            {cartProducts.length > 0 && (
              <span className={styles.badge}>{cartProducts.length}</span>
            )}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(styles.icon, styles['menu-icon'], { [styles['icon--is-active']]: isActive })
            }
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img
              src="Images/Menu.svg"
              alt="Menu"
              className={styles['cover-image']}
            />
          </NavLink>
        </div>
      </header>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
