import styles from '../Menu/menu.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useProductActions } from '../../context/ProductActionsContext';

export const Menu = () => {
  const location = useLocation();
  const { liked, cart } = useProductActions();

  const activePath = location.state?.from;
  const isActive = (path: string) => activePath === path;

  return (
    <div className={styles.menu}>
      <div className={styles.menu__items}>
        <NavLink
          to="/"
          className={`${styles.menu__item} ${
            isActive('/') ? styles.activeLink : ''
          }`}
        >
          Home
        </NavLink>
        <NavLink
          to="/phones"
          className={`${styles.menu__item} ${
            isActive('/phones') ? styles.activeLink : ''
          }`}
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={`${styles.menu__item} ${
            isActive('/tablets') ? styles.activeLink : ''
          }`}
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={`${styles.menu__item} ${
            isActive('/accessories') ? styles.activeLink : ''
          }`}
        >
          Accessories
        </NavLink>
      </div>

      <div className={styles.buttons}>
        <div className={styles.button}>
          <div
            className={`${styles.favorites} ${
              isActive('/favorites') ? styles.activeButton : ''
            }`}
          >
            <NavLink to="/favorites" className={styles.button__link}>
              <img
                className={styles.button__link__img}
                src={`${import.meta.env.BASE_URL}/img/icons/HeartLike.svg`}
                alt="icon heart like"
              />
              <img
                className={styles.button__link__imgDark}
                src={`${import.meta.env.BASE_URL}/img/icons-dark/Favourites.svg`}
                alt="icon heart like"
              />

              {liked.length > 0 && (
                <span className={styles.buttons__length}>{liked.length}</span>
              )}
            </NavLink>
          </div>
          <div
            className={`${styles.cart} ${
              isActive('/cart') ? styles.activeButton : ''
            }`}
          >
            <NavLink to="/cart" className={styles.button__link}>
              <img
                className={styles.button__link__img}
                src={`${import.meta.env.BASE_URL}/img/icons/ShoppingBag.svg`}
                alt="icon shopping bag"
              />
              <img
                className={styles.button__link__imgDark}
                src={`${import.meta.env.BASE_URL}/img/icons-dark/Shopping-bag.svg`}
                alt="icon heart like"
              />

              {cart.length > 0 && (
                <span className={styles.buttons__length}>{cart.length}</span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
