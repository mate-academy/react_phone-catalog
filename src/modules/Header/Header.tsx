import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouriteContext';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { items } = useCart();
  const { favouriteItems } = useFavourites();

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  return (
    <>
      <header>
        <Link to="/" className={styles.logo}>
          <img src="/img/Logo.svg" alt="" />
        </Link>
        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            {t('Home')}
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            {t('Phones')}
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            {t('Tablets')}
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            {t('Accessories')}
          </NavLink>
        </nav>

        <div className={styles.langContainer} ref={dropdownRef}>
          <button
            className={classNames(styles.langButton, {
              [styles.langButtonActive]: isOpen,
            })}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Select language"
          >
            <img
              src="/img/icons/icon_language.svg"
              alt="Language"
              className={styles.langIcon}
            />
            <span className={styles.arrow}></span>
          </button>

          {isOpen && (
            <ul className={styles.dropdownMenu}>
              <li
                className={classNames(styles.dropdownItem, {
                  [styles.selected]: i18n.language === 'en',
                })}
              >
                <button onClick={() => changeLanguage('en')}>English</button>
              </li>
              <li
                className={classNames(styles.dropdownItem, {
                  [styles.selected]: i18n.language === 'ua',
                })}
              >
                <button onClick={() => changeLanguage('ua')}>Українська</button>
              </li>
            </ul>
          )}
        </div>

        <div className={styles.buttons}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.buttonsBox} ${isActive ? styles.favoritesActive : ''}`
            }
          >
            <div className={styles.iconBox}>
              <img
                className={styles.buttonsItem}
                src="/img/icons/icon_favorite.svg"
                alt="Cart"
              />
              {favouriteItems.length > 0 && (
                <div className={styles.quantity}>{favouriteItems.length}</div>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles.buttonsBox} ${isActive ? styles.cartActive : ''}`
            }
          >
            <div className={styles.iconBox}>
              <img
                className={styles.buttonsItem}
                src="/img/icons/icon_cart.svg"
                alt="Cart"
              />
              {items.length > 0 && (
                <div className={styles.quantity}>{items.length}</div>
              )}
            </div>
          </NavLink>
        </div>

        <button
          className={styles.burgerButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <img
            src={
              isMenuOpen
                ? '/img/icons/icon_burger_closed_menu.svg'
                : '/img/icons/icon_burger_menu.svg'
            }
            alt="Menu"
          />
        </button>
      </header>

      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
      >
        <nav className={styles.mobileNav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              classNames(styles.mobileNavLink, {
                [styles.mobileNavLinkActive]: isActive,
              })
            }
            onClick={closeMenu}
          >
            home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              classNames(styles.mobileNavLink, {
                [styles.mobileNavLinkActive]: isActive,
              })
            }
            onClick={closeMenu}
          >
            phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              classNames(styles.mobileNavLink, {
                [styles.mobileNavLinkActive]: isActive,
              })
            }
            onClick={closeMenu}
          >
            tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              classNames(styles.mobileNavLink, {
                [styles.mobileNavLinkActive]: isActive,
              })
            }
            onClick={closeMenu}
          >
            accessories
          </NavLink>
        </nav>

        <div className={styles.mobileMenuButtons}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.mobileMenuButtonBox, {
                [styles.mobileMenuButtonBoxActive]: isActive,
              })
            }
            onClick={closeMenu}
          >
            <div className={styles.iconBox}>
              <img src="/img/icons/icon_favorite.svg" alt="Favorites" />
              {favouriteItems.length > 0 && (
                <div className={styles.quantity}>{favouriteItems.length}</div>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.mobileMenuButtonBox, {
                [styles.mobileMenuButtonBoxActive]: isActive,
              })
            }
            onClick={closeMenu}
          >
            <div className={styles.iconBox}>
              <img src="/img/icons/icon_cart.svg" alt="Cart" />
              {items.length > 0 && (
                <div className={styles.quantity}>{items.length}</div>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};
