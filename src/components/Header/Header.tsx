import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { HeaderMobile } from '../HeaderMobile/HeaderMobile';
import { useFavorites } from '../../context/Favoritescontext/Favoritescontext';
import { useCart } from '../../context/CartContext/CartContext';

export const Header = () => {
  const { favoriteIds } = useFavorites();
  const { totalCount } = useCart();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <NavLink to="/">
            <img src={`./img/icons/logo.svg`} alt="Logo" />
          </NavLink>
        </div>

        <nav className={styles.navigation}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to="/phones">Phones</NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to="/tablets">Tablets</NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to="/accessories">Accessories</NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.favLink} ${isActive ? styles.iconActive : ''}`
            }
          >
            <img src={`./img/icons/heart.svg`} alt="Favorites" />
            {favoriteIds.length > 0 && (
              <span className={styles.badge}>{favoriteIds.length}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles.favLink} ${isActive ? styles.iconActive : ''}`
            }
          >
            <img
              src={`./img/icons/bag.svg`}
              alt="Cart"
              className={styles.bag}
            />

            {totalCount > 0 && (
              <span className={styles.badge}>{totalCount}</span>
            )}
          </NavLink>
        </div>
      </header>

      <div className={styles.headerMobile}>
        <HeaderMobile />
      </div>
    </>
  );
};
