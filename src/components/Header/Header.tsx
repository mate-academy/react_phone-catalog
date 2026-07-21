import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { MobileMenu } from '../MobileMenu';
import { getAssetUrl } from '../../utils/getAssetUrl';
import styles from './Header.module.scss';

export const Header = () => {
  const { items } = useCart();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const { items: favoriteItems } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <NavLink to="/" end className={styles.logo}>
          <img src="img/logo.svg" alt="Nice Gadgets" />
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" end className={getLinkClass}>Home</NavLink>
          <NavLink to="/phones" className={getLinkClass}>Phones</NavLink>
          <NavLink to="/tablets" className={getLinkClass}>Tablets</NavLink>
          <NavLink to="/accessories" className={getLinkClass}>Accessories</NavLink>
        </nav>
      </div>

      <div className={styles.right}>
        <NavLink to="/favorites" className={styles.iconLink}>
          <span className={styles.iconWrap}>
            <img src={getAssetUrl('/img/heart.svg')} alt="Favorites" />
            {favoriteItems.length > 0 && <span className={styles.badge}>{favoriteItems.length}</span>}
          </span>
        </NavLink>
        <NavLink to="/cart" className={styles.iconLink}>
          <span className={styles.iconWrap}>
            <img src={getAssetUrl('/img/bag.svg')} alt="Cart" />
            {totalQuantity > 0 && <span className={styles.badge}>{totalQuantity}</span>}
          </span>
        </NavLink>
      </div>

      <button className={styles.menuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <img
  src={getAssetUrl(isMenuOpen ? '/img/close.svg' : '/img/menu.svg')}
  alt="Menu"
/>
      </button>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};
