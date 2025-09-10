import React, { useMemo } from 'react';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../../constants/navLinks';
import { Icon } from '../Icon/Icon';
import { icons } from '../../constants/icons';
import classNames from 'classnames';
import { BurgerMenu } from './BurgerMenu/BurgerMenu';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavouritesContext';

export const Header = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();

  const totalQuantityCart = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const getActiveItem = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__item, {
      [styles['header__item--active']]: isActive,
    });

  const getActiveIcon = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__icon, {
      [styles['header__icon--active']]: isActive,
    });

  return (
    <div className={styles.header}>
      <Link to="/" className={styles['header__logo-container']}>
        <Icon icon={icons.logo} className={styles.header__logo} />
      </Link>

      <div className={styles.header__menu}>
        <nav className={styles.header__list}>
          {navLinks.map(link => (
            <NavLink to={link.path} key={link.title} className={getActiveItem}>
              {link.title}
            </NavLink>
          ))}
        </nav>
        <BurgerMenu />
      </div>

      <div className={styles['header__buttons-right']}>
        <NavLink to="/favorites" className={getActiveIcon}>
          <div className={styles['header__icon-wrapper']}>
            <Icon icon={icons.favorites} />

            {favorites.length > 0 && (
              <span className={styles.header__quantity}>
                {favorites.length}
              </span>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className={getActiveIcon}>
          <div className={styles['header__icon-wrapper']}>
            <Icon icon={icons.shopping_cart} />

            {totalQuantityCart > 0 && (
              <span className={styles.header__quantity}>
                {totalQuantityCart}
              </span>
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
