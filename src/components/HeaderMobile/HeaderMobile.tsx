import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HeaderMobile.module.scss';

const links = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.linkActive : styles.link;

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.iconActive : styles.icon;

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <NavLink to="/" className={styles.logo} onClick={closeMenu}>
          <img src="./img/icons/logo.svg" alt="Logo" />
        </NavLink>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setIsOpen(prev => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <img
            src={isOpen ? './img/icons/close.svg' : './img/icons/menu.svg'}
            alt=""
          />
        </button>
      </div>

      <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <nav>
          <ul className={styles.list}>
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={getLinkClass}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          <NavLink to="/favorites" className={getIconClass} onClick={closeMenu}>
            <img src="./img/icons/heart.svg" alt="Favorites" />
          </NavLink>

          <NavLink to="/cart" className={getIconClass} onClick={closeMenu}>
            <img src="./img/icons/bag.svg" alt="Cart" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
