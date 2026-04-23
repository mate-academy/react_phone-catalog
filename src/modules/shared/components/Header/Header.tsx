import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styles from './Header.module.scss';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { useShop } from '../../../../store/shop/ShopContext';
import { useTheme } from '../../../../store/theme/ThemeContext';
import { logoMap } from '../../config/logoMap';
import { favouriteIconMap } from '../../config/favouriteIconMap';
import { shoppingBagMap } from '../../config/shoppingBagMap';
import { menuIconMap } from '../../config/menuIconMap';
import { closeIconMap } from '../../config/closeIconMap';
import { useScrollToTop } from '../../../../hooks/useScrollToTop';
import { ThemeSwitcher } from '../ThemeSwitcher';

type Props = {
  openMenu: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ openMenu, setIsMenuOpen }) => {
  const { carts, favourites } = useShop();
  const { theme } = useTheme();
  const scrollTotop = useScrollToTop();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query') || '';
  const showSearch =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories';
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams(prev => {
        const params = new URLSearchParams(prev);

        if (inputValue) {
          params.set('query', inputValue);
        } else {
          params.delete('query');
        }

        return params;
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [openMenu]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const currentLogo = logoMap[theme];

  const totalQuantity = carts.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const totalFavourites = favourites.length;

  return (
    <>
      <header className={styles.header}>
        <Link to="/" onClick={scrollTotop} className={styles.logoLink}>
          <picture>
            <source media="(min-width: 1024px)" srcSet={currentLogo.desktop} />
            <img
              src={currentLogo.mobile}
              alt="Nice gadgets"
              className={styles.logo}
            />
          </picture>
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" onClick={scrollTotop} className={styles.menuLink}>
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/phones"
                onClick={scrollTotop}
                className={styles.menuLink}
              >
                Phones
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/tablets"
                onClick={scrollTotop}
                className={styles.menuLink}
              >
                Tablets
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/accessories"
                onClick={scrollTotop}
                className={styles.menuLink}
              >
                Accessories
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeSwitcher />
          <Link
            to="/favourites"
            onClick={scrollTotop}
            className={styles.actionsLink}
          >
            <span className={styles.iconWrapper}>
              <img src={favouriteIconMap[theme].default} alt="Favourites" />

              {totalFavourites > 0 && (
                <span className={styles.cartBadge}>{totalFavourites}</span>
              )}
            </span>
          </Link>
          <Link to="/cart" onClick={scrollTotop} className={styles.actionsLink}>
            <span className={styles.iconWrapper}>
              <img src={shoppingBagMap[theme]} alt="Shopping bag" />

              {totalQuantity > 0 && (
                <span className={styles.cartBadge}>{totalQuantity}</span>
              )}
            </span>
          </Link>
        </div>

        {showSearch && !openMenu && (
          <input
            name="search"
            type="search"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Search..."
            className={styles.search}
          />
        )}

        <button
          type="button"
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={openMenu ? 'Close menu' : 'Open menu'}
        >
          <img
            src={openMenu ? closeIconMap[theme].white : menuIconMap[theme]}
            alt="Menu"
          />
        </button>
      </header>
      <MobileMenu isOpen={openMenu} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
