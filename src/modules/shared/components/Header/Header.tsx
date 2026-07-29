import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { IconButton } from '@/components/IconButton';
import { Icon } from '@/components/Icon';
import { useCart } from '@/context/CartContext';
import { useFavourites } from '@/context/FavouritesContext';
import styles from './Header.module.scss';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/phones', label: 'Phones', end: false },
  { to: '/tablets', label: 'Tablets', end: false },
  { to: '/accessories', label: 'Accessories', end: false },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { favourites } = useFavourites();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Logo />

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {navLinks.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      [
                        styles.navLink,
                        isActive ? styles.navLinkActive : '',
                      ].join(' ')
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.right}>
          <IconButton
            to="/favourites"
            iconName="favourites"
            label="Favourites"
            count={favourites.length}
          />
          <IconButton
            to="/cart"
            iconName="cart"
            label="Cart"
            count={cartItems.length}
          />

          <button
            type="button"
            className={styles.burger}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(current => !current)}
          >
            <Icon name={isMenuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    [styles.navLink, isActive ? styles.navLinkActive : ''].join(
                      ' ',
                    )
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
