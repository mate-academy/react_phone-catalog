import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './MobileMenu.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: Props) => {
  const { items } = useCart();
  const { items: favoriteItems } = useFavorites();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

  return (
    <div className={isOpen ? `${styles.menu} ${styles.menuOpen}` : styles.menu}>
      <nav className={styles.nav}>
        <NavLink to="/" className={getLinkClass} onClick={onClose}>Home</NavLink>
        <NavLink to="/phones" className={getLinkClass} onClick={onClose}>Phones</NavLink>
        <NavLink to="/tablets" className={getLinkClass} onClick={onClose}>Tablets</NavLink>
        <NavLink to="/accessories" className={getLinkClass} onClick={onClose}>Accessories</NavLink>
      </nav>

      <div className={styles.footer}>
        <NavLink to="/favorites" className={styles.iconWrap} onClick={onClose}>
          <img src="/img/heart.svg" alt="Favorites" />
          {favoriteItems.length > 0 && <span className={styles.badge}>{favoriteItems.length}</span>}
        </NavLink>
        <NavLink to="/cart" className={styles.iconWrap} onClick={onClose}>
          <img src="/img/bag.svg" alt="Cart" />
          {totalQuantity > 0 && <span className={styles.badge}>{totalQuantity}</span>}
        </NavLink>
      </div>
    </div>
  );
};
