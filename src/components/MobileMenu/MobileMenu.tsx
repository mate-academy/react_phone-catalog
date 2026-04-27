import { Link, NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import { useContext, useEffect } from 'react';
import { ProductsContext } from '../../context/ProductsContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);
  const { cart, favorites } = useContext(ProductsContext);

  return (
    <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
      <div className={styles.box}>
        <NavLink
          to="/home"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? `${styles.text} ${styles.active}` : styles.text
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/phones"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? `${styles.text} ${styles.active}` : styles.text
          }
        >
          PHONES
        </NavLink>
        <NavLink
          to="/tablets"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? `${styles.text} ${styles.active}` : styles.text
          }
        >
          TABLETS
        </NavLink>
        <NavLink
          to="/accessories"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? `${styles.text} ${styles.active}` : styles.text
          }
        >
          ACCESSORIES
        </NavLink>
      </div>
      <div className={styles.actions}>
        <div className={styles.boxAction}>
          <Link to="/favorites" className={styles.icon} onClick={onClose}>
            <div className={styles.cyrcle}>{favorites.length}</div>
            <img src="./img/icons/heart.svg" alt="Favorites" />
          </Link>
        </div>
        <div className={styles.boxAction}>
          <Link to="/cart" className={styles.icon} onClick={onClose}>
            <div className={styles.cyrcle}>{cart.length}</div>
            <img src="./img/icons/cart.svg" alt="Cart" />
          </Link>
        </div>
      </div>
    </div>
  );
};
