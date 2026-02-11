import { useEffect, useMemo, useState } from 'react';
import { AppLink } from '../AppLink';
import { IconBadge } from '../IconBadge';
import { Logo } from '../Logo';
import { useCart } from '../../modules/shared/context/CartContext';
import { useFavorites } from '../../modules/shared/context/FavoritesContext';
import styles from './Header.module.scss';
import { Heart, ShoppingBag } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Phones', to: '/phones' },
  { label: 'Tablets', to: '/tablets' },
  { label: 'Accessories', to: '/accessories' },
];

export const Header = () => {
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const favoriteCount = useMemo(() => favorites.length, [favorites]);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const { style } = document.body;
    const prevOverflow = style.overflow;

    if (isMenuOpen) {
      style.overflow = 'hidden';
    } else {
      style.overflow = prevOverflow;
    }

    return () => {
      style.overflow = prevOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.branding}>
          <Logo />
          <nav className={styles.nav}>
            {navItems.map(item => (
              <AppLink key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
              </AppLink>
            ))}
          </nav>
        </div>

        <div className={styles.actions}>
          <div className={styles.iconButtons}>
            <IconBadge
              to="/favorites"
              label="Favorites"
              count={favoriteCount}
              icon={<Heart />}
              setIsMenuOpen={setIsMenuOpen}
            />

            <IconBadge
              to="/cart"
              label="Cart"
              count={totalQuantity}
              icon={<ShoppingBag />}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>

          <button
            type="button"
            className={styles.burger}
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileHeader}>
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              className={styles.close}
              onClick={closeMenu}
            >
              ✕
            </button>
          </div>

          <nav className={styles.mobileNav}>
            {navItems.map(item => (
              <AppLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={closeMenu}
              >
                {item.label}
              </AppLink>
            ))}
          </nav>

          <div className={styles.mobileBottom}>
            <IconBadge
              to="/favorites"
              label="Favorites"
              count={favoriteCount}
              icon={<Heart />}
              mobile={true}
              setIsMenuOpen={setIsMenuOpen}
            />

            <IconBadge
              to="/cart"
              label="Cart"
              count={totalQuantity}
              icon={<ShoppingBag />}
              mobile={true}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        </div>
      )}
    </header>
  );
};
