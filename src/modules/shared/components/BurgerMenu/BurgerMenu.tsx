import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import styles from './BurgerMenu.module.scss';
import { RootState } from '../../../../app/store';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BurgerMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  const cart = useAppSelector((state: RootState) => state.shop.cart);
  const favourites = useAppSelector(
    (state: RootState) => state.shop.favourites,
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favCount = favourites.length;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
    }

    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.isActive : ''}`;

  const getIconButtonClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.iconButton} ${isActive ? styles.activeIconButton : ''}`;

  return (
    <div className={styles.menuContainer}>
      <nav className={styles.nav}>
        <NavLink to="/" className={getLinkClass} onClick={onClose}>
          Home
        </NavLink>
        <NavLink to="/phones" className={getLinkClass} onClick={onClose}>
          Phones
        </NavLink>
        <NavLink to="/tablets" className={getLinkClass} onClick={onClose}>
          Tablets
        </NavLink>
        <NavLink to="/accessories" className={getLinkClass} onClick={onClose}>
          Accessories
        </NavLink>
      </nav>

      <div className={styles.footerButtons}>
        <NavLink
          to="/favourites"
          className={getIconButtonClass}
          onClick={onClose}
        >
          <div className={styles.iconWrapper}>
            <img src={'img/Favourites-header.svg'} alt="Favourites" />
            {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </div>
        </NavLink>

        <NavLink to="/cart" className={getIconButtonClass} onClick={onClose}>
          <div className={styles.iconWrapper}>
            <img src={'img/Cart.svg'} alt="Cart" />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
