/* eslint-disable import/no-extraneous-dependencies */
import { NavLink, useLocation } from 'react-router-dom';

import styles from './StickyHeader.module.scss';
import burgerStyle from './BurgerMenu.module.scss';
import { Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../CartProvider/CartProvider';
import { useFavorites } from '../../FavoritesProvider/FavoritesProvider';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import type { Lang } from '../../../translations';

export const StickyHeader = () => {
  const location = useLocation();
  const { getTotal, getFromCart } = useCart();
  const { favorites } = useFavorites();
  const { t, lang, setLang } = useLanguage();

  const itemsInCart = getFromCart();
  const cartCount = getTotal(itemsInCart).Items();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const headerItems = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.phones', path: '/catalog/phones' },
    { key: 'nav.tablets', path: '/catalog/tablets' },
    { key: 'nav.accessories', path: '/catalog/accessories' },
  ];

  const headerIcons = [
    {
      key: 'nav.favorites',
      path: '/favorites',
      icon: Heart,
      badgeCount: favorites.length,
    },
    {
      key: 'nav.cart',
      path: '/cart',
      icon: ShoppingBag,
      badgeCount: cartCount,
    },
  ];

  const isActiveFor = (itemPath: string): boolean => {
    if (itemPath === '/') {
      return location.pathname === '/';
    }

    const catalogPath = itemPath; // '/catalog/phones'
    const shortPath = itemPath.replace('/catalog', ''); // '/phones'

    return (
      location.pathname === catalogPath ||
      location.pathname.startsWith(catalogPath + '/') ||
      location.pathname === shortPath ||
      location.pathname.startsWith(shortPath + '/')
    );
  };

  useEffect(() => {
    // Close menu when window too big :<
    const handleResize = () => {
      if (window.innerWidth > 540) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        className={burgerStyle.burgerMenu}
        style={{
          display: menuOpen ? 'flex' : 'none',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div className={burgerStyle.burgerMenu__Content}>
          {headerItems.map(item => (
            <NavLink
              to={item.path}
              key={item.key}
              className={
                isActiveFor(item.path)
                  ? burgerStyle.burgerMenu__LinkActive
                  : burgerStyle.burgerMenu__Link
              }
              onClick={toggleMenu}
            >
              {t(item.key)}
            </NavLink>
          ))}
        </div>
        <div className={burgerStyle.burgerMenu__Footer}>
          {headerIcons.map((icon, index) => (
            <NavLink
              to={icon.path}
              key={index}
              className={burgerStyle.burgerMenu__FooterIcon}
              onClick={toggleMenu}
            >
              <div className={burgerStyle.burgerMenu__IconWithBadge}>
                <icon.icon />
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      <div className={styles.stickyHeader__Container}>
        <NavLink to="/" className={styles.stickyHeader__Logo}>
          <img src={`img/new/LogoDarkTheme.svg`} alt="Logo" />
        </NavLink>

        <div className={styles.stickyHeader__Body}>
          {headerItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={
                isActiveFor(item.path)
                  ? styles.stickyHeader__LinkActive
                  : styles.stickyHeader__Link
              }
            >
              <div className={styles.stickyHeader__LinkContent}>
                {t(item.key)}
              </div>
            </NavLink>
          ))}
        </div>

        <div className={styles.stickyHeader__Bottom}>
          <div className={styles.stickyHeader__Lang}>
            {(['en', 'uk'] as Lang[]).map(l => (
              <button
                key={l}
                type="button"
                className={styles.stickyHeader__LangBtn}
                data-active={lang === l}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {headerIcons.map(icon => (
            <NavLink
              to={icon.path}
              key={icon.key}
              className={({ isActive }) =>
                `${styles.stickyHeader__Icon} ${styles.full} ${isActive ? styles.stickyHeader__LinkActive : styles.stickyHeader__Link}`
              }
            >
              <div className={styles.stickyHeader__LinkContent}>
                <div className={styles.stickyHeader__IconWithBadge}>
                  <icon.icon />
                  {icon.badgeCount > 0 && (
                    <span className={styles.stickyHeader__Badge}>
                      {icon.badgeCount}
                    </span>
                  )}
                </div>
              </div>
            </NavLink>
          ))}

          <button
            className={`${styles.stickyHeader__Icon} ${styles.menu}`}
            onClick={() => toggleMenu()}
          >
            {menuOpen ? (
              <X className={styles.stickyHeader__Link} />
            ) : (
              <Menu className={styles.stickyHeader__Link} />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
