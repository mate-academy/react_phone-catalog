import { Link, NavLink } from 'react-router-dom';
import styles from './Asaid.module.scss';
import '../../mixin.scss';

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
  return (
    <aside className={styles.menuTop}>
      <div className={styles.menuTopLogo}>
        <Link to="/" className={styles.logoMenu}>
          <img src="/img/logo.svg" alt="Logo" className="logo" />
        </Link>

        <button className={styles.close} onClick={onClose}>
          <img src="/img/close.svg" alt="Close" />
        </button>
      </div>
      <nav className={styles.navList}>
        <ul className={styles.navUlList}>
          {links.map(link => (
            <li key={link.to} className={styles.navItem} onClick={onClose}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.isActive : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.actionsIcon}>
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
            src="/img/cart.svg"
            className={styles.iconImgCart}
            alt="Cart"
            onClick={onClose}
          />
        </Link>
      </div>
    </aside>
  );
};
