import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu = ({ isOpen, onClose }: Props) => {
  return (
    <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
      <div className={styles.menuHeader}>
        <Link to="/">
          <img src="./img/logo/logo.png" alt="Nice Gadgets Logo" />
        </Link>
        <button type="button" onClick={onClose} className={styles.button}>
          <img src="./img/close_menu/close_menu.png" alt="Close Menu" />
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
          <img src="./img/icons/favourites_icon.png" alt="Favourites icon" />
        </Link>
        <Link to="/cart" className={styles.buttonCart} onClick={onClose}>
          <img src="./img/icons/cart_icon.png" alt="Cart icon" />
        </Link>
      </div>
    </div>
  );
};
