import styles from './MenuMobile.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import logoSvg from '/img/site/Nice Gadgets.svg';
import handOkSvg from '/img/site/hand-ok.svg';
import heartFavoriteSvg from '/img/site/heart.svg';
import cartSvg from '/img/site/bag-cart.svg';
import closeSvg from '/img/site/close.svg';

interface MenuMobileProps {
  onClose: () => void;
}

export default function MenuMobile({ onClose }: MenuMobileProps) {
  const location = useLocation();
  const { totalItems } = useCart();
  const { favorites } = useFavorites();

  return (
    <aside className={styles.asideMenu}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logoSvg} alt="Nice Gadgets" />
          <img
            className={styles.logoHandOk}
            src={handOkSvg}
            alt="Hand OK icon"
          />
        </div>
        <div className={styles.closeButtonContainer}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            <img src={closeSvg} alt="" />
          </button>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li
            className={`${styles.menuItem} ${location.pathname === '/' ? styles.menuItemActive : ''}`}
          >
            <Link to="/" onClick={onClose}>
              Home
            </Link>
          </li>
          <li
            className={`${styles.menuItem} ${location.pathname.startsWith('/phones') ? styles.menuItemActive : ''}`}
          >
            <Link to="/phones" onClick={onClose}>
              Phones
            </Link>
          </li>
          <li
            className={`${styles.menuItem} ${location.pathname.startsWith('/tablets') ? styles.menuItemActive : ''}`}
          >
            <Link to="/tablets" onClick={onClose}>
              Tablets
            </Link>
          </li>
          <li
            className={`${styles.menuItem} ${location.pathname.startsWith('/accessories') ? styles.menuItemActive : ''}`}
          >
            <Link to="/accessories" onClick={onClose}>
              Accessories
            </Link>
          </li>
          <li
            className={`${styles.menuItem} ${location.pathname.startsWith('/search') ? styles.menuItemActive : ''}`}
          >
            <Link to="/search" className={styles.searchLink} onClick={onClose}>
              Search
              <IoSearchOutline />
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.footer}>
        <Link to="/favorites" className={styles.iconLink} onClick={onClose}>
          <div className={styles.iconContainer}>
            <img src={heartFavoriteSvg} alt="Favorites" />
            {favorites.length > 0 && (
              <span className={styles.favoriteCount}>{favorites.length}</span>
            )}
          </div>
        </Link>
        <Link to="/cart" className={styles.iconLink} onClick={onClose}>
          <div className={styles.iconContainer}>
            <img src={cartSvg} alt="Cart" />
            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </div>
        </Link>
      </div>
    </aside>
  );
}
