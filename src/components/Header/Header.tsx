import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { useAppSelector } from '../../store';
import { selectTotalItems } from '../../store/slices/cartSlice';
import { selectTotalFavorites } from '../../store/slices/favoritesSlice';

const iconPaths = {
  menu: '../../public/img/icons/Menu.svg',
  close: '../../public/img/icons/XMark.svg',
  heart: '../../public/img/icons/Favourites_(Heart_Like).svg',
  cart: '../../public/img/icons/Shopping_bag_(Cart).svg',
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const cartItemsCount = useAppSelector(selectTotalItems);
  const favoritesItemsCount = useAppSelector(selectTotalFavorites);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(path);
  };

  return (
    <header>
      <div className={styles.header}>
        <div className={styles.header_block}>
          <div className={styles.header_logo}>
            <img src="../../../public/img/icons/Logo.svg" alt="Logo" />
          </div>
        </div>
        <div className={styles.header_block}>
          <div className={styles.header_tabs}>
            <div
              className={`text_uppercase ${isActive('/') ? styles.header_active : ''}`}
            >
              <Link to="/">home</Link>
            </div>

            <div
              className={`text_uppercase ${isActive('/phones') ? styles.header_active : ''}`}
            >
              <Link to="/phones">phones</Link>
            </div>

            <div
              className={`text_uppercase ${isActive('/tablets') ? styles.header_active : ''}`}
            >
              <Link to="/tablets">tablets</Link>
            </div>

            <div
              className={`text_uppercase ${isActive('/accessories') ? styles.header_active : ''}`}
            >
              <Link to="/accessories">accessories</Link>
            </div>
          </div>
        </div>
        <div className={styles.header_block}>
          <div className={styles.header_iconBlock}>
            <div
              className={`${styles.header_iconBlock_icon} ${isActive('/favorites') ? styles.header_active : ''}`}
            >
              <Link to="/favorites" className={styles.header_cartLink}>
                <img
                  src={iconPaths.heart}
                  alt="favorites"
                  className={styles.header_cartLink_img}
                />
                {favoritesItemsCount > 0 && (
                  <span className={styles.header_cartBadge}>
                    {favoritesItemsCount > 99 ? '99+' : favoritesItemsCount}
                  </span>
                )}
              </Link>
            </div>

            <div
              className={`${styles.header_iconBlock_icon} ${isActive('/cart') ? styles.header_active : ''}`}
            >
              <Link to="/cart" className={styles.header_cartLink}>
                <img src={iconPaths.cart} alt="Cart" />
                {cartItemsCount > 0 && (
                  <span className={styles.header_cartBadge}>
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </Link>
            </div>

            {!isMenuOpen && (
              <div
                className={styles.header_iconBlock_icon}
                onClick={toggleMenu}
              >
                <img src={iconPaths.menu} alt="Menu" />
              </div>
            )}
            {isMenuOpen && (
              <div
                className={styles.header_iconBlock_icon}
                onClick={toggleMenu}
              >
                <img src={iconPaths.close} alt="Close" />
              </div>
            )}
          </div>
        </div>
        <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </header>
  );
};

export default Header;
