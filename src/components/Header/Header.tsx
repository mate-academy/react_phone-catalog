import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useState } from 'react';
import { BurgerMenu } from '../BurgerMenu';

const navLinks = [
  { id: 1, title: 'Home', to: '/' },
  { id: 2, title: 'Phones', to: '/phones' },
  { id: 3, title: 'Tablets', to: '/tablets' },
  { id: 4, title: 'Accessories', to: '/accessories' },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
                  <NavLink to={link.to} className={styles.navList_link}>
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.iconLinks}>
          <NavLink className={styles.iconLinks_link} to="/favourites">
            <img
              src="/img/icons/Favourite_default.png"
              alt="favourites"
              className={styles.icon}
            />
          </NavLink>
          <NavLink className={styles.iconLinks_link} to="/cart">
            <img
              src="/img/icons/Cart_default.png"
              alt="cart"
              className={styles.icon}
            />
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
