import { NavLink } from 'react-router-dom';

import styles from './SideMenu.module.scss';

import FavoriteIcon from '../../../assets/icons/header-icons/favorites-icon.svg';
import CartIcon from '../../../assets/icons/header-icons/cart-icon.svg';
import { getClassName } from '../../utils/classNameActive';
import { CartStateContext } from '../../store/CartProvider';
import { FavoritesStateContext } from '../../store/FavoritesProvider';
import { useContext } from 'react';

type Props = {
  isOpenSide: boolean;
  setIsOpenSide: React.Dispatch<React.SetStateAction<boolean>>;
};
export const SideMenu: React.FC<Props> = ({ isOpenSide, setIsOpenSide }) => {
  const favoritesProduct = useContext(FavoritesStateContext);
  const cartsProduct = useContext(CartStateContext);

  const tottalCartItems =
    Array.isArray(cartsProduct) &&
    cartsProduct.length > 0 &&
    cartsProduct.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <aside
      className={getClassName({
        isActive: isOpenSide,
        baseClass: styles.menu,
        activeClass: styles.menu__open,
      })}
    >
      <nav className={styles.menu__nav}>
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                getClassName({
                  isActive,
                  baseClass: styles.menu__link,
                  activeClass: styles.menu__linkActive,
                })
              }
              onClick={() => setIsOpenSide(false)}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.menu__item}>
            <NavLink
              to="phones"
              className={({ isActive }) =>
                getClassName({
                  isActive,
                  baseClass: styles.menu__link,
                  activeClass: styles.menu__linkActive,
                })
              }
              onClick={() => setIsOpenSide(false)}
            >
              Phones
            </NavLink>
          </li>
          <li className={styles.menu__item}>
            <NavLink
              to="tablets"
              className={({ isActive }) =>
                getClassName({
                  isActive,
                  baseClass: styles.menu__link,
                  activeClass: styles.menu__linkActive,
                })
              }
              onClick={() => setIsOpenSide(false)}
            >
              Tablets
            </NavLink>
          </li>
          <li className={styles.menu__item}>
            <NavLink
              to="accessories"
              className={({ isActive }) =>
              getClassName({
                isActive,
                baseClass: styles.menu__link,
                activeClass: styles.menu__linkActive,
              })
            }
              onClick={() => setIsOpenSide(false)}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.menu__icons}>
        <NavLink
          to="favorites"
          className={styles.menu__favoritesLink}
          onClick={() => setIsOpenSide(false)}
        >
          <img
            src={FavoriteIcon}
            alt="Відкрити улюблені товари"
            className={styles.menu__favoritesImg}
          />
         {favoritesProduct.length > 0 && (
              <span className={styles.menu__cart_favorite_number}>
                {favoritesProduct.length}
              </span>
            )}
        </NavLink>
        <NavLink
          to="cart"
          className={styles.menu__cartLink}
          onClick={() => setIsOpenSide(false)}
        >
          <img
            src={CartIcon}
            alt="Відкрити корзину з товарами"
            className={styles.header__cartImg}
          />
         {tottalCartItems && (
              <span className={styles.menu__cart_favorite_number}>
                {tottalCartItems}
              </span>
            )}
        </NavLink>
      </div>
    </aside>
  );
};
