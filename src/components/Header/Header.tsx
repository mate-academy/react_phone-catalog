import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { SearchInput } from '../SearchInput';
import { getAssetUrl } from '../../utils/asset';
import styles from './Header.module.scss';

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, { [styles.active]: isActive });

export const Header = () => {
  const { ids } = useFavorites();
  const { totalQuantity } = useCart();
  const { pathname } = useLocation();

  const showSearch =
    pathname.startsWith('/phones') ||
    pathname.startsWith('/tablets') ||
    pathname.startsWith('/accessories') ||
    pathname.startsWith('/favorites');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <img src={getAssetUrl('img/Nice%20Gadgets.png')} alt="Nice Gadgets" />
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" className={getNavClass} end>
            Home
          </NavLink>
          <NavLink to="/phones" className={getNavClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getNavClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getNavClass}>
            Accessories
          </NavLink>
        </nav>

        {showSearch && <SearchInput />}

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.iconLink, styles.link, {
                [styles.active]: isActive,
              })
            }
          >
            <img
              className={styles.iconHeader}
              src={getAssetUrl('img/Favourites%20(Heart%20Like).png')}
              alt="Favorites"
            />
            <span>({ids.length})</span>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.iconLink, styles.link, {
                [styles.active]: isActive,
              })
            }
          >
            <img
              className={styles.iconHeader}
              src={getAssetUrl('img/Group%2017.png')}
              alt="Cart"
            />
            <span>({totalQuantity})</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
