import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import { useAppContext } from '../../../../../../context/AppContext';
import { Counter } from '../Counter';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
};

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? styles.activeLink : styles.link;
};

const getActiveClass = (isActive: boolean) => {
  return `${styles.icon} ${isActive ? styles.activeIcon : ''}`;
};

export const Menu = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  const { favoritesIds, cartIds } = useAppContext();

  if (!isMenuOpen) {
    return null;
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.menu}>
      <nav className={styles.nav}>
        <div className={styles.linkContainer}>
          <NavLink onClick={closeMenu} to="/" end className={getLinkClass}>
            HOME
          </NavLink>
        </div>
        <div className={styles.linkContainer}>
          <NavLink onClick={closeMenu} to="/phones" className={getLinkClass}>
            PHONES
          </NavLink>
        </div>
        <div className={styles.linkContainer}>
          <NavLink onClick={closeMenu} to="/tablets" className={getLinkClass}>
            TABLETS
          </NavLink>
        </div>
        <div className={styles.linkContainer}>
          <NavLink
            onClick={closeMenu}
            to="/accessories"
            className={getLinkClass}
          >
            ACCESSORIES
          </NavLink>
        </div>
      </nav>
      <div className={styles.bottom}>
        <NavLink
          className={({ isActive }) => {
            return `${styles.favorites} ${getActiveClass(isActive)}`;
          }}
          to={'/favorites'}
          onClick={closeMenu}
        >
          <img src="icons/favorites.svg" alt="Favorites" />
          {favoritesIds.length > 0 && <Counter count={favoritesIds.length} />}
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return `${styles.cart} ${getActiveClass(isActive)}`;
          }}
          to={'/cart'}
          onClick={closeMenu}
        >
          <img src="icons/cart.svg" alt="Cart" />
          {cartIds.length > 0 && <Counter count={cartIds.length} />}
        </NavLink>
      </div>
    </div>
  );
};
