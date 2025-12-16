import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
] as const;

const iconLinks = [
  { to: '/favorites', src: '/img/icons/heart.svg', alt: 'Favorites' },
  { to: '/cart', src: '/img/icons/cart.svg', alt: 'Cart' },
] as const;

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.iconLink} ${styles.iconLinkActive}` : styles.iconLink;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { count } = useFavorites();
  const { totalItems } = useCart();

  const handleLinkClick = () => setIsMenuOpen(false);

  const renderBadge = (to: string) => {
    if (to === '/favorites' && count > 0) {
      return <span className={styles.badge}>{count}</span>;
    }

    if (to === '/cart' && totalItems > 0) {
      return <span className={styles.badge}>{totalItems}</span>;
    }

    return null;
  };

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logoLink} onClick={handleLinkClick}>
        <span className={styles.logo}>
          NICE<span className={styles.logoEmoji}>👌</span>
          <br />
          GADGETS
        </span>
      </NavLink>

      <nav className={styles.nav}>
        {navLinks.map(link => (
          <NavLink key={link.to} to={link.to} className={getNavLinkClass}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.actions}>
        {iconLinks.map(icon => (
          <NavLink key={icon.to} to={icon.to} className={getIconLinkClass}>
            <img src={icon.src} className={styles.icon} alt={icon.alt} />
            {renderBadge(icon.to)}
          </NavLink>
        ))}
      </div>

      <button
        type="button"
        className={styles.burger}
        onClick={() => setIsMenuOpen(prev => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        <span className={styles.burgerIcon}>{isMenuOpen ? '✕' : '☰'}</span>
      </button>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={getNavLinkClass}
                onClick={handleLinkClick}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.mobileActions}>
            {iconLinks.map(icon => (
              <NavLink
                key={icon.to}
                to={icon.to}
                className={getIconLinkClass}
                onClick={handleLinkClick}
              >
                <img src={icon.src} className={styles.icon} alt={icon.alt} />
                {renderBadge(icon.to)}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
