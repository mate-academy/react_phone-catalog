import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavourite } from '../../context/FavContext';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu = ({ isOpen, onClose }: Props) => {
  const { items } = useCart();
  const { favourites } = useFavourite();

  const totalItems = items.reduce((acc, item) => {
    return acc + item.count;
  }, 0);

  useEffect(() => {
    if (isOpen === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
      <div className={styles.menuHeader}>
        <Link to="/">
          <img src="./img/logo/logo.png" alt="Nice Gadgets Logo" />
        </Link>
        <button type="button" onClick={onClose} className={styles.button}>
          <img src="./img/close_menu/close_menu.svg" alt="Close Menu" />
        </button>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <Link to="/" className={styles.listLink} onClick={onClose}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/phones" className={styles.listLink} onClick={onClose}>
              Phones
            </Link>
          </li>
          <li>
            <Link to="/tablets" className={styles.listLink} onClick={onClose}>
              Tablets
            </Link>
          </li>
          <li>
            <Link
              to="/accessories"
              className={styles.listLink}
              onClick={onClose}
            >
              Accessories
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.buttons}>
        <Link to="/favourites" className={styles.buttonFav} onClick={onClose}>
          <span className={styles.favIconWrapper}>
            <img src="./img/icons/favourites_icon.svg" alt="Favourites icon" />
            <p className={styles.totalFav}>
              {favourites.length > 0 ? favourites.length : ''}
            </p>
          </span>
        </Link>
        <Link to="/cart" className={styles.buttonCart} onClick={onClose}>
          <span className={styles.cartIconWrapper}>
            <img src="./img/icons/cart_icon.svg" alt="Cart icon" />
            <p className={styles.totalItems}>
              {totalItems > 0 ? totalItems : ''}
            </p>
          </span>
        </Link>
      </div>
    </div>
  );
};
