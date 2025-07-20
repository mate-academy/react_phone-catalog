import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useContext, useState } from 'react';
import { BurgerMenu } from '../BurgerMenu';
import classNames from 'classnames';
import { CartandFavContext } from '../CartandFavProvider';

const navLinks = [
  { id: 1, title: 'Home', to: '/' },
  { id: 2, title: 'Phones', to: '/phones' },
  { id: 3, title: 'Tablets', to: '/tablets' },
  { id: 4, title: 'Accessories', to: '/accessories' },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, fav } = useContext(CartandFavContext);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoAndNav}>
          <NavLink className={styles.logo} to="/">
            <img src="/img/Logo.svg" alt="Nice_Gadgets_logo" />
          </NavLink>
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
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.iconLinks}>
          <NavLink
            className={({ isActive }) =>
              classNames(styles.iconLinks_link, {
                [styles.activeLink]: isActive,
              })
            }
            to="/favourites"
          >
            <img
              src="/img/icons/Favourite_default.png"
              alt="favourites"
              className={styles.icon}
            />
            {fav.length > 0 && (
              <div className={styles.counter}>{fav.length}</div>
            )}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(styles.iconLinks_link, {
                [styles.activeLink]: isActive,
              })
            }
            to="/cart"
          >
            <img
              src="/img/icons/Cart_default.png"
              alt="cart"
              className={styles.icon}
            />
            {cart.length > 0 && (
              <div className={styles.counter}>{cart.length}</div>
            )}
          </NavLink>
          <button
            className={styles.iconLinks_link}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <img
                src="/img/icons/close.svg"
                alt="close"
                className={styles.icon}
              />
            ) : (
              <img
                src="/img/icons/burger-menu.svg"
                alt="burger-menu"
                className={styles.icon}
              />
            )}
          </button>
        </div>
        {<BurgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
      </header>
    </>
  );
};
