import { Link, NavLink } from 'react-router-dom';
import styles from './Asaid.module.scss';
import '../../mixin.scss';
import { MenuContext } from '../../context/MenuContext';
import { useContext } from 'react';
import cn from 'classnames';

type Props = {
  onClose: () => void;
};

const links = [
  { to: '/', label: 'HOME' },
  { to: '/phones', label: 'PHONES' },
  { to: '/tablets', label: 'TABLETS' },
  { to: '/accessories', label: 'ACCESSORIES' },
];

export const Asaid: React.FC<Props> = ({ onClose: onClose }) => {
  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    return null;
  }

  const { isMenuOpen, closeMenu } = menuContext;

  if (!isMenuOpen) {
    return null;
  }

  return (
    <aside className={`${styles.menuTop} ${styles.isOpen}`}>
      <div className={styles.menuTopLogo}>
        <Link to="/" className={styles.logoMenu}>
          <img src="./img/logo.svg" alt="Logo" className="logo" />
        </Link>
        <div className={styles.close}>
          <button className={styles.closeBtn} onClick={closeMenu}>
            <img src="./img/close.svg" alt="Close" />
          </button>
        </div>
      </div>
      <nav className={styles.navList}>
        <ul className={styles.navUlList}>
          {links.map(link => (
            <li key={link.to} className={styles.navItem} onClick={onClose}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn(styles.navLink, isActive && styles.navLinkisActive)
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.actionsIconMenu}>
        <Link to="/favorites" className={styles.icon} aria-label="Favorites">
          <img
            src="/img/favorites.svg"
            className={styles.iconImgFavorites}
            alt="Favourites"
            onClick={onClose}
          />
        </Link>

        <Link to="/cart" className={styles.icon} aria-label="Cart">
          <img
            src="./img/cart.svg"
            className={styles.iconImgCart}
            alt="Cart"
            onClick={onClose}
          />
        </Link>
      </div>
    </aside>
  );
};
