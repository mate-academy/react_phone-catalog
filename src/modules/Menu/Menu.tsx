import React, { useContext } from 'react';
import Logo from '../shared/components/Logo';
import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';
import IconNumber from '../shared/icons/IconNumber';
import { StateContext } from '../../context/context';
import classNames from 'classnames';

type Props = {
  setMenuActive: (value: boolean) => void;
  type: string;
};

export const Menu: React.FC<Props> = ({ setMenuActive, type }) => {
  const { favorites, cart } = useContext(StateContext);
  const pages = ['Home', 'Phones', 'Tablets', 'Accessories'];
  const numberOfCartProducts = cart.reduce(
    (sum, item) => item.quantity + sum,
    0,
  );

  function handleMenuClose() {
    setMenuActive(false);
  }

  return (
    <aside className={styles.menu}>
      <div className={styles.menu__top}>
        <Logo />
        <div className={styles['menu__top--close']}>
          <img
            src="public/img/icons/Close.svg"
            alt="Close Icon"
            onClick={handleMenuClose}
          />
        </div>
      </div>
      <ul className={styles.menu__nav}>
        {pages.map((page, i) => {
          const path = page === 'Home' ? '' : page.toLowerCase();

          return (
            <li key={i}>
              <Link
                to={`/${path}`}
                className={classNames(styles.menu__link, 'uppercase', {
                  [styles['menu__link--active']]: type === path,
                })}
                onClick={handleMenuClose}
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
          onClick={handleMenuClose}
        >
          <img src="public/img/icons/heart.svg" alt="Heart Icon" />
          {favorites.length > 0 && <IconNumber items={favorites.length} />}
        </Link>
        <Link
          to="/cart"
          className={classNames(styles.icons__icon, {
            [styles['icons__icon--active']]: type === 'cart',
          })}
          onClick={handleMenuClose}
        >
          <img src="public/img/icons/bag.svg" alt="Bag Icon" />
          {cart.length > 0 && <IconNumber items={numberOfCartProducts} />}
        </Link>
      </div>
    </aside>
  );
};

export default Menu;
