import { NavLink, Link } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import cn from 'classnames';
import favourites from '../../Icons/Favourites(HeartLike).svg';
import cart from '../../Icons/Group17.svg';
import { useContext, useMemo } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { ItemsCounter } from '../ItemsCounter';
import { ThemeToggle } from '../ThemeToggle';

interface Props {
  isOpen: boolean;
  handleSetIsOpen: () => void;
}

export const BurgerMenu: React.FC<Props> = ({ isOpen, handleSetIsOpen }) => {
  const { favorites } = useContext(FavoritesContext);
  const { cartProducts } = useContext(CartContext);

  const cartCounter = useMemo(() => {
    return cartProducts.reduce((prev, product) => {
      return prev + product.quantity;
    }, 0);
  }, [cartProducts]);

  return (
    isOpen && (
      <aside className={styles.burger__aside}>
        <nav className={styles.burger__aside__nav}>
          <ul className={styles['nav__list--menu']}>
            <li className={styles['nav__list--menu-items']}>
              <NavLink
                className={({ isActive }) =>
                  cn(styles.nav__link, {
                    [styles['nav__link--active']]: isActive,
                  })
                }
                to="/"
                onClick={handleSetIsOpen}
              >
                HOME
              </NavLink>
            </li>
            <li className={styles['nav__list--menu-items']}>
              <NavLink
                className={({ isActive }) =>
                  cn(styles.nav__link, {
                    [styles['nav__link--active']]: isActive,
                  })
                }
                to="/phones"
                onClick={handleSetIsOpen}
              >
                PHONES
              </NavLink>
            </li>
            <li className={styles['nav__list--menu-items']}>
              <NavLink
                className={({ isActive }) =>
                  cn(styles.nav__link, {
                    [styles['nav__link--active']]: isActive,
                  })
                }
                to="/tablets"
                onClick={handleSetIsOpen}
              >
                TABLETS
              </NavLink>
            </li>
            <li className={styles['nav__list--menu-items']}>
              <NavLink
                className={({ isActive }) =>
                  cn(styles.nav__link, {
                    [styles['nav__link--active']]: isActive,
                  })
                }
                to="/accessories"
                onClick={handleSetIsOpen}
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
          <div className={styles.theme__row}>
            <ThemeToggle />
          </div>
          <div className={styles['nav__buttons--menu']}>
            <Link
              to="/favourites"
              className={styles.icon__link}
              onClick={handleSetIsOpen}
            >
              <div className={styles.img__wrapper}>
                <img
                  src={favourites}
                  alt="favourites"
                  className={styles.favorites}
                />
                {favorites.length >= 1 && (
                  <ItemsCounter quantity={favorites.length} />
                )}
              </div>
            </Link>
            <Link
              to="/cart"
              className={styles.icon__link}
              onClick={handleSetIsOpen}
            >
              <div className={styles.img__wrapper}>
                <img src={cart} alt="cart" className={styles.cart} />
                {cartProducts.length >= 1 && (
                  <ItemsCounter quantity={cartCounter} />
                )}
              </div>
            </Link>
          </div>
        </nav>
      </aside>
    )
  );
};
