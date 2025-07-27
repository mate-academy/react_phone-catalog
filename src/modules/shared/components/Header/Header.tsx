import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useCart } from '../../../CartPage/context/CartContext';
// eslint-disable-next-line max-len
import { useFavourite } from '../../../FavouritesPage/context/FavouritesContext';

cn.bind(styles);

export const Header = () => {
  const [menuActive, setMenuActive] = useState(true);
  const location = useLocation();
  const { cartItems } = useCart();
  const { favouriteItems } = useFavourite();

  const totalItemsCount = () => {
    const itemArr: number[] = [];

    cartItems.map(item => itemArr.push(item.quantity));

    return itemArr.reduce((acc, curr) => acc + curr, 0);
  };

  const favCount = favouriteItems.length;

  useEffect(() => {
    setMenuActive(true);
  }, [location.pathname]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__links}>
          <Link to="/">
            <img className={styles.header__logo} src="./icons/Logo.svg" />
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
              src="./icons/Favourite.svg"
              alt="favourite-image"
            />
            <span className={styles['header__fav-counter']}>{favCount}</span>
          </Link>
          <Link className={styles.header__cart} to="/cart">
            <img
              className={styles['header__cart-image']}
              src="./icons/Cart.svg"
              alt="cart-image"
            />
            <span className={styles['header__cart-counter']}>
              {totalItemsCount()}
            </span>
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
            src="./icons/Menu.svg"
            alt="menu button"
          />
        </Link>
      </div>
    </>
  );
};
