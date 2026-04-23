import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Categories } from '../../types/product';
import styles from './Header.module.scss';
import { useCart, useFavorites } from '../../ItemsProvider';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { cartItems } = useCart();
  const { favoritesItems } = useFavorites();

  const cartItemsCount = () => {
    let count = 0;

    cartItems.forEach(item => (count += item.quantity));

    return count;
  };

  const navLinks = [
    { to: '/', name: 'home' },
    { to: `/${Categories.Phones}`, name: 'phones' },
    { to: `/${Categories.Tablets}`, name: 'tablets' },
    { to: `/${Categories.Accessories}`, name: 'accessories' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <Link to="/" className={styles.logo}>
          <div
            className={classNames(
              styles.logo__icon,
              styles['logo__icon--header'],
            )}
          />
        </Link>

        <nav className={styles.menu}>
          <ul className={styles.menu__list}>
            {navLinks.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    classNames(styles.menu__item, { [styles.active]: isActive })
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ul className={styles.buttons}>
        <li
          className={classNames(styles.buttons__item, styles['hide-on-mobile'])}
        >
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.buttons__link, { [styles.active]: isActive })
            }
          >
            <div
              className={classNames(
                styles.buttons__icon,
                styles['buttons__icon--fav'],
              )}
            >
              {favoritesItems.length > 0 && (
                <div className={classNames(styles.counter)}>
                  {favoritesItems.length}
                </div>
              )}
            </div>
          </NavLink>
        </li>
        <li
          className={classNames(styles.buttons__item, styles['hide-on-mobile'])}
        >
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.buttons__link, { [styles.active]: isActive })
            }
          >
            <div
              className={classNames(
                styles.buttons__icon,
                styles['buttons__icon--cart'],
              )}
            >
              {cartItems.length > 0 && (
                <div className={classNames(styles.counter)}>
                  {cartItemsCount()}
                </div>
              )}
            </div>
          </NavLink>
        </li>
        <li className={classNames(styles.buttons__item, styles['burger-btn'])}>
          <button onClick={toggleMenu} className={styles['burger-btn__icon']} />
        </li>
      </ul>

      <div
        className={classNames(styles['burger-menu'], {
          [styles.active]: isMenuOpen,
        })}
      >
        <div className={styles['burger-menu__header']}>
          <Link
            to="/"
            onClick={toggleMenu}
            className={classNames(
              styles.logo__icon,
              styles['logo__icon--header'],
            )}
          />
          <button
            onClick={toggleMenu}
            className={styles['burger-menu__close']}
          />
        </div>

        <nav className={styles['burger-menu__nav']}>
          <ul className={styles['burger-menu__list']}>
            {navLinks.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    classNames(styles['burger-menu__item'], {
                      [styles.active]: isActive,
                    })
                  }
                  onClick={toggleMenu}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={styles['burger-menu__footer']}>
          <li className={styles['burger-menu__footer-item']}>
            <NavLink
              to="/favorites"
              onClick={toggleMenu}
              className={({ isActive }) =>
                classNames(styles['burger-menu__footer-link'], {
                  [styles.active]: isActive,
                })
              }
            >
              <div
                className={classNames(
                  styles.buttons__icon,
                  styles['buttons__icon--fav'],
                )}
              >
                {favoritesItems.length > 0 && (
                  <div className={classNames(styles.counter)}>
                    {favoritesItems.length}
                  </div>
                )}
              </div>
            </NavLink>
          </li>
          <li className={styles['burger-menu__footer-item']}>
            <NavLink
              to="/cart"
              onClick={toggleMenu}
              className={({ isActive }) =>
                classNames(styles['burger-menu__footer-link'], {
                  [styles.active]: isActive,
                })
              }
            >
              <div
                className={classNames(
                  styles.buttons__icon,
                  styles['buttons__icon--cart'],
                )}
              >
                {cartItems.length > 0 && (
                  <div className={classNames(styles.counter)}>
                    {cartItemsCount()}
                  </div>
                )}
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};
