import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { CartandFavContext } from '../CartandFavProvider';

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
  const { cart, fav } = useContext(CartandFavContext);

  return (
    <main className={`${styles.page} ${menuOpen ? styles.open : ''}`}>
      <nav>
        <ul className={styles.navList}>
          {navLinks.map(link => (
            <li key={link.id}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  classNames(styles.navList_link, {
                    [styles.activeLink]: isActive,
                  })
                }
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
          className={({ isActive }) =>
            classNames(styles.iconLinks_link, {
              [styles.activeLink]: isActive,
            })
          }
          to="/favourites"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/img/icons/Favourite_default.png"
            alt="favourites"
            className={styles.iconLinks_link_icon}
          />
          {fav.length > 0 && <div className={styles.counter}>{fav.length}</div>}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames(styles.iconLinks_link, {
              [styles.activeLink]: isActive,
            })
          }
          to="/cart"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/img/icons/Cart_default.png"
            alt="cart"
            className={styles.iconLinks_link_icon}
          />
          {cart.length > 0 && (
            <div className={styles.counter}>{cart.length}</div>
          )}
        </NavLink>
      </div>
    </main>
  );
};
