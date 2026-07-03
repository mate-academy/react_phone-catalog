import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useAppSelector } from '../../store/hooks';
import styles from './Header.module.scss';
import { MobileMenu } from '../MobileMenu/MobileMenu';

const NAV_LINKS = [
  { to: '/', text: 'Home' },
  { to: '/phones', text: 'Phones' },
  { to: '/tablets', text: 'Tablets' },
  { to: '/accessories', text: 'Accessories' },
];

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles.header__link, {
    [styles['header__link--active']]: isActive,
  });

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const cartItems = useAppSelector(state => state.cart.items);
  const favoritesItems = useAppSelector(state => state.favorites.items);

  const cartTotalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const favTotalQuantity = favoritesItems.length;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <Link to="/" className={styles.header__logo}>
          <img src="./img/logo.svg" alt="Nice Gadgets" />
        </Link>

        <nav className={styles.header__nav}>
          {NAV_LINKS.map(link => (
            <NavLink key={link.to} to={link.to} className={getLinkClass}>
              {link.text}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className={styles.header__right}>
        <Link to="/favorites" className={styles['header__icon-wrapper']}>
          <img src="./img/heart.png" alt="Favorites" />
          {favTotalQuantity > 0 && (
            <span className={styles.header__badge}>{favTotalQuantity}</span>
          )}
        </Link>

        <Link to="/cart" className={styles['header__icon-wrapper']}>
          <img src="./img/bag.png" alt="Cart" />
          {cartTotalQuantity > 0 && (
            <span className={styles.header__badge}>{cartTotalQuantity}</span>
          )}
        </Link>
      </div>

      <button
        type="button"
        className={styles['header__menu-btn']}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img
          src={isMenuOpen ? './img/close.png' : './img/menu.png'}
          alt="Menu"
        />
      </button>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};
