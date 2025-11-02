import { Link } from 'react-router-dom';
import { useMyContext } from 'components/Contexts/Contexts';
import styles from './MobMenu.module.scss';
import Fav from 'assets/icons/favourites.svg';
import Cart from 'assets/icons/shopping-cart.svg';
import { useRef, useState, useEffect } from 'react';
import { useAppContext } from 'components/Contexts/AppDataContext';
import { useCategory } from 'components/Contexts/CategoryContext';

const links = [
  { path: '/', title: 'Home' },
  { path: '/phones', title: 'phones' },
  { path: '/tablets', title: 'tablets' },
  { path: '/accessories', title: 'accessories' },
];

const MobMenu = () => {
  const menuId = 'mobile-navigation';
  const { currentCategory } = useCategory();
  const { isMenuOpen, setIsMenuOpen } = useMyContext();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const { favourites, cart, getCartItemsCount } = useAppContext();

  const [activeLink, setActiveLink] = useState(currentCategory || 'home');

  useEffect(() => {
    if (!isMenuOpen) {
      (document.activeElement as HTMLElement)?.blur();
    }
  }, [isMenuOpen]);

  const handleLinkClick = (linkTitle: string) => {
    setActiveLink(linkTitle.toLowerCase());
    setIsMenuOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div
      id={menuId}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      aria-hidden={!isMenuOpen}
      className={`${styles.mobileOverlay} ${isMenuOpen ? styles.open : ''}`}
      onClick={handleBackdropClick}
    >
      <div
        className={styles.backdrop}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className={`${styles.panel} ${isMenuOpen ? styles.active : ''}`}>
        <nav className={styles.BurgerMenu_pages} aria-label="Mobile menu pages">
          {links.map((link, idx) => (
            <Link
              key={link.title}
              to={link.path}
              ref={idx === 0 ? firstLinkRef : null}
              className={`${styles.BurgerMenu_link} ${
                activeLink === link.title.toLowerCase() ? styles.isActive : ''
              }`}
              onClick={() => handleLinkClick(link.title)}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              {link.title.toUpperCase()}
            </Link>
          ))}
        </nav>

        <div className={styles.BurgerMenu_savedGoods} aria-label="Saved items">
          <Link
            to="/favourites"
            className={`${styles.BurgerMenu_button} ${styles.BurgerMenu_favorite}`}
            onClick={() => setIsMenuOpen(false)}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            <div className={styles.miniContainer}>
              <img src={Fav} alt="favourites" />
              {favourites.length > 0 && (
                <span className={styles.badge}>{favourites.length}</span>
              )}
            </div>
          </Link>
          <Link
            to="/cart"
            className={`${styles.BurgerMenu_button} ${styles.BurgerMenu_cart}`}
            onClick={() => setIsMenuOpen(false)}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            <div className={styles.miniContainer}>
              <img src={Cart} alt="cart" />
              {cart.length > 0 && (
                <span className={styles.badge}>{getCartItemsCount()}</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobMenu;
