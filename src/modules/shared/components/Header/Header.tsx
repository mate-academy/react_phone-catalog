import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import cn from 'classnames';
import { useState } from 'react';

cn.bind(styles);

export const Header = () => {
  const [menuActive, setMenuActive] = useState(true);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__links}>
          <Link to="/">
            <img className={styles.header__logo} src="public/icons/Logo.svg" />
          </Link>
          <ul
            className={cn(styles.header__nav, {
              [styles['header__nav-active']]: menuActive,
            })}
          >
            <li className={styles.header__list}>
              <Link className={styles['header__list-link']} to="/">
                Home
              </Link>
            </li>
            <li className={styles.header__list}>
              <Link className={styles['header__list-link']} to="/phones">
                Phones
              </Link>
            </li>
            <li className={styles.header__list}>
              <Link className={styles['header__list-link']} to="/tablets">
                Tablets
              </Link>
            </li>
            <li className={styles.header__list}>
              <Link className={styles['header__list-link']} to="/accessories">
                Accesories
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={cn(styles.header__burger, {
            [styles['header__burger-active']]: menuActive,
          })}
        >
          <Link className={styles.header__fav} to="/favourites">
            <img
              className={styles['header__fav-image']}
              src="/icons/Favourite.svg"
              alt="favourite-image"
            />
          </Link>
          <Link className={styles.header__cart} to="/cart">
            <img
              className={styles['header__cart-image']}
              src="/icons/Cart.svg"
              alt="cart-image"
            />
          </Link>
        </div>
        <Link
          onClick={() => {
            setMenuActive(!menuActive);
          }}
          className={cn(styles.header__button, {
            [styles['header__button-active']]: menuActive,
          })}
          to="#"
        >
          <img
            className={styles['header__button-image']}
            src="public/icons/Menu.svg"
            alt="menu button"
          />
        </Link>
      </div>
    </>
  );
};
