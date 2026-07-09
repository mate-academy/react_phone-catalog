import Menu from '../Menu/index';
import MainMenu from '../MainMenu/index';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import FavouritesLink from '../FavouritesLink';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();

  const handleMenuClick = () => {
    setTimeout(() => setIsMenuOpen(false), 50);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === 'Escape' || e.key === 'Esc') && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topBar}>
          <div className={styles.topBar__inner}>
            <Logo />
            <div className={styles.topBar__menu}>
              <Menu handleMenuClick={handleMenuClick} />
            </div>
            <div className={styles.topBar__icons}>
              <div
                className={`${styles.icon__background} ${styles['icon__background--hidden']}`}
              >
                <div className={styles.iconWrap}>
                  <FavouritesLink
                    to="/favorites"
                    className={`${styles.icon} ${styles.header__favIcon}`}
                    handleMenuClick={handleMenuClick}
                  />
                  {favorites.length > 0 && (
                    <span
                      className={`${styles.badge} ${styles['favorites-badge']}`}
                    >
                      {favorites.length}
                    </span>
                  )}
                </div>
              </div>

              <div
                className={`${styles.icon__background} ${styles['icon__background--hidden']}`}
              >
                <div className={styles.iconWrap}>
                  <Link
                    to="/cart"
                    className={`${styles.icon} ${styles['icon--shopping-bag-cart']}`}
                    onClick={handleMenuClick}
                  ></Link>
                  {totalQuantity > 0 && (
                    <span className={`${styles.badge} ${styles['cart-badge']}`}>
                      {totalQuantity}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.icon__background}>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(prev => !prev)}
                  className={`${styles.icon} ${styles['icon--menu']}`}
                  aria-expanded={isMenuOpen}
                  aria-controls="main-menu"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <MainMenu
        isMenuOpen={isMenuOpen}
        onClose={handleCloseMenu}
        handleMenuClick={handleMenuClick}
      />
    </>
  );
};
