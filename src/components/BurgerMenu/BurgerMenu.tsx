import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';

const navLinks = [
  { id: 1, title: 'Home', to: '/' },
  { id: 2, title: 'Phones', to: '/phones' },
  { id: 3, title: 'Tablets', to: '/tablets' },
  { id: 4, title: 'Accessories', to: '/accessories' },
];

type Props = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BurgerMenu = ({ menuOpen, setMenuOpen }: Props) => {
  return (
    <main className={`${styles.page} ${menuOpen ? styles.open : ''}`}>
      <nav>
        <ul className={styles.navList}>
          {navLinks.map(link => (
            <li key={link.id}>
              <NavLink
                to={link.to}
                className={styles.navList_link}
                onClick={() => setMenuOpen(false)}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.iconLinks}>
        <NavLink
          className={styles.iconLinks_link}
          to="/favourites"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/img/icons/Favourite_default.png"
            alt="favourites"
            className={styles.iconLinks_link_icon}
          />
        </NavLink>
        <NavLink
          className={styles.iconLinks_link}
          to="/cart"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/img/icons/Cart_default.png"
            alt="cart"
            className={styles.iconLinks_link_icon}
          />
        </NavLink>
      </div>
    </main>
  );
};
